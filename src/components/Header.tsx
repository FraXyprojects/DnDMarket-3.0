import React from 'react';
import { BarChartIcon } from 'lucide-react';
const Header: React.FC = () => {
  return <header className="bg-gray-800 shadow-lg py-4">
      <div className="container mx-auto px-4 flex items-center">
        <BarChartIcon className="h-8 w-8 text-purple-500 mr-3" />
        <h1 className="text-2xl font-bold text-white">
          Dark and Darker Market Tracker
        </h1>
      </div>
    </header>;
};
export default Header;