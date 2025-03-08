import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-black text-white py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Column 1: Logo and description */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">MyStore</h2>
            <p className="text-sm text-gray-400">
              Your one-stop shop for the latest products and exclusive offers. Enjoy a seamless shopping experience!
            </p>
          </div>

          {/* Column 2: Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-orange-500">Home</a>
              </li>
              <li>
                <a href="/shop" className="hover:text-orange-500">Shop</a>
              </li>
              <li>
                <a href="/about" className="hover:text-orange-500">About Us</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-orange-500">Contact</a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-orange-500">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-500">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-500">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-500">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-500">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row: Copyright */}
        <div className="border-t border-gray-600 pt-4 mt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 MyStore. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
