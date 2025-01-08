import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate, useParams } from 'react-router-dom';

type FeaturedProductForm = {
  name: string;
  originalPrice: number;
  currentPrice: number;
  recommend: string;
  buyNowLink: string;
  inquiryLink: string;
  image: FileList;
};

const FeaturedProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FeaturedProductForm>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const navigate = useNavigate();

  // 加载商品数据
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        // 预填充表单数据
        setValue('name', data.name);
        setValue('originalPrice', data.original_price);
        setValue('currentPrice', data.current_price);
        setValue('recommend', data.recommend);
        setValue('buyNowLink', data.buy_now_link);
        setValue('inquiryLink', data.inquiry_link);

        // 设置图片预览
        const { data: imageData } = supabase.storage
          .from('featured-products')
          .getPublicUrl(data.image_url);
        setPreviewImage(imageData.publicUrl);
      } catch (error) {
         // 处理 error 类型
  if (error instanceof Error) {
    setErrorMessage(error.message); // 确保 error 是 Error 类型
  } else {
    setErrorMessage('发生未知错误'); // 处理非 Error 类型的错误
  }
      }
    };

    fetchProduct();
  }, [id, setValue]);

  const onSubmit = async (data: FeaturedProductForm) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      // 如果有新图片上传，先上传图片
      let imageUrl = previewImage;
      if (data.image && data.image.length > 0) {
        const file = data.image[0];
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = `featured-products/${fileName}`;

        // 上传新图片
        const { error: uploadError } = await supabase.storage
          .from('featured-products')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        imageUrl = filePath;
      }

      // 更新商品数据
      const { error } = await supabase
        .from('featured_products')
        .update({
          name: data.name,
          original_price: data.originalPrice,
          current_price: data.currentPrice,
          recommend: data.recommend,
          buy_now_link: data.buyNowLink,
          inquiry_link: data.inquiryLink,
          image_url: imageUrl,
        })
        .eq('id', id);

      if (error) {
        throw error;
      }

      navigate('/admin/featured-products');
    } catch (error) {
      // 处理 error 类型
  if (error instanceof Error) {
    setErrorMessage(error.message); // 确保 error 是 Error 类型
  } else {
    setErrorMessage('发生未知错误'); // 处理非 Error 类型的错误
  }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">编辑焦点商品</h1>
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
            {...register('image')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* 图片预览 */}
        {previewImage && (
          <div>
            <label className="block text-sm font-medium text-gray-700">当前图片</label>
            <img
              src={previewImage}
              alt="当前商品图片"
              className="mt-1 w-32 h-32 object-cover rounded-md"
            />
          </div>
        )}

        {/* 错误信息 */}
        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}

        {/* 提交按钮 */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            {isSubmitting ? '保存中...' : '保存更改'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeaturedProductEdit;