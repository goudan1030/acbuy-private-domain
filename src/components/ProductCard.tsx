import React from 'react';
import { Product } from './types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // 确保image_url存在且为有效URL
  const imageUrl = product.image_url || 'https://via.placeholder.com/150'; // 默认图片
  // 确保current_price存在且为有效数值
  const currentPrice = product.current_price ? parseFloat(product.current_price) : 0;
  // 确保original_price存在且为有效数值
  const originalPrice = product.original_price ? parseFloat(product.original_price) : 0;

  const hasDiscount = originalPrice > currentPrice;
  const discountPercentage = hasDiscount
    ? ((originalPrice - currentPrice) / originalPrice) * 100
    : 0;

  return (
    <div className="rounded-lg overflow-hidden flex flex-col h-full">
      {/* 使用默认图片如果image_url无效 */}
      <img src={imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      <h3 className="font-semibold text-gray-800"
       style={{
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: '1.5',
        maxHeight: '3em',
      }}
      >
      {product.name}</h3>

      <div className="mt-2 flex items-center justify-between">
        <div>
          <span className="font-bold text-red-600" style={{ fontSize: '18px' }}>
            ${currentPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="ml-2 text-gray-500 line-through" style={{ fontSize: '12px' }}>
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        {hasDiscount && (
          <span
            className="bg-red-100 text-red-800 text-xs font-semibold rounded"
            style={{ padding: '2px 5px', fontSize: '10px' }} // 缩小标签大小及边距
          >
            {discountPercentage.toFixed(0)}% OFF
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button className="bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition">
          BUY NOW
        </button>
        <button className="bg-gray-100 text-gray-800 py-2 rounded-md hover:bg-gray-200 transition">
          INQUIRY
        </button>
      </div>
    </div>
  );
};

export default ProductCard;