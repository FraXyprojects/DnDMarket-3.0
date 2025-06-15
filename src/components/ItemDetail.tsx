import React, { useEffect, useState } from 'react';
import { Item } from '../types';
import { XIcon } from 'lucide-react';
import PriceChart from './PriceChart';
import { fetchItemHistory } from '../services/api';
interface ItemDetailProps {
  item: Item;
  onClose: () => void;
}
const ItemDetail: React.FC<ItemDetailProps> = ({
  item,
  onClose
}) => {
  const [timeRange, setTimeRange] = useState<string>('1w');
  const [priceHistory, setPriceHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const timeRanges = [{
    value: '12h',
    label: '12 Hours'
  }, {
    value: '1d',
    label: '1 Day'
  }, {
    value: '2d',
    label: '2 Days'
  }, {
    value: '3d',
    label: '3 Days'
  }, {
    value: '1w',
    label: '1 Week'
  }, {
    value: '2w',
    label: '2 Weeks'
  }];
  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true);
        const history = await fetchItemHistory(item.id, timeRange);
        setPriceHistory(history);
      } catch (err) {
        setError('Failed to load price history');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, [item.id, timeRange]);
  // Function to determine the color based on rarity
  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'common':
        return 'border-gray-600';
      case 'uncommon':
        return 'border-green-600';
      case 'rare':
        return 'border-blue-600';
      case 'epic':
        return 'border-purple-600';
      case 'legendary':
        return 'border-yellow-500';
      case 'mythical':
        return 'border-red-600';
      default:
        return 'border-gray-600';
    }
  };
  return <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-white">{item.name}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700">
            <XIcon className="h-6 w-6 text-gray-400" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-shrink-0">
              <div className={`w-32 h-32 border-2 ${getRarityColor(item.rarity)} rounded-lg overflow-hidden bg-gray-700 flex items-center justify-center`}>
                {item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="max-w-full max-h-full object-contain" onError={e => {
                e.currentTarget.src = 'https://via.placeholder.com/128?text=?';
              }} /> : <span className="text-gray-400">No image</span>}
              </div>
            </div>
            <div className="flex-grow">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 mb-1">Rarity</p>
                  <p className="text-white font-medium">{item.rarity}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Current Price</p>
                  <p className="text-white font-medium text-xl">
                    {item.currentPrice} G
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Type</p>
                  <p className="text-white font-medium">
                    {item.type || 'Unknown'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Stock</p>
                  <p className="text-white font-medium">
                    {item.stock || 'Unknown'}
                  </p>
                </div>
              </div>
              {item.description && <div className="mt-4">
                  <p className="text-gray-400 mb-1">Description</p>
                  <p className="text-white">{item.description}</p>
                </div>}
            </div>
          </div>
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Price History</h3>
              <div className="flex space-x-2 overflow-x-auto">
                {timeRanges.map(range => <button key={range.value} onClick={() => setTimeRange(range.value)} className={`px-3 py-1 text-sm rounded-md ${timeRange === range.value ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                    {range.label}
                  </button>)}
              </div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 h-80">
              {loading ? <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div> : error ? <div className="h-full flex items-center justify-center text-red-400">
                  {error}
                </div> : <PriceChart data={priceHistory} timeRange={timeRange} />}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default ItemDetail;