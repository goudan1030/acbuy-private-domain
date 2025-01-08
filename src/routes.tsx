import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FeaturedProductList from './pages/admin/FeaturedProductList';
import FeaturedProductEdit from './pages/admin/FeaturedProductEdit';
import FeaturedProductForm from './pages/admin/FeaturedProductForm';
import TestPage from './pages/test/TestPage'; // 导入测试页面
import AdminLayout from './layouts/AdminLayout';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'admin/featured-products',
        element: <FeaturedProductList />,
      },
      {
        path: 'admin/featured-products/new',
        element: <FeaturedProductForm />,
      },
      {
        path: 'admin/featured-products/edit/:id',
        element: <FeaturedProductEdit />,
      },
      {
        path: 'test', // 测试页面路由
        element: <TestPage />,
      },
    ],
  },
]);

const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Routes;