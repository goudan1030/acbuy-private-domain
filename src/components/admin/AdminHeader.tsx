import React from 'react';

const AdminHeader: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-800">仪表盘</h2>
          </div>
          <div className="flex items-center space-x-6">
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0h6"
                />
              </svg>
            </button>
            <div className="relative">
              <button className="flex items-center focus:outline-none">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://via.placeholder.com/150"
                  alt="User"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">管理员</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;