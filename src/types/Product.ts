export interface Product {
  id: string;
  name: string;
  category: string; // 修改为string类型，因为数据库中是字符串
  original_price: number | null; // 修改为number | null，因为数据库允许null
  current_price: number; // 修改为number类型
  image_url: string | null; // 修改为image_url，因为数据库中是image_url字段
  recommendation: string | null; // 修改为string | null，因为数据库允许null
  purchase_link: string;
  inquiry_link: string;
  created_at: string; // 保持为string类型
  updated_at: string; // 保持为string类型
}