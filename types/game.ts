export interface Game {
  id: string;
  title: string;
  platform: string;
  region: string;
  country: string;
  productType: string;
  operatingSystem: string;
  genre: string;
  imageUrl: string;
  priceEur: number;
  oldPriceEur: number | null;
  discountPercent: number | null;
  cashbackEur: number | null;
  likes: number;
}
