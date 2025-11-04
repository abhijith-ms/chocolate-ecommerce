import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-chocolate-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-chocolate-accent rounded-full flex items-center justify-center">
                <span className="text-chocolate-primary font-bold text-lg">C</span>
              </div>
              <span className="font-serif text-xl font-bold">ChocoluxE</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Crafted with passion in Bahrain, our premium chocolates are made to melt hearts 
              and create unforgettable moments. Each piece is a testament to luxury and quality.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Heart className="h-4 w-4 text-chocolate-accent" />
              <span>Made with love in Bahrain</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-chocolate-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-chocolate-accent transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-chocolate-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-chocolate-accent transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-chocolate-accent" />
                <a 
                  href="https://wa.me/919895905758" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-chocolate-accent transition-colors"
                >
                  +91 98959 05758
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-chocolate-accent" />
                <a 
                  href="mailto:info@chocoluxe.com" 
                  className="text-gray-300 hover:text-chocolate-accent transition-colors"
                >
                  info@chocoluxe.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-chocolate-accent mt-1" />
                <span className="text-gray-300">
                  Manama, Bahrain
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 ChocoluxE. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-chocolate-accent transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-chocolate-accent transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;