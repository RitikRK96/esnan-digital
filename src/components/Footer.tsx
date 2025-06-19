import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'Youtube' }
  ];

  const quickLinks = [
    { name: 'Book e-Snan', href: '/book-e-snan' },
    { name: 'My History', href: '/snan-history' },
    { name: 'Order Products', href: '/order-products' },
    { name: 'Spiritual Blogs', href: '/blogs' },
    { name: 'About Us', href: '/about' }
  ];

  const supportLinks = [
    { name: 'Help Center', href: '/contact' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Refund Policy', href: '#' }
  ];

  return (
    <footer className="bg-gradient-to-b from-saffron-900 to-saffron-950 text-white lg:ml-64">
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-spiritual-gold rounded-full">
                  <Heart className="h-6 w-6 text-saffron-800" />
                </div>
                <div>
                  <h3 className="text-2xl font-decorative font-bold text-white">e-Snan</h3>
                  <p className="text-orange-200 text-sm">Digital Divine Experience</p>
                </div>
              </div>
              <p className="text-orange-100 leading-relaxed mb-6 max-w-md">
                Connecting devotees worldwide with sacred traditions while preserving our precious 
                rivers and environment for future generations.
              </p>
              
              {/* Contact Info */}
              {/* <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 flex-shrink-0 text-orange-300" />
                  <span className="text-orange-100 font-medium">+91 98765 43210</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 flex-shrink-0 text-orange-300" />
                  <span className="text-orange-100 font-medium">support@e-snan.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-3 flex-shrink-0 text-orange-300" />
                  <span className="text-orange-100 font-medium">Haridwar, Uttarakhand, India</span>
                </div>
              </div> */}
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-spiritual-gold">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-orange-100 hover:text-white transition-colors duration-200 hover:underline font-medium"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-spiritual-gold">Support</h4>
              <ul className="space-y-3">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-orange-100 hover:text-white transition-colors duration-200 hover:underline font-medium"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sacred Quote */}
          <div className="text-center py-8 border-t border-orange-900 border-b border-orange-900 my-8">
            <blockquote className="text-xl lg:text-2xl font-decorative text-spiritual-gold mb-4 italic ">
              "Ganga Snan is not just a bath, it's a rebirth of the soul."
            </blockquote>
            <cite className="text-orange-800 text-sm font-medium">— Ancient Vedic Wisdom</cite>
          </div>

          {/* Social Links & Environmental Message */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="text-center lg:text-left">
              <h4 className="text-lg font-semibold mb-4 text-spiritual-gold">Follow Our Sacred Journey</h4>
              <div className="flex justify-center lg:justify-start space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="p-3 bg-orange-900 rounded-full hover:bg-orange-700 transition-colors duration-200 transform hover:scale-110"
                  >
                    <social.icon className="h-5 w-5 text-white" />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="text-center lg:text-right">
              <div className="bg-green-800/40 rounded-lg p-4 backdrop-blur-sm border border-green-700/30">
                <p className="text-green-200 text-sm font-bold mb-1">🌿 Environmental Impact</p>
                <p className="text-green-100 text-xs font-medium">
                  Every e-Snan saves approximately 50 liters of sacred water<br />
                  and reduces carbon footprint by 75%
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-orange-700 text-center">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
              <p className="text-orange-900 font-medium">© 2024 e-Snan. All rights reserved. Made with ❤️ for spiritual devotees worldwide.</p>
              <p className="mt-2 sm:mt-0 text-orange-900 font-medium">Preserving tradition, protecting nature.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;