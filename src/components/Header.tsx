import React, { useState } from 'react';
import { Menu, Bell, User, ShoppingCart, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import AuthModal from './AuthModal';
import CartDrawer from './CartDrawer';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const { getTotalItems, clearCartLocal } = useCart();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);


  const handleAuthRequired = () => {
    setCartDrawerOpen(false);
    setAuthModalOpen(true);
  };

  return (
    <>
      {showLogoutDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  logout();
                  clearCartLocal();
                  setShowLogoutDialog(false);
                }}
                className="px-4 py-2 text-sm bg-saffron-600 text-white rounded hover:bg-saffron-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="lg:ml-64 bg-white/95 backdrop-blur-sm shadow-md border-b border-saffron-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-saffron-600 hover:bg-saffron-50 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="ml-4 mt-3 lg:ml-0 text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-decorative font-bold text-saffron-800">
                Om Namah Shivaya
              </h1>

            </div>

            <div className="flex items-center space-x-4">
              {/* Cart Button */}
              <button
                onClick={() => setCartDrawerOpen(true)}
                className="relative p-2 text-saffron-600 hover:bg-saffron-50 rounded-full transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </button>



              {/* User Menu */}
              {user ? (
                <div className="flex items-center space-x-2">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={() => setShowLogoutDialog(true)}
                    className="flex items-center space-x-2 p-2 text-saffron-600 hover:bg-saffron-50 rounded-lg transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="hidden sm:block text-sm">Logout</span>
                  </button>

                </div>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="flex items-center space-x-2 p-2 text-saffron-600 hover:bg-saffron-50 rounded-lg transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:block text-sm">Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        onAuthRequired={handleAuthRequired}
      />
    </>
  );
};

export default Header;