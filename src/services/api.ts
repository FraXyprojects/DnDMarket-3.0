import axios from 'axios';
import { Item } from '../types';
const API_BASE_URL = 'https://api.darkerdb.com/v1';
// Updated mock data with specific items and IDs
const MOCK_ITEMS: Item[] = [{
  id: 'GoldenKey',
  name: 'Golden Key',
  rarity: 'unique',
  type: 'key',
  currentPrice: 2500,
  previousPrice: 2300,
  stock: 31,
  imageUrl: 'https://placehold.co/200x200/222222/666666?text=Golden+Key',
  description: 'An ornate golden key that opens valuable treasure chests.'
}, {
  id: 'SkullKey',
  name: 'Skull Key',
  rarity: 'unique',
  type: 'key',
  currentPrice: 2800,
  previousPrice: 2600,
  stock: 25,
  imageUrl: 'https://placehold.co/200x200/222222/666666?text=Skull+Key',
  description: 'A mysterious key adorned with skull markings.'
}, {
  id: 'GoldCoinChest',
  name: 'Gold Coin Chest',
  rarity: 'unique',
  type: 'container',
  currentPrice: 5000,
  previousPrice: 4800,
  stock: 15,
  imageUrl: 'https://placehold.co/200x200/222222/666666?text=Gold+Coin+Chest',
  description: 'A sturdy chest filled with valuable gold coins.'
}, {
  id: 'SpectralCoinbag',
  name: 'Spectral Coin Bag',
  rarity: 'unique',
  type: 'container',
  currentPrice: 3500,
  previousPrice: 3200,
  stock: 20,
  imageUrl: 'https://placehold.co/200x200/222222/666666?text=Spectral+Coin+Bag',
  description: 'A mystical bag of coins with an ethereal glow.'
}, {
  id: 'GoldCoinBag',
  name: 'Gold Coin Bag',
  rarity: 'unique',
  type: 'container',
  currentPrice: 3000,
  previousPrice: 2800,
  stock: 28,
  imageUrl: 'https://placehold.co/200x200/222222/666666?text=Gold+Coin+Bag',
  description: 'A hefty bag filled with gold coins.'
}, {
  id: 'SurgicalKit_3001',
  name: 'Surgical Kit',
  rarity: 'uncommon',
  type: 'consumable',
  currentPrice: 400,
  previousPrice: 380,
  stock: 150,
  imageUrl: 'https://placehold.co/200x200/222222/666666?text=Surgical+Kit',
  description: 'A basic set of surgical tools for field operations.'
}, {
  id: 'SurgicalKit_4001',
  name: 'Surgical Kit',
  rarity: 'rare',
  type: 'consumable',
  currentPrice: 600,
  previousPrice: 580,
  stock: 120,
  imageUrl: 'https://placehold.co/200x200/222222/666666?text=Surgical+Kit',
  description: 'An advanced set of surgical tools for complex procedures.'
}, {
  id: 'SurgicalKit_5001',
  name: 'Surgical Kit',
  rarity: 'epic',
  type: 'consumable',
  currentPrice: 800,
  previousPrice: 850,
  stock: 94,
  imageUrl: 'https://placehold.co/200x200/222222/666666?text=Surgical+Kit',
  description: 'A masterfully crafted set of surgical tools for the most demanding operations.'
}];
export const fetchItems = async (): Promise<Item[]> => {
  // For now, return mock data instead of making API call
  return Promise.resolve(MOCK_ITEMS);
  // When API is ready, uncomment this:
  /*
  try {
    const response = await axios.get(`${API_BASE_URL}/price-check`)
    return response.data.map((item: any) => ({
      id: item.item_id || item.id,
      name: item.name,
      rarity: item.rarity,
      type: item.type,
      currentPrice: item.current_price || item.price,
      previousPrice: item.previous_price,
      stock: item.stock,
      imageUrl: item.image_url,
      description: item.description
    }))
  } catch (error) {
    console.error('Error fetching items:', error)
    throw new Error('Failed to fetch market data. Please try again later.')
  }
  */
};
export const fetchItemHistory = async (itemId: string, timeRange: string): Promise<any[]> => {
  // Generate mock price history data
  const now = Date.now();
  const points = 50;
  const data = [];
  for (let i = points - 1; i >= 0; i--) {
    const item = MOCK_ITEMS.find(item => item.id === itemId);
    const basePrice = item ? item.currentPrice : 1000;
    data.push({
      timestamp: now - i * (getTimeInMilliseconds(timeRange) / points),
      price: basePrice * (0.8 + Math.random() * 0.4),
      // Random price ±20%
      volume: Math.floor(Math.random() * 100) + 20
    });
  }
  return Promise.resolve(data);
};
// Helper function to convert time range to milliseconds
function getTimeInMilliseconds(timeRange: string): number {
  switch (timeRange) {
    case '12h':
      return 12 * 60 * 60 * 1000;
    case '1d':
      return 24 * 60 * 60 * 1000;
    case '2d':
      return 2 * 24 * 60 * 60 * 1000;
    case '3d':
      return 3 * 24 * 60 * 60 * 1000;
    case '1w':
      return 7 * 24 * 60 * 60 * 1000;
    case '2w':
      return 14 * 24 * 60 * 60 * 1000;
    default:
      return 7 * 24 * 60 * 60 * 1000;
  }
}