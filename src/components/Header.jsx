import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

function Header() {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <>
      <div className="sticky flex justify-between items-center h-[60px] w-full border-[3px] border-solid rounded-[5px] border-light-text bg-dark-bg px-4">
        <p className="font-ubuntu font-medium text-[32px] text-white bg-transparent">dash</p>
        
        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center space-x-2 bg-dark-secondary px-3 py-2 rounded hover:bg-opacity-80 transition-colors"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className="text-light-text hidden md:inline text-sm max-w-[100px] truncate">{user?.name || 'User'}</span>
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-dark-secondary border border-gray-600 rounded-lg shadow-lg z-50">
              <div className="px-4 py-3 border-b border-gray-600">
                <p className="text-xs text-gray-400 font-medium">Logged in as:</p>
                <p className="text-sm text-light-text truncate">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-light-text hover:bg-dark-bg transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
