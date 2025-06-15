import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import ItemGrid from './components/ItemGrid';
import ItemDetail from './components/ItemDetail';
import { fetchItems } from './services/api';
import { Item } from './types';
export function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        const data = await fetchItems();
        // Filter out gear items
        const filteredData = data.filter((item: Item) => !['helmet', 'chestplate', 'gloves', 'boots', 'weapon', 'shield'].includes(item.type.toLowerCase()));
        setItems(filteredData);
        setFilteredItems(filteredData);
      } catch (err) {
        setError('Failed to load items. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);
  useEffect(() => {
    let result = [...items];
    // Apply search filter
    if (searchTerm) {
      result = result.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    // Apply rarity filter
    if (selectedRarity !== 'all') {
      result = result.filter(item => item.rarity.toLowerCase() === selectedRarity.toLowerCase());
    }
    setFilteredItems(result);
  }, [searchTerm, selectedRarity, items]);
  const handleItemSelect = (item: Item) => {
    setSelectedItem(item);
  };
  const handleCloseDetail = () => {
    setSelectedItem(null);
  };
  return <div className="bg-gray-900 text-gray-100 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <FilterBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedRarity={selectedRarity} setSelectedRarity={setSelectedRarity} />
        {loading ? <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div> : error ? <div className="bg-red-900 text-white p-4 rounded-md">{error}</div> : <ItemGrid items={filteredItems} onSelectItem={handleItemSelect} />}
        {selectedItem && <ItemDetail item={selectedItem} onClose={handleCloseDetail} />}
      </main>
    </div>;
}