import React, { useState } from 'react';
import { Menu, Bell, Search, X } from 'lucide-react';
import Button from '../ui/Button';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuClick }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="bg-white shadow-sm h-16 flex items-center fixed top-0 right-0 left-64 z-20 px-6">
      <div className="flex-1 flex items-center">
        <button onClick={onMenuClick} className="lg:hidden mr-4 text-gray-500 focus:outline-none">
          <Menu size={24} />
        </button>
        
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {showSearch ? (
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            <button 
              onClick={() => setShowSearch(false)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setShowSearch(true)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Search size={20} />
          </button>
        )}
        
        <button className="relative text-gray-500 hover:text-gray-700 focus:outline-none">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
            A
          </div>
          <span className="text-sm font-medium text-gray-700 hidden md:inline-block">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;