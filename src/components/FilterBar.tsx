import React from 'react';
import { SearchIcon, FilterIcon } from 'lucide-react';
interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedRarity: string;
  setSelectedRarity: (rarity: string) => void;
}
const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedRarity,
  setSelectedRarity
}) => {
  const rarities = ['all', 'common', 'uncommon', 'rare', 'epic', 'legendary', 'mythical', 'unique'];
  return <div className="bg-gray-800 p-4 rounded-lg mb-6 flex flex-col md:flex-row gap-4">
      <div className="relative flex-grow">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input type="text" placeholder="Search items..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
      </div>
      <div className="relative flex items-center">
        <FilterIcon className="absolute left-3 text-gray-400 h-5 w-5" />
        <select value={selectedRarity} onChange={e => setSelectedRarity(e.target.value)} className="pl-10 pr-8 py-2 bg-gray-700 text-white rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500">
          {rarities.map(rarity => <option key={rarity} value={rarity}>
              {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
            </option>)}
        </select>
      </div>
    </div>;
};
export default FilterBar;