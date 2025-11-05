import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Eye, Package } from 'lucide-react';
import { Button } from '../ui/button';
import { useProducts } from '../../hooks/useProducts';
import { toast } from 'sonner';

const ProductList = ({ onEditProduct }) => {
  const { products, deleteProduct, loading } = useProducts();

  const handleDelete = (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      deleteProduct(product.id);
      toast.success(`${product.name} deleted successfully`);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <Package className="h-16 w-16 text-chocolate-primary/30 mx-auto mb-4" />
        <h3 className="font-serif text-xl text-chocolate-primary mb-2">No Products Yet</h3>
        <p className="text-chocolate-primary/70">Add your first chocolate product using the form above.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="font-serif text-xl font-bold text-chocolate-primary">
          Product Inventory ({products.length})
        </h3>
      </div>

      <div className="divide-y divide-gray-200">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Product Image */}
              <div className="w-16 h-16 bg-gradient-to-br from-chocolate-secondary to-chocolate-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-chocolate-primary font-bold text-lg">
                  {product.name.charAt(0)}
                </span>
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="flex-1">
                    <h4 className="font-serif text-lg font-semibold text-chocolate-primary truncate">
                      {product.name}
                    </h4>
                    <p className="text-chocolate-primary/70 text-sm line-clamp-2 mt-1">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="font-bold text-chocolate-accent">
                        BHD. {product.price.toFixed(3)}
                      </span>
                      <span className="text-xs bg-chocolate-secondary px-2 py-1 rounded-full text-chocolate-primary">
                        {product.category}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        product.inStock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditProduct(product)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="hidden sm:inline ml-1">Edit</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(product)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="hidden sm:inline ml-1">Delete</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;