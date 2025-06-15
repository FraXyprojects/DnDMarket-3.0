import React from 'react';
import { Item } from '../types';
import ItemCard from './ItemCard';
interface ItemGridProps {
  items: Item[];
  onSelectItem: (item: Item) => void;
}
const ItemGrid: React.FC<ItemGridProps> = ({
  items,
  onSelectItem
}) => {
  if (items.length === 0) {
    return <div className="bg-gray-800 rounded-lg p-8 text-center">
        <p className="text-gray-300 text-lg">
          No items found matching your filters.
        </p>
      </div>;
  }
  return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {items.map(item => <ItemCard key={item.id} item={item} onClick={() => onSelectItem(item)} />)}
    </div>;
};
export default ItemGrid;