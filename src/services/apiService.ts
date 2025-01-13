import { Product } from '../types/Product';
import { supabase } from '../lib/supabaseClient';

// 接口定义
export interface ApiService {
  getProducts(): Promise<Product[]>; // 获取全部商品
  getProductsByCategory(category: string): Promise<Product[]>; // 根据分类获取商品
  getRecommendProducts(): Promise<Product[]>; // 获取推荐商品
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

    // 打印第一个商品的数据，用于调试
    if (data && data.length > 0) {
      console.log('First product data:', data[0]);
    }

    return data || [];
  },

  // 根据分类获取商品
  async getProductsByCategory(category: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        image:image_id (
          id,
          public_url
        )
      `)
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('获取分类商品失败:', error);
    }

    return data || [];
  },

  // 获取推荐商品
  async getRecommendProducts() {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        image:image_id (
          id,
          public_url
        )
      `)
      .eq('category', 'Recommended')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('获取推荐商品失败:', error);
      throw new Error(`获取推荐产品失败: ${error.message}`);
    }

    if (data && data.length > 0) {
      console.log('First recommended product:', data[0]);
    }

    return data || [];
  }
};