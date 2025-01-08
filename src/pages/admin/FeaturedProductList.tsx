import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const FeaturedProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        setError(error instanceof Error ? error.message : '未知错误');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('featured_products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      setError(error instanceof Error ? error.message : '未知错误');
    }
  };

  const handleAdd = () => {
    navigate('/admin/featured-products/new');
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/featured-products/edit/${id}`);
  };

  if (loading) return <div>加载中...</div>;
  if (error) return <div className="text-red-500">加载失败: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">焦点商品列表</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          新增焦点商品
        </button>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <img
                  src={supabase.storage.from('featured-products').getPublicUrl(product.image_url).data.publicUrl}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-md"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.recommend}</p>
                <div className="mt-2 flex items-center space-x-4">
                  <span className="text-gray-500 line-through">¥{product.original_price}</span>
                  <span className="text-red-500 font-bold">¥{product.current_price}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  编辑
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  删除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProductList;