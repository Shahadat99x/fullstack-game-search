export interface Game {
  id: string;
  title: string;
  platform: string;
  region: string;
  imageUrl: string;
  priceEur: number;
  oldPriceEur: number | null;
  discountPercent: number | null;
  cashbackEur: number | null;
  likes: number;
}
