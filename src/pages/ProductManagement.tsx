import React, { useEffect, useState } from 'react';
import { apiService } from '../../services/apiService';
import { Product } from '../types/Product';

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    originalPrice: 0,
    currentPrice: 0,
    link: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    await addProduct({ ...newProduct, id: Date.now().toString() });
    const products = await getProducts();
    setProducts(products);
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    const products = await getProducts();
    setProducts(products);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-2 flex-grow"
        />
        <input
          type="number"
          placeholder="Original Price"
          value={newProduct.originalPrice}
          onChange={(e) => setNewProduct({ ...newProduct, originalPrice: parseFloat(e.target.value) })}
          className="border p-2 flex-grow"
        />
        <input
          type="number"
          placeholder="Current Price"
          value={newProduct.currentPrice}
          onChange={(e) => setNewProduct({ ...newProduct, currentPrice: parseFloat(e.target.value) })}
          className="border p-2 flex-grow"
        />
        <input
          type="url"
          placeholder="Link"
          value={newProduct.link}
          onChange={(e) => setNewProduct({ ...newProduct, link: e.target.value })}
          className="border p-2 flex-grow"
        />
        <button onClick={handleAddProduct} className="bg-blue-500 text-white px-4 py-2">
          Add Product
        </button>
      </div>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="flex justify-between p-2 border-b">
            <span>{product.name} - ${product.currentPrice}</span>
            <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;