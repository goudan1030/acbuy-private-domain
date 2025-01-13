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
import CategoryNav from './components/CategoryNav';

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
              {/* 添加响应式背景色容器 */}
              <div className="w-full lg:bg-[#FFE5C5]">
                <div className="mx-auto" style={{ maxWidth: '1200px' }}>
                  {/* 焦点区域 */}
                  <div style={{ padding: '0 0px' }}>
                    <FeatureProductSection />
                  </div>

                  {/* 分类导航 */}
                  <CategoryNav 
                    categories={CATEGORIES} 
                    activeCategory={activeCategory}
                    onCategoryClick={handleCategoryClick} 
                  />

                  {/* 分类商品区域 */}
                  <div>
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

                  {/* 底部间距 */}
                  <div className="pb-32"></div>
                </div>
              </div>
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