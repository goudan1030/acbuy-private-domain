// 定义产品类型
export interface Product {
    id: string;            // 产品的唯一标识
    name: string;          // 产品名称
    originalPrice: number; // 原始价格
    currentPrice: number;  // 当前价格
    imageUrl: string;      // 产品图片URL
    // 若有其他属性，则在这里添加
  }