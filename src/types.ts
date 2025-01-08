export interface Product {
  id: string;
  name: string;
  discountPercentage: number;
  imageUrl: string;
  originalPrice: number; // 确保包含 originalPrice
  currentPrice: number; // 确保包含 currentPrice
}

export interface StarRating {
  rating: number;
  maxRating: number;
}