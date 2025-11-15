
import React from 'react';
import { Sprout } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <Sprout className="h-8 w-8 text-green-600 dark:text-green-400 mr-3" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
          Kisanmitra PlantScanner
        </h1>
      </div>
    </header>
  );
};

export default Header;
