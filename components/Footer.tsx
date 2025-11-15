
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800/50 mt-12 py-6">
      <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Kisanmitra PlantScanner. Powered by AI.</p>
      </div>
    </footer>
  );
};

export default Footer;
