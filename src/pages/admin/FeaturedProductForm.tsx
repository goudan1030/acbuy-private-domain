import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

type FeaturedProductForm = {
  name: string;
  originalPrice: number;
  currentPrice: number;
  recommend: string;
  buyNowLink: string;
  inquiryLink: string;
  image: FileList;
};

const FeaturedProductForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FeaturedProductForm>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const navigate = useNavigate();

  const onSubmit = async (data: FeaturedProductForm) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      setUploadStatus('uploading');

      // 检查文件是否存在
      if (!data.image || data.image.length === 0) {
        throw new Error('请选择有效的文件');
      }

      // 获取文件对象
      const file = data.image[0];
      if (!(file instanceof File)) {
        throw new Error('文件格式不正确');
      }

      // 生成唯一文件名
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `featured-products/${fileName}`;

      // 上传文件到 Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      setUploadStatus('success');

      // 保存文件路径到数据库
      const { error: dbError } = await supabase
        .from('featured_products')
        .insert([{
          name: data.name,
          original_price: data.originalPrice,
          current_price: data.currentPrice,
          recommend: data.recommend,
          buy_now_link: data.buyNowLink,
          inquiry_link: data.inquiryLink,
          image_url: filePath,
        }]);

      if (dbError) {
        throw dbError;
      }

      navigate('/admin/featured-products');
    } catch (error) {
      setErrorMessage(error.message);
      setUploadStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">新增焦点商品</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-3xl">
        {/* 商品名称 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">商品名称</label>
          <input
            type="text"
            {...register('name', { required: '商品名称不能为空' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>

        {/* 原价 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">原价</label>
          <input
            type="number"
            {...register('originalPrice', { required: '原价不能为空' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.originalPrice && (
            <span className="text-red-500 text-sm">{errors.originalPrice.message}</span>
          )}
        </div>

        {/* 现价 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">现价</label>
          <input
            type="number"
            {...register('currentPrice', { required: '现价不能为空' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.currentPrice && (
            <span className="text-red-500 text-sm">{errors.currentPrice.message}</span>
          )}
        </div>

        {/* 推荐理由 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">推荐理由</label>
          <textarea
            {...register('recommend', { required: '推荐理由不能为空' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.recommend && (
            <span className="text-red-500 text-sm">{errors.recommend.message}</span>
          )}
        </div>

        {/* 立即购买链接 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">立即购买链接</label>
          <input
            type="text"
            {...register('buyNowLink')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* 咨询链接 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">咨询链接</label>
          <input
            type="text"
            {...register('inquiryLink')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* 图片上传 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">商品图片</label>
          <input
            type="file"
            {...register('image', { required: '请上传商品图片' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
        </div>

        {/* 提交按钮 */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            {isSubmitting ? '提交中...' : '提交'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeaturedProductForm;