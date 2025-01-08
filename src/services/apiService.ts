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
    // console.log('开始获取全部商品...'); // 调试信息
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('获取全部商品失败:', error); // 打印完整错误信息
      throw new Error(`获取产品失败: ${error.message}`);
    }

    console.log('获取全部商品成功，数据:', data); // 调试信息
    return data || [];
  },

  // 根据分类获取商品
  async getProductsByCategory(category: string) {
    // console.log(`开始获取分类商品，分类: ${category}...`); // 调试信息
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)  // 使用eq进行精确匹配
      .order('created_at', { ascending: false });

    if (error) {
      console.error('获取分类商品失败:', error); // 打印完整错误信息
      // throw new Error(`获取分类产品失败: ${error.message}`);
    }

    // console.log(`获取分类商品成功，分类: ${category}，数据:`, data); // 调试信息
    return data || [];
  },

  // 获取推荐商品
  async getRecommendProducts() {
    console.log('开始获取推荐商品...'); // 调试信息
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', 'Recommended')  // 筛选category为Recommended的商品
      .order('created_at', { ascending: false });

    if (error) {
      console.error('获取推荐商品失败:', error); // 打印完整错误信息
      throw new Error(`获取推荐产品失败: ${error.message}`);
    }

    console.log('获取推荐商品成功，数据:', data); // 调试信息
    return data || [];
  }
};