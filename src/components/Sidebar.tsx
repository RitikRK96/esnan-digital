import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Waves, 
  History, 
  ShoppingBag, 
  BookOpen,
  Info, 
  Phone, 
  X,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const navigationItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Book e-Snan', href: '/book-e-snan', icon: Waves },
  { name: 'My Snan History', href: '/snan-history', icon: History },
  { name: 'Services', href: '/order-products', icon: ShoppingBag },
    { name: 'Profile', href: '/profile', icon: Phone },

  { name: 'About e-Snan', href: '/about', icon: Info },
  { name: 'Contact Us', href: '/contact', icon: Phone },
];

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 w-64 h-full bg-gradient-to-b from-saffron-800 to-saffron-900 
        transform transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-2xl
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-saffron-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-spiritual-gold rounded-full animate-glow">
                <Sparkles className="h-6 w-6 text-saffron-800" />
              </div>
              <div>
                <h2 className="text-xl font-decorative font-bold text-white">e-Snan</h2>
                <p className="text-xs text-saffron-200">Digital Divine Experience</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md text-saffron-200 hover:text-white hover:bg-saffron-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-spiritual-gold text-saffron-900 shadow-lg transform scale-105'
                      : 'text-saffron-100 hover:bg-saffron-700 hover:text-white hover:transform hover:scale-105'
                  }`
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-saffron-700">
            <div className="text-center text-saffron-200 text-xs">
              <p className="font-decorative text-lg mb-1">"Har Har Gange"</p>
              <p>Preserving Nature Through <br />Digital Devotion</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;