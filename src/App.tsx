import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import JoinAcbuy from './components/JoinAcbuy';
import NoPriceDifference from './components/NoPriceDifference';
import QualityControl from './components/QualityControl';
import GlobalTransportation from './components/GlobalTransportation';
import JoinDiscord from './components/JoinDiscord';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/admin/ProductsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* 主页面路由 */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <div className="w-full lg:bg-[#FFE5C5] lg:bg-join-acbuy-desktop">
                <div className="mx-auto" style={{ maxWidth: '1200px' }}>
                  <div className="relative overflow-hidden lg:pt-[200px]">
                    <JoinAcbuy />
                    <NoPriceDifference />
                    <QualityControl />
                    <GlobalTransportation />
                    <JoinDiscord />
                    <div className="pb-32"></div>
                  </div>
                </div>
              </div>
            </>
          }
        />

        {/* 管理后台路由 */}
        <Route path="/admin" element={<AdminPage />}>
          <Route path="products" element={<ProductsPage />} />
        </Route>

        {/* 登录页面路由 */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;