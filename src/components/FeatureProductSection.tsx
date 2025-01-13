import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Product } from '../types/Product';
import { apiService } from '../services/apiService';

interface FeatureProductSectionProps {
  product?: Product;
}

const FeatureProductSection: React.FC<FeatureProductSectionProps> = () => {
  const [currentIndex] = useState(0);
  const [recommendProducts, setRecommendProducts] = useState<Product[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>();

  const fetchRecommendProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getRecommendProducts();
      if (data && data.length > 0) {
        setRecommendProducts(prev => [...prev, ...data]);
        setHasMore(data.length >= 10);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching recommended products:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecommendProducts();
  }, [fetchRecommendProducts]);

  // 滚动加载
  const lastProductRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prev => prev + 1);
          fetchRecommendProducts(page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, fetchRecommendProducts, page]
  );

  // 鼠标事件处理
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - translateX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const x = e.pageX - startX;
    setTranslateX(x);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 触摸事件处理
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - translateX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - startX;
    setTranslateX(x);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // 如果没有推荐商品，显示占位内容
  if (recommendProducts.length === 0 && !isLoading) {
    return (
      <section
        className="relative p-4 bg-white rounded-lg shadow-md overflow-hidden"
        style={{ margin: '0.5rem 0.5rem' }}
      >
        <div
          className="absolute top-0 left-0 w-full flex justify-start items-center"
          style={{
            height: '40px',
            background: 'linear-gradient(180deg, #F97D6B 0%, rgba(249, 125, 107, 0.1) 100%)',
            padding: '0 1rem',
            zIndex: 10,
          }}
        >
          <h2
            className="font-bold uppercase"
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '14px' }}
          >
            Best Sellers on ACBUY
          </h2>
        </div>
        <div className="pt-8 flex items-center justify-center" style={{ height: '220px' }}>
          <p className="text-gray-500">No recommended products</p>
        </div>
      </section>
    );
  }

  // 骨架屏
  if (isLoading && recommendProducts.length === 0) {
    return (
      <section
        className="relative p-4 bg-white rounded-lg shadow-md overflow-hidden"
        style={{ margin: '0.5rem 0.5rem' }}
      >
        <div
          className="absolute top-0 left-0 w-full flex justify-start items-center"
          style={{
            height: '40px',
            background: 'linear-gradient(180deg, #F97D6B 0%, rgba(249, 125, 107, 0.1) 100%)',
            padding: '0 1rem',
            zIndex: 10,
          }}
        >
          <h2
            className="font-bold uppercase"
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '14px' }}
          >
            Best Sellers on ACBUY
          </h2>
        </div>

        <div className="pt-8 flex justify-center items-center">
          <div className="w-2/5 flex-shrink-0 overflow-hidden rounded-lg" style={{ height: '220px' }}>
            <div className="animate-pulse bg-gray-200 h-full w-full"></div>
          </div>
          <div className="pl-4 w-3/5 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="animate-pulse bg-gray-200 h-6 w-3/4 rounded"></div>
              <div className="animate-pulse bg-gray-200 h-4 w-1/2 rounded mt-2"></div>
              <div className="animate-pulse bg-gray-200 h-4 w-1/3 rounded mt-2"></div>
              <div className="animate-pulse bg-gray-200 h-4 w-2/3 rounded mt-2"></div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="animate-pulse bg-gray-200 h-10 rounded-md"></div>
              <div className="animate-pulse bg-gray-200 h-10 rounded-md"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentProduct = recommendProducts[currentIndex];

  // 计算折扣率和价格
  const discountedPrice = currentProduct.current_price || 0;
  const originalPrice = currentProduct.original_price || discountedPrice;
  const discountPercentage = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);

  return (
    <section
      className="relative p-4 bg-white rounded-lg shadow-md overflow-hidden"
      style={{ margin: '0.5rem 0.5rem' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* 标题区域 */}
      <div
        className="absolute top-0 left-0 w-full flex justify-start items-center"
        style={{
          height: '40px',
          background: 'linear-gradient(180deg, #F97D6B 0%, rgba(249, 125, 107, 0.1) 100%)',
          padding: '0 1rem',
          zIndex: 10,
        }}
      >
        <h2
          className="font-bold uppercase"
          style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '14px' }}
        >
          Best Sellers on ACBUY
        </h2>
      </div>

      {/* 焦点产品内容展示 */}
      <div
        className="pt-8 flex justify-center items-center"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateX(${translateX}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease',
        }}
      >
        {/* Image container */}
        <div className="w-2/5 flex-shrink-0">
          <div style={{ width: '100%', paddingTop: '100%', position: 'relative' }}>
            <div className="absolute top-0 left-0 w-full h-full p-2">
              <div className="w-full h-full rounded-lg overflow-hidden">
                <img 
                  src={currentProduct.image_url || '/placeholder-image.jpg'} 
                  alt={currentProduct.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content container */}
        <div className="pl-4 w-3/5 overflow-hidden flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-800 text-lg" style={{
              fontSize: '18px',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis',
            }}>
              {currentProduct.name}
            </h3>
            <div className="flex items-center justify-start mt-1">
              <span className="text-2xl font-bold text-red-600">${discountedPrice.toFixed(2)}</span>
              {originalPrice !== discountedPrice && (
                <span className="ml-2 text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
              )}
            </div>
            {discountPercentage > 0 && (
              <div className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded inline-block mt-1">
                {discountPercentage}% OFF
              </div>
            )}
            {/* 推荐区域 */}
            {currentProduct.recommendation && (
              <div
                className="mt-2 p-2"
                style={{
                  borderRadius: '18px',
                  opacity: 1,
                  background: 'linear-gradient(180deg, rgba(241, 179, 85, 0.8) 0%, #F4984F 100%)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: 'inset 0px 4px 20px 0px rgba(255, 255, 255, 0.6)',
                  fontSize: '12px',
                  color: 'white',
                  textAlign: 'left',
                }}
              >
                {currentProduct.recommendation}
              </div>
            )}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <a
              href={currentProduct.purchase_link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition ease-in-out duration-200 text-center"
            >
              BUY NOW
            </a>
            <a
              href={currentProduct.inquiry_link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 text-gray-800 py-2 rounded-md hover:bg-gray-200 transition ease-in-out duration-200 text-center"
            >
              INQUIRY
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureProductSection;