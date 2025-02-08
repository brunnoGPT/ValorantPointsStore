import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, MessageSquare, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="bg-[#0F1923] py-3 md:py-4 fixed w-full top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center gap-4 md:gap-0">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white text-xl md:text-2xl font-bold">VALORANT POINTS STORE</Link>
          {user && (
            <span className="text-white text-sm md:hidden">Olá, {user.displayName}</span>
          )}
        </div>
        <div className="flex flex-wrap gap-2 md:gap-4 md:ml-auto items-center">
          <Link
            to="/feedback"
            className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-transparent hover:bg-[#ff4655]/10 text-white transition-colors text-sm md:text-base"
          >
            <MessageSquare size={18} />
            <span className="hidden md:inline">Avaliações</span>
          </Link>
          {user ? (
            <>
              <Link
                to="/purchases"
                className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-transparent hover:bg-[#ff4655]/10 text-white transition-colors text-sm md:text-base"
              >
                <ShoppingBag size={18} />
                <span className="hidden md:inline">Minhas Compras</span>
              </Link>
              <span className="hidden md:inline text-white">Olá, {user.displayName}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-[#ff4655] hover:bg-[#ff4655]/80 text-white transition-colors text-sm md:text-base"
              >
                <LogOut size={18} />
                <span className="hidden md:inline">Sair</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-transparent hover:bg-[#ff4655]/10 text-white transition-colors text-sm md:text-base"
              >
                <User size={18} />
                <span className="hidden md:inline">Login</span>
              </Link>
              <Link
                to="/register"
                className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-[#ff4655] hover:bg-[#ff4655]/80 text-white transition-colors text-sm md:text-base"
              >
                Cadastrar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
