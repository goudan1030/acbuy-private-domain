import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY);
  throw new Error('Supabase URL 和 Key 必须在 .env 文件中配置');
}

// 确保只创建一个实例
export const supabase = createClient(supabaseUrl, supabaseKey);

// 文件大小限制
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// 文件验证函数
export const validateFile = (file: File) => {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('文件大小不能超过5MB');
  }
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('仅支持JPEG和PNG格式');
  }
};