import React, { useState } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { QrCode, CheckCircle2, AlertCircle, GamepadIcon, Wallet } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface LocationState {
  package?: {
    points: number;
    price: number;
  };
}

interface Purchase {
  id: string;
  userId: string;
  points: number;
  price: number;
  riotId: string;
  riotTag: string;
  status: 'completed' | 'processing';
  date: string;
}

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { package: selectedPackage } = (location.state as LocationState) || {};
  const [riotId, setRiotId] = useState('');
  const [riotTag, setRiotTag] = useState('');
  const [riotIdError, setRiotIdError] = useState('');
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!selectedPackage) {
    return <Navigate to="/" />;
  }

  const validateRiotAccount = () => {
    if (!riotId) {
      setRiotIdError('Riot ID é obrigatório');
      return false;
    }
    if (!riotTag) {
      setRiotIdError('TAG é obrigatória');
      return false;
    }
    if (riotTag.length < 3 || riotTag.length > 5) {
      setRiotIdError('TAG deve ter entre 3 e 5 caracteres');
      return false;
    }
    setRiotIdError('');
    return true;
  };

  const handleRiotTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    if (value.startsWith('#')) {
      setRiotTag(value.slice(1));
    } else {
      setRiotTag(value);
    }
  };

  const savePurchaseToLocalStorage = (purchase: Purchase) => {
    try {
      const storedPurchases = localStorage.getItem('purchases');
      const purchases = storedPurchases ? JSON.parse(storedPurchases) : [];
      purchases.push(purchase);
      localStorage.setItem('purchases', JSON.stringify(purchases));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  const handleConfirmPayment = async () => {
    if (!validateRiotAccount() || !user) {
      return;
    }

    setIsSubmitting(true);
    try {
      const purchaseData = {
        id: crypto.randomUUID(),
        userId: user.uid,
        points: selectedPackage.points,
        price: selectedPackage.price,
        riotId,
        riotTag,
        status: 'completed',
        date: new Date().toISOString(),
      } as Purchase;

      // Save to Firestore
      await addDoc(collection(db, 'purchases'), purchaseData);
      
      // Save to localStorage
      savePurchaseToLocalStorage(purchaseData);
      
      setIsPaymentConfirmed(true);
      
      // Redirect to purchase history after 3 seconds
      setTimeout(() => {
        navigate('/purchases');
      }, 3000);
    } catch (error) {
      console.error('Erro ao confirmar pagamento:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1923] text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#1F2326] rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-8">Finalizar Compra</h1>
          
          <div className="bg-[#0F1923] rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
            <div className="flex justify-between items-center mb-4">
              <span>{selectedPackage.points} VP</span>
              <span className="font-bold">R$ {selectedPackage.price.toFixed(2)}</span>
            </div>
            <div className="h-px bg-gray-700 my-4"></div>
            <div className="flex justify-between items-center">
              <span className="font-bold">Total</span>
              <span className="font-bold text-[#ff4655]">R$ {selectedPackage.price.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-[#0F1923] rounded-lg p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <GamepadIcon className="text-[#ff4655]" />
              <h2 className="text-xl font-semibold">Conta Valorant</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Riot ID</label>
                <input
                  type="text"
                  value={riotId}
                  onChange={(e) => setRiotId(e.target.value)}
                  className="w-full bg-[#1F2326] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4655]"
                  placeholder="Ex: SeuNome"
                  disabled={isPaymentConfirmed}
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">TAG</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">#</span>
                  <input
                    type="text"
                    value={riotTag}
                    onChange={handleRiotTagChange}
                    className="w-full bg-[#1F2326] text-white pl-8 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4655]"
                    placeholder="BR1"
                    maxLength={5}
                    disabled={isPaymentConfirmed}
                  />
                </div>
              </div>

              {riotIdError && (
                <div className="text-[#ff4655] text-sm flex items-center gap-2">
                  <AlertCircle size={16} />
                  {riotIdError}
                </div>
              )}
            </div>
          </div>

          {!isPaymentConfirmed ? (
            <>
              <div className="text-center mb-8">
                <div className="bg-white p-4 rounded-lg inline-block mb-4">
                  <img 
                    src="https://i.imgur.com/w6w2WH1.png"
                    alt="QR Code PIX" 
                    className="w-48 h-48"
                  />
                </div>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <QrCode size={20} className="text-[#ff4655]" />
                  <span>Escaneie o QR Code acima com seu aplicativo do banco</span>
                </div>
              </div>

              <button
                onClick={handleConfirmPayment}
                disabled={isSubmitting}
                className={`
                  w-full py-4 rounded-lg font-bold mb-8 flex items-center justify-center gap-2
                  ${isSubmitting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-[#ff4655] hover:bg-[#ff4655]/80'
                  }
                `}
              >
                <Wallet size={20} />
                {isSubmitting ? 'Processando...' : 'Já fiz o pagamento PIX'}
              </button>
            </>
          ) : (
            <div className="bg-green-500/10 border border-green-500 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3 text-green-500">
                <CheckCircle2 size={24} />
                <div>
                  <h3 className="font-bold">Pagamento Confirmado!</h3>
                  <p className="text-sm">Seus VP serão creditados em breve na conta {riotId}#{riotTag}</p>
                  <p className="text-sm mt-2">Redirecionando para o histórico de compras...</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-yellow-500">
              <AlertCircle size={20} />
              <div className="text-sm">
                <p className="font-semibold">Importante:</p>
                <p>Após a confirmação do pagamento, seus VP serão creditados automaticamente em sua conta.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;