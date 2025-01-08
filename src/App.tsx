import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import FeatureProductSection from './components/FeatureProductSection';
import ProductSection from './components/ProductSection';
import { Product } from './types/Product';
import { apiService } from './services/apiService';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/admin/ProductsPage';
import FeaturedProductList from './pages/admin/FeaturedProductList';
import FeaturedProductForm from './pages/admin/FeaturedProductForm';

// 分类列表（过滤掉Recommended分类）
const CATEGORIES = ['JACKETS', 'T-shirt', 'PEARLS', 'SHOES', 'PANTS'];

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]);
  const [recommendProducts, setRecommendProducts] = useState<Product[]>([]); // 推荐商品状态

  // 初始化visibleProducts状态
  const [visibleProducts, setVisibleProducts] = useState<Record<string, number>>(
    CATEGORIES.reduce((acc, category) => {
      acc[category] = 4; // 每个分类默认显示4个产品
      return acc;
    }, {} as Record<string, number>)
  );

  // 获取全部商品
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('获取商品失败:', error);
      }
    };

    fetchProducts();
  }, []);

  // 获取推荐商品
  useEffect(() => {
    const fetchRecommendProducts = async () => {
      try {
        const data = await apiService.getRecommendProducts();
        setRecommendProducts(data);
      } catch (error) {
        console.error('获取推荐商品失败:', error);
      }
    };

    fetchRecommendProducts();
  }, []);

  // 分类点击处理
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  // 加载更多逻辑
  const loadMoreProducts = (category: string) => {
    setVisibleProducts(prev => ({
      ...prev,
      [category]: prev[category] + 4 // 每次点击加载更多，增加4个产品
    }));
  };

  return (
    <Router>
      <Routes>
        {/* 主页面路由 */}
        <Route
          path="/"
          element={
            <>
              <Header />
              {/* 焦点区域 - 宽度1200px，居中 */}
              <div className="mx-auto" style={{ maxWidth: '1200px', padding: '0 0px' }}>
                <FeatureProductSection /> {/* 直接使用组件，不需要传递props */}
              </div>

              {/* 分类导航 */}
              <div className="w-full bg-white shadow-md sticky top-0 z-10">
                <div className="mx-auto" style={{ maxWidth: '1200px', width: '100%' }}> {/* 添加 maxWidth 和 width */}
                  <nav className="flex justify-center gap-4 px-4 py-4 overflow-x-auto whitespace-nowrap">
                    {CATEGORIES.map((category) => (
                      <a
                        key={category}
                        href={`#${category}`}
                        className={`flex items-center uppercase text-red-600 hover:underline ${activeCategory === category ? 'underline font-bold' : ''}`}
                        onClick={() => handleCategoryClick(category)}
                      >
                        {activeCategory === category && (
                          <img src="/location.svg" alt="Location Icon" className="mr-2" style={{ width: '16px', height: '16px' }} />
                        )}
                        {category}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>

              {/* 分类商品区域 - 宽度1200px，居中 */}
              <div className="mx-auto" style={{ maxWidth: '1200px' }}>
                {CATEGORIES.map((category) => (
                  <ProductSection
                    key={category}
                    category={category}
                    products={products.filter((product) => product.category === category)}
                    visibleProducts={visibleProducts[category]}
                    loadMoreProducts={() => loadMoreProducts(category)}
                  />
                ))}
              </div>

              <div className="py-8"></div>
            </>
          }
        />

        {/* 管理后台路由 */}
        <Route path="/admin" element={<AdminPage />}>
          <Route path="products" element={<ProductsPage />} />
          <Route path="featured-product" element={<FeaturedProductList />} />
          <Route path="featured-product/new" element={<FeaturedProductForm />} />
          {/* 其他管理后台路由 */}
        </Route>

        {/* 登录页面路由 */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;