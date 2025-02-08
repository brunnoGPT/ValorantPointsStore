import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Clock, Star, Sword, Crown, Gem, Trophy, Zap, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBuyClick = (points: number, price: number) => {
    if (!user) {
      navigate('/login', { 
        state: { 
          message: 'Faça login para continuar com sua compra',
          returnTo: '/'
        } 
      });
      return;
    }

    navigate('/checkout', { 
      state: { 
        package: { points, price } 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-[#0F1923] text-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-[#ff4655] to-[#ff4655]/80 py-8 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">VALORANT POINTS</h1>
          <p className="text-lg md:text-xl mb-8">Recarregue seus pontos com segurança e os melhores preços do mercado</p>
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
            <div className="flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              <span className="text-sm md:text-base">Pagamento Seguro</span>
            </div>
            <div className="flex items-center justify-center">
              <CreditCard className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              <span className="text-sm md:text-base">Entrega Instantânea</span>
            </div>
            <div className="flex items-center justify-center">
              <Clock className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              <span className="text-sm md:text-base">Suporte 24/7</span>
            </div>
          </div>
        </div>
      </header>

      {/* Valorant Points Section */}
      <section className="py-8 md:py-16 container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">ESCOLHA SEU PACOTE</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {[
            { points: 950, bonus: 0, price: 18.90, icon: Sword, popular: false },
            { points: 2000, bonus: 50, price: 38.90, icon: Crown, popular: false },
            { points: 4100, bonus: 150, price: 75.90, icon: Gem, popular: true },
            { points: 7300, bonus: 325, price: 132.90, icon: Trophy, popular: false },
            { points: 10700, bonus: 600, price: 189.90, icon: Zap, popular: true },
            { points: 22000, bonus: 1475, price: 379.90, icon: Sparkles, popular: false },
          ].map((pack) => (
            <div 
              key={pack.points} 
              className={`relative bg-[#1F2326] rounded-lg p-4 md:p-6 hover:bg-[#2F3136] transition-all duration-300 transform hover:scale-105 ${
                pack.popular ? 'ring-2 ring-[#ff4655] shadow-lg shadow-[#ff4655]/20' : ''
              }`}
            >
              {pack.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#ff4655] text-white px-3 py-1 rounded-full text-xs md:text-sm font-bold whitespace-nowrap">
                  MAIS POPULAR
                </div>
              )}
              <div className="text-center mb-4 md:mb-6">
                <pack.icon className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 ${pack.popular ? 'text-[#ff4655]' : 'text-gray-400'}`} />
                <div className="text-3xl md:text-4xl font-bold text-[#ff4655]">{pack.points}</div>
                <div className="text-xs md:text-sm text-gray-400">VP</div>
              </div>
              {pack.bonus > 0 && (
                <div className="text-center text-green-400 text-xs md:text-sm mb-3 md:mb-4 font-semibold">
                  +{pack.bonus} Bônus VP
                </div>
              )}
              <div className="text-center text-xl md:text-2xl font-bold mb-4">
                R$ {pack.price.toFixed(2)}
              </div>
              <button 
                onClick={() => handleBuyClick(pack.points, pack.price)}
                className={`
                  w-full py-2.5 md:py-3 rounded-lg font-bold text-sm md:text-base transition-all duration-300
                  ${pack.popular 
                    ? 'bg-gradient-to-r from-[#ff4655] to-[#ff6b7a] hover:from-[#ff6b7a] hover:to-[#ff4655] shadow-lg hover:shadow-xl transform hover:-translate-y-1' 
                    : 'bg-[#ff4655] hover:bg-[#ff4655]/80'
                  }
                `}
              >
                COMPRAR AGORA
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 md:py-16 bg-[#1F2326]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">POR QUE COMPRAR CONOSCO?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: ShieldCheck, title: 'SEGURANÇA', desc: 'Pagamentos processados com máxima segurança' },
              { icon: CreditCard, title: 'MELHORES PREÇOS', desc: 'Preços competitivos e várias formas de pagamento' },
              { icon: Clock, title: 'ENTREGA RÁPIDA', desc: 'Receba seus pontos instantaneamente após a confirmação' },
              { icon: Star, title: 'SUPORTE PREMIUM', desc: 'Atendimento personalizado 24 horas por dia' },
            ].map((benefit) => (
              <div key={benefit.title} className="text-center p-4">
                <benefit.icon className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-[#ff4655]" />
                <h3 className="text-lg md:text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm md:text-base text-gray-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1F2326] py-6 md:py-8">
        <div className="container mx-auto px-4 text-center text-sm md:text-base text-gray-400">
          <p>© 2025 Valorant Points Store. Não afiliado à Riot Games.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
