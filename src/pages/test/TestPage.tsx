import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  // 处理跳转逻辑
  const handleNavigate = (path: string) => {
    try {
      setError(null); // 清空错误信息
      navigate(path); // 执行跳转
    } catch (err) {
      setError('跳转失败，请检查路由配置'); // 捕获并显示错误
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">路由跳转测试页面</h1>
      <div className="space-y-4">
        {/* 显示当前路由路径 */}
        <div className="bg-gray-100 p-2 rounded">
          <p className="text-sm text-gray-700">
            当前路由路径: <span className="font-mono">{location.pathname}</span>
          </p>
        </div>

        {/* 测试按钮 */}
        <button
          onClick={() => handleNavigate('/admin/featured-products/new')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          测试新建商品跳转
        </button>
        <button
          onClick={() => handleNavigate('/admin/featured-products/edit/123')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          测试编辑商品跳转（ID: 123）
        </button>
        <button
          onClick={() => handleNavigate('/admin/featured-products/edit/456')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          测试编辑商品跳转（ID: 456）
        </button>

        {/* 返回上一页 */}
        <button
          onClick={() => navigate(-1)} // 返回上一页
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          返回上一页
        </button>

        {/* 显示错误信息 */}
        {error && (
          <div className="bg-red-100 p-2 rounded">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPage;