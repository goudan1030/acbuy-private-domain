import { supabase } from '../lib/supabaseClient';

export const getProductImageUrl = (product: any) => {
  if (!product) return null;

  try {
    // 1. 优先使用关联的图片表中的 public_url
    if (product.image?.public_url) {
      return product.image.public_url;
    }

    // 2. 如果有完整的 URL，直接返回
    if (product.image_url && (
      product.image_url.startsWith('http') || 
      product.image_url.startsWith('https')
    )) {
      return product.image_url;
    }

    // 3. 回退到默认图片
    return 'https://via.placeholder.com/150';
  } catch (error) {
    console.error('Error getting image URL:', error, product);
    return 'https://via.placeholder.com/150';
  }
};

// ... rest of the image service functions 