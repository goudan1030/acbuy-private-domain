export interface Product {
  id: string;
  name: string;
  category: string;
  image_url: string | null;
  image_id: number | null;
  image?: {
    id: number;
    public_url: string;
  };
  created_at: string;
  updated_at: string;
}