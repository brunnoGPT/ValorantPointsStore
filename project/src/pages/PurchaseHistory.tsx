import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Calendar, DollarSign, GamepadIcon, CheckCircle2, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Purchase {
  id: string;
  userId: string;
  points: number;
  price: number;
  status: 'completed' | 'processing';
  riotId: string;
  riotTag: string;
  date: string;
}

function PurchaseHistory() {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user) return;

      try {
        // Get purchases from localStorage
        const storedPurchases = localStorage.getItem('purchases');
        let localPurchases: Purchase[] = [];
        
        try {
          localPurchases = storedPurchases 
            ? JSON.parse(storedPurchases).filter((p: Purchase) => p.userId === user.uid)
            : [];
        } catch (e) {
          console.error('Error parsing localStorage data:', e);
          localPurchases = [];
        }

        // Sort by date (newest first)
        localPurchases.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setPurchases(localPurchases);
      } catch (error) {
        console.error('Error in fetchPurchases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [user]);

  if (!user) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalSpent = purchases.reduce((sum, purchase) => sum + purchase.price, 0);
  const totalPoints = purchases.reduce((sum, purchase) => sum + purchase.points, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1923] text-white py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff4655] mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando histórico de compras...</p>
        </div>
      </div>
    );
  }

  if (purchases.length === 0) {
    return (
      <div className="min-h-screen bg-[#0F1923] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <ShoppingBag className="w-16 h-16 text-[#ff4655] mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Nenhuma compra encontrada</h1>
          <p className="text-gray-400 mb-8">Você ainda não realizou nenhuma compra.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff4655] text-white rounded-lg hover:bg-[#ff4655]/80 transition-colors"
          >
            Comprar VP
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1923] text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Histórico de Compras</h1>
          <p className="text-gray-400">Acompanhe todas as suas compras de VP</p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#1F2326] p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingBag className="text-[#ff4655]" size={24} />
              <div>
                <p className="text-gray-400 text-sm">Total de Compras</p>
                <p className="text-2xl font-bold">{purchases.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1F2326] p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="text-green-500" size={24} />
              <div>
                <p className="text-gray-400 text-sm">Total Gasto</p>
                <p className="text-2xl font-bold">R$ {totalSpent.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1F2326] p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <GamepadIcon className="text-blue-500" size={24} />
              <div>
                <p className="text-gray-400 text-sm">Total de VP</p>
                <p className="text-2xl font-bold">{totalPoints}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Compras */}
        <div className="bg-[#1F2326] rounded-lg">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold">Suas Compras</h2>
          </div>
          <div className="divide-y divide-gray-700">
            {purchases.map((purchase) => (
              <div key={purchase.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#0F1923] p-3 rounded-lg">
                      <ShoppingBag className="text-[#ff4655]" size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold">{purchase.points} VP</span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-green-500 font-bold">
                          R$ {purchase.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar size={16} />
                        {formatDate(purchase.date)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="text-sm">
                      <p className="text-gray-400">Conta</p>
                      <p className="font-medium">{purchase.riotId}#{purchase.riotTag}</p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm
                      ${purchase.status === 'completed' 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-yellow-500/10 text-yellow-500'
                      }`}
                    >
                      {purchase.status === 'completed' ? (
                        <>
                          <CheckCircle2 size={16} />
                          <span>Concluído</span>
                        </>
                      ) : (
                        <>
                          <Clock size={16} />
                          <span>Processando</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseHistory;