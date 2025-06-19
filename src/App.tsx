import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BookeSnan from './pages/BookeSnan';
import SnakHistory from './pages/SnanHistory';
import OrderProducts from './pages/OrderProducts';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';

import Blogs from './pages/Blogs';
import BlogPost from './pages/BlogPost';
import PrivacyPolicy from './pages/Policies/PrivacyPolicy';
import RefundPolicy from './pages/Policies/RefundPolicy';
import TermsAndConditions from './pages/Policies/TermsAndConditions';
import BackToTopButton from './components/BackToTopButton';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-spiritual-cream to-saffron-50 font-serif">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main className="lg:ml-64 transition-all duration-300">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book-e-snan" element={<BookeSnan />} />
                <Route path="/snan-history" element={<SnakHistory />} />
                <Route path="/order-products" element={<OrderProducts />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                <Route path="/RefundPolicy" element={<RefundPolicy />} />
                <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
                <Route path="/profile" element={<Profile />} />



              </Routes>

            </main>

            <Footer />
            <BackToTopButton />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;