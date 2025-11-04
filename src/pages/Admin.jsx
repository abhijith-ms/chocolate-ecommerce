import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Package, BarChart3, Users } from 'lucide-react';
import AdminForm from '../components/admin/AdminForm';
import ProductList from '../components/admin/ProductList';
import { useProducts } from '../hooks/useProducts';

const Admin = () => {
  const { products } = useProducts();
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setShowForm(false);
  };

  const stats = [
    {
      icon: Package,
      label: 'Total Products',
      value: products.length,
      color: 'text-blue-600'
    },
    {
      icon: Package,
      label: 'In Stock',
      value: products.filter(p => p.inStock).length,
      color: 'text-green-600'
    },
    {
      icon: Package,
      label: 'Out of Stock',
      value: products.filter(p => !p.inStock).length,
      color: 'text-red-600'
    },
    {
      icon: BarChart3,
      label: 'Categories',
      value: new Set(products.map(p => p.category)).size,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center space-x-3 mb-6">
            <Settings className="h-8 w-8 text-chocolate-accent" />
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-primary">
              Admin Panel
            </h1>
          </div>
          <p className="text-chocolate-primary/80 text-lg">
            Manage your chocolate product catalog
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-4 sm:p-6"
            >
              <div className="flex items-center">
                <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                  <stat.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-xl sm:text-2xl font-bold text-chocolate-primary">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add/Edit Product Form */}
        {(showForm || !editingProduct) && (
          <AdminForm
            product={editingProduct}
            onCancel={editingProduct ? handleCancelEdit : null}
            mode={editingProduct ? 'edit' : 'create'}
          />
        )}

        {/* Toggle Form Button (when not editing) */}
        {!showForm && !editingProduct && (
          <div className="mb-8">
            <button
              onClick={() => setShowForm(true)}
              className="bg-chocolate-accent hover:bg-chocolate-accent/90 text-chocolate-primary font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <Package className="h-4 w-4 inline mr-2" />
              Add New Product
            </button>
          </div>
        )}

        {/* Product List */}
        <ProductList onEditProduct={handleEditProduct} />

        {/* Admin Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 bg-chocolate-secondary/30 rounded-lg p-6"
        >
          <h3 className="font-serif text-lg font-bold text-chocolate-primary mb-3">
            Admin Instructions
          </h3>
          <div className="space-y-2 text-chocolate-primary/80 text-sm">
            <p>• <strong>Add Products:</strong> Use the form above to add new chocolate products to your catalog</p>
            <p>• <strong>Edit Products:</strong> Click the "Edit" button on any product to modify its details</p>
            <p>• <strong>Delete Products:</strong> Click the "Delete" button to remove products (with confirmation)</p>
            <p>• <strong>Stock Management:</strong> Toggle the "In Stock" checkbox to manage availability</p>
            <p>• <strong>Categories:</strong> Use consistent category names for better organization</p>
            <p>• <strong>Images:</strong> Product images are currently placeholder-based (first letter of product name)</p>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-6 bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="font-serif text-lg font-bold text-chocolate-primary mb-4">
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => window.open('/products', '_blank')}
              className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
            >
              View Live Store
            </button>
            <button
              onClick={() => window.open('https://wa.me/919895905758', '_blank')}
              className="bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
            >
              WhatsApp Support
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
            >
              Refresh Data
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;