import React from 'react';
import { Product } from '../types/Product';
import { getProductImageUrl } from '../services/imageService';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl = getProductImageUrl(product) || 'https://via.placeholder.com/150';
  const currentPrice = product.current_price ? parseFloat(String(product.current_price)) : 0;
  const originalPrice = product.original_price ? parseFloat(String(product.original_price)) : currentPrice;

  const hasDiscount = originalPrice > currentPrice;
  const discountPercentage = hasDiscount
    ? ((originalPrice - currentPrice) / originalPrice) * 100
    : 0;

  const handleBuyClick = () => {
    if (product.purchase_link) {
      window.open(product.purchase_link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleInquiryClick = () => {
    if (product.inquiry_link) {
      window.open(product.inquiry_link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="rounded-lg overflow-hidden flex flex-col h-full">
      <div className="relative w-full" style={{ paddingTop: '100%' }}>
        <div className="absolute inset-0">
          <img 
            src={imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <h3 className="font-semibold text-gray-800 mt-2"
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
        {product.name}
      </h3>

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
            style={{ padding: '2px 5px', fontSize: '10px' }}
          >
            {discountPercentage.toFixed(0)}% OFF
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button 
          onClick={handleBuyClick}
          className="bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
        >
          BUY NOW
        </button>
        <button 
          onClick={handleInquiryClick}
          className="bg-gray-100 text-gray-800 py-2 rounded-md hover:bg-gray-200 transition"
        >
          INQUIRY
        </button>
      </div>
    </div>
  );
};

export default ProductCard;