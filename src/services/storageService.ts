import { supabase } from '../lib/supabaseClient';

// 创建 bucket (如果不存在)
const createBucket = async () => {
  const { data, error } = await supabase
    .storage
    .createBucket('public-assets', {
      public: true,
      allowedMimeTypes: ['image/webp'],
      fileSizeLimit: 10485760, // 10MB
    });

  if (error) {
    console.error('创建 bucket 失败:', error);
    throw error;
  }
  return data;
}; 

// 上传图片
const uploadImage = async (file: File) => {
  const { data, error } = await supabase
    .storage
    .from('public-assets')
    .upload(`backgrounds/${Date.now()}-${file.name}`, file);

  if (error) {
    console.error('上传图片失败:', error);
    throw error;
  }
  return data;
}; 

// 获取图片URL
const getPublicUrl = (path: string) => {
  const { data } = supabase
    .storage
    .from('public-assets')
    .getPublicUrl(path);
  
  return data.publicUrl;
}; 