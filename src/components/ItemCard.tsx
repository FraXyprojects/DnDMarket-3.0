import React from 'react';
import { Item } from '../types';
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
interface ItemCardProps {
  item: Item;
  onClick: () => void;
}
const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onClick
}) => {
  // Function to determine the color based on rarity
  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'common':
        return 'bg-gray-600';
      case 'uncommon':
        return 'bg-green-600';
      case 'rare':
        return 'bg-blue-600';
      case 'epic':
        return 'bg-purple-600';
      case 'legendary':
        return 'bg-yellow-500';
      case 'mythical':
        return 'bg-red-600';
      case 'unique':
        return 'bg-orange-500';
      default:
        return 'bg-gray-600';
    }
  };
  // Determine if price is trending up or down
  const isPriceUp = item.currentPrice > (item.previousPrice || 0);
  return <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-shadow cursor-pointer" onClick={onClick}>
      <div className={`h-2 ${getRarityColor(item.rarity)}`}></div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-10 h-10 mr-3 object-contain" onError={e => {
          e.currentTarget.src = 'https://via.placeholder.com/40?text=?';
        }} />}
          <h3 className="text-lg font-medium text-white truncate">
            {item.name}
          </h3>
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm text-gray-400">{item.rarity}</span>
          <div className="flex items-center">
            <span className={`text-lg font-bold ${isPriceUp ? 'text-green-400' : 'text-red-400'}`}>
              {item.currentPrice} G
            </span>
            {isPriceUp ? <TrendingUpIcon className="h-4 w-4 text-green-400 ml-1" /> : <TrendingDownIcon className="h-4 w-4 text-red-400 ml-1" />}
          </div>
        </div>
      </div>
    </div>;
};
export default ItemCard;