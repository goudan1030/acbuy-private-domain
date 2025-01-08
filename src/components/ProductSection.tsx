import React, { useEffect, useState } from 'react';
import { apiService } from '../services/apiService';
import ProductCard from './ProductCard';
import { Product } from '../types/Product';

interface ProductSectionProps {
  category: string;
  visibleProducts: number;
  loadMoreProducts: () => void;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  category,
  visibleProducts,
  loadMoreProducts,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await apiService.getProductsByCategory(category);
        setProducts(products);
      } catch (err) {
        setError(err.message);
      }
    };
  
    fetchProducts();
  }, [category]);

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  if (products.length === 0) {
    return (
      <section id={category} className="mt-4 mx-2 bg-white shadow-md rounded-lg overflow-hidden">
        <div
          className="flex justify-start items-center p-2"
          style={{
            height: '40px',
            background: 'linear-gradient(180deg, #F97D6B 0%, rgba(249, 125, 107, 0.1) 100%)',
          }}
        >
          <h2
            className="font-bold uppercase text-black"
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: '14px',
            }}
          >
            Best Sellers on {category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>
        </div>
        <div className="bg-white shadow-md p-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg"></div>
                <div className="mt-2 space-y-2">
                  <div className="bg-gray-200 h-4 rounded"></div>
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                  <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={category} className="mt-4 mx-2 bg-white shadow-md rounded-lg overflow-hidden">
      <div
        className="flex justify-start items-center p-2"
        style={{
          height: '40px',
          background: 'linear-gradient(180deg, #F97D6B 0%, rgba(249, 125, 107, 0.1) 100%)',
        }}
      >
        <h2
          className="font-bold uppercase text-black"
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '14px',
          }}
        >
          Best Sellers on {category.charAt(0).toUpperCase() + category.slice(1)}
        </h2>
      </div>
      <div className="bg-white shadow-md p-2">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {products.slice(0, visibleProducts).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              titleStyle={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            />
          ))}
        </div>
        {visibleProducts < products.length && (
          <button
            onClick={loadMoreProducts}
            className="mt-6 block mx-auto flex items-center gap-2 py-2"
            style={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: '12px' }}
          >
            <span>SHOW MORE PRODUCTS</span>
            <img src="/more.svg" alt="More icon" className="w-4 h-4" />
          </button>
        )}
      </div>
    </section>
  );
}

export default ProductSection;