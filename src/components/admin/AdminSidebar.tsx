import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar: React.FC = () => {
  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-blue-900 to-blue-800 shadow-lg">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white">管理后台</h2>
      </div>
      <nav className="mt-6">
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-sm font-medium text-gray-200 hover:bg-blue-700 hover:text-white transition-colors duration-200 ${
              isActive ? 'bg-blue-700 text-white' : ''
            }`
          }
        >
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
          商品管理
        </NavLink>

        <NavLink
          to="/admin/featured-product"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-sm font-medium text-gray-200 hover:bg-blue-700 hover:text-white transition-colors duration-200 ${
              isActive ? 'bg-blue-700 text-white' : ''
            }`
          }
        >
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          焦点商品配置
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-sm font-medium text-gray-200 hover:bg-blue-700 hover:text-white transition-colors duration-200 ${
              isActive ? 'bg-blue-700 text-white' : ''
            }`
          }
        >
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          系统设置
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;