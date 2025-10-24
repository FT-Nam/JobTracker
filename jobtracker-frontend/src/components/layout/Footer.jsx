import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="text-sm text-gray-500">
            © 2024 JobTracker. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <button className="hover:text-gray-900 transition-colors">
              Privacy Policy
            </button>
            <button className="hover:text-gray-900 transition-colors">
              Terms of Service
            </button>
            <button className="hover:text-gray-900 transition-colors">
              Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
