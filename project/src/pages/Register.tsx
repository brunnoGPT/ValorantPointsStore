import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await signUp(email, password, name);
      navigate('/');
    } catch (error) {
      setError('Falha ao criar conta. Verifique suas informações.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1923] flex items-center justify-center px-4">
      <div className="bg-[#1F2326] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Cadastro</h2>
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg flex items-center gap-2 mb-6">
            <AlertCircle size={20} />
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2">Nome</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0F1923] text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4655]"
                placeholder="Seu nome"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0F1923] text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4655]"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0F1923] text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4655]"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full bg-[#ff4655] text-white py-3 rounded-lg font-bold
              transition-colors
              ${loading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-[#ff4655]/80'
              }
            `}
          >
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </button>
        </form>
        <p className="text-gray-400 text-center mt-6">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-[#ff4655] hover:text-[#ff4655]/80">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;