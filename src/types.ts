export interface Item {
  id: string;
  name: string;
  rarity: string;
  type: string;
  currentPrice: number;
  previousPrice?: number;
  stock?: number;
  imageUrl?: string;
  description?: string;
}
export interface PriceHistoryPoint {
  timestamp: number;
  price: number;
  volume?: number;
}