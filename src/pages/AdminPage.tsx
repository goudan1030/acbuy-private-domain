import React from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import { Outlet } from 'react-router-dom';

const AdminPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="ml-64">
        <AdminHeader />
        <main className="p-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;