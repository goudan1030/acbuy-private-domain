export interface Product {
  id: string;
  name: string;
  category: string;
  original_price: number | null;
  current_price: number;
  image_url: string | null;
  image_id: number | null;
  image?: {
    id: number;
    public_url: string;
  };
  recommendation: string | null;
  purchase_link: string;
  inquiry_link: string;
  created_at: string;
  updated_at: string;
}