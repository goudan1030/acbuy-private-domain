import { Product } from '../types/Product';
import { supabase } from '../lib/supabaseClient';

// 接口定义
export interface ApiService {
  getProducts(): Promise<Product[]>; // 获取全部商品
}

// 实现类
export const apiService: ApiService = {
  // 获取全部商品
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        image:image_id (
          id,
          public_url
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('获取全部商品失败:', error);
      throw new Error(`获取产品失败: ${error.message}`);
    }

    return data || [];
  }
};