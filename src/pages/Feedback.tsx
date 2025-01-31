import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, User, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

// Dados mockados para exemplo
const mockReviews: Review[] = [
  {
    id: '1',
    userName: 'Gabriel Silva',
    rating: 5,
    comment: 'Serviço excelente! VP creditado em menos de 5 minutos após o pagamento. Muito satisfeito com a rapidez.',
    date: '2024-03-15',
    verified: true
  },
  {
    id: '2',
    userName: 'Lucas Oliveira',
    rating: 5,
    comment: 'Comprei 2050 VP e foi super tranquilo. Preço justo e entrega instantânea. Recomendo muito!',
    date: '2024-03-14',
    verified: true
  },
  {
    id: '3',
    userName: 'Ana Costa',
    rating: 5,
    comment: 'Melhor site para comprar VP! Já é a terceira vez que compro aqui e nunca tive problemas.',
    date: '2024-03-13',
    verified: true
  },
  {
    id: '4',
    userName: 'Pedro Santos',
    rating: 4,
    comment: 'Processo bem simples e rápido. Só demorou um pouquinho mais que o esperado, mas nada grave.',
    date: '2024-03-12',
    verified: true
  },
  {
    id: '5',
    userName: 'Mariana Alves',
    rating: 5,
    comment: 'Comprei VP para presentear meu namorado e foi perfeito! Super fácil de usar e preço ótimo.',
    date: '2024-03-11',
    verified: true
  },
  {
    id: '6',
    userName: 'João Victor',
    rating: 5,
    comment: 'Site muito confiável! Paguei via PIX e os pontos caíram na hora. Voltarei a comprar com certeza.',
    date: '2024-03-10',
    verified: true
  },
  {
    id: '7',
    userName: 'Isabela Lima',
    rating: 5,
    comment: 'Adorei o atendimento e a rapidez. Os preços são realmente mais em conta que outros sites.',
    date: '2024-03-09',
    verified: true
  },
  {
    id: '8',
    userName: 'Rafael Mendes',
    rating: 4,
    comment: 'Bom serviço, entrega rápida. Só sugiro melhorarem a interface do site para ficar ainda melhor.',
    date: '2024-03-08',
    verified: true
  },
  {
    id: '9',
    userName: 'Thiago Costa',
    rating: 5,
    comment: 'Comprei 5350 VP e foi tudo perfeito! Preço excelente e suporte muito atencioso.',
    date: '2024-03-07',
    verified: true
  },
  {
    id: '10',
    userName: 'Beatriz Rocha',
    rating: 5,
    comment: 'Maravilhoso! Comprei pela primeira vez e superou minhas expectativas. Super recomendo!',
    date: '2024-03-06',
    verified: true
  }
];

function Feedback() {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);
  const [reviews] = useState<Review[]>(mockReviews);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      // Aqui você implementaria a lógica para salvar o feedback
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulando requisição
      setComment('');
      setRating(5);
      // Você poderia atualizar a lista de reviews aqui
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ value, onHover, onClick }: { value: number, onHover?: (value: number) => void, onClick?: (value: number) => void }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={onClick ? 'button' : 'submit'}
            onClick={() => onClick?.(star)}
            onMouseEnter={() => onHover?.(star)}
            onMouseLeave={() => onHover?.(0)}
            className="focus:outline-none"
          >
            <Star
              size={24}
              className={`${star <= (hoveredStar || value) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'} transition-colors`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0F1923] text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Avaliações dos Clientes</h1>
          <p className="text-gray-400">Veja o que nossos clientes estão dizendo sobre nós</p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#1F2326] p-6 rounded-lg text-center">
            <div className="flex items-center justify-center gap-2 text-yellow-400 mb-2">
              <Star className="fill-yellow-400" size={24} />
              <span className="text-2xl font-bold">4.8</span>
            </div>
            <p className="text-gray-400">Avaliação Média</p>
          </div>
          <div className="bg-[#1F2326] p-6 rounded-lg text-center">
            <div className="flex items-center justify-center gap-2 text-[#ff4655] mb-2">
              <MessageSquare size={24} />
              <span className="text-2xl font-bold">{reviews.length}</span>
            </div>
            <p className="text-gray-400">Total de Avaliações</p>
          </div>
          <div className="bg-[#1F2326] p-6 rounded-lg text-center">
            <div className="flex items-center justify-center gap-2 text-green-500 mb-2">
              <ThumbsUp size={24} />
              <span className="text-2xl font-bold">98%</span>
            </div>
            <p className="text-gray-400">Recomendam</p>
          </div>
        </div>

        {/* Formulário de Feedback */}
        {user && (
          <div className="bg-[#1F2326] rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Deixe seu Feedback</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2">Sua Avaliação</label>
                <StarRating
                  value={rating}
                  onClick={setRating}
                  onHover={setHoveredStar}
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Seu Comentário</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-[#0F1923] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4655] min-h-[100px]"
                  placeholder="Conte-nos sobre sua experiência..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold
                  ${isSubmitting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-[#ff4655] hover:bg-[#ff4655]/80'
                  }
                `}
              >
                <Send size={20} />
                {isSubmitting ? 'Enviando...' : 'Enviar Feedback'}
              </button>
            </form>
          </div>
        )}

        {/* Lista de Reviews */}
        <div className="grid gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-[#1F2326] rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#0F1923] p-2 rounded-full">
                    <User size={24} className="text-[#ff4655]" />
                  </div>
                  <div>
                    <h3 className="font-bold flex items-center gap-2">
                      {review.userName}
                      {review.verified && (
                        <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full">
                          Compra Verificada
                        </span>
                      )}
                    </h3>
                    <StarRating value={review.rating} />
                  </div>
                </div>
                <span className="text-sm text-gray-400">
                  {new Date(review.date).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <p className="text-gray-300">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feedback;