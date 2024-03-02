 // Footer.jsx

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 h-32">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Social media icons */}
          <a href="#" className="text-xl">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-xl">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-xl">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
        
        <div className="flex flex-wrap items-center space-x-4">
          {/* Additional links */}
          <a href="services" className="hover:text-gray-300">Services</a>
          <a href="contacts" className="hover:text-gray-300">Contacts</a>
          <a href="faqs" className="hover:text-gray-300">FAQS</a>
          <a href="shipping_info" className="hover:text-gray-300">Shipping Info</a>
          <a href="return_policy" className="hover:text-gray-300">Return Policy</a>
          <a href="privacy_policy" className="hover:text-gray-300">Privacy policy</a>
          <a href="terms_conditions" className="hover:text-gray-300">Terms & Conditions</a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
