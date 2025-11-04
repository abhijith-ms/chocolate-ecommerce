import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Save, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useProducts } from '../../hooks/useProducts';
import { toast } from 'sonner';

const AdminForm = ({ product, onCancel, mode = 'create' }) => {
  const { addProduct, updateProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
    inStock: true
  });

  useEffect(() => {
    if (product && mode === 'edit') {
      setFormData({
        name: product.name || '',
        price: product.price?.toString() || '',
        description: product.description || '',
        category: product.category || '',
        image: product.image || '',
        inStock: product.inStock ?? true
      });
    }
  }, [product, mode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error('Product name is required');
      return;
    }
    
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      toast.error('Please enter a valid price');
      return;
    }
    
    if (!formData.description.trim()) {
      toast.error('Product description is required');
      return;
    }
    
    if (!formData.category.trim()) {
      toast.error('Product category is required');
      return;
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      image: formData.image || `/images/${formData.name.toLowerCase().replace(/\s+/g, '-')}.jpg`
    };

    try {
      if (mode === 'edit' && product) {
        updateProduct(product.id, productData);
        toast.success('Product updated successfully!');
      } else {
        addProduct(productData);
        toast.success('Product added successfully!');
      }
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        description: '',
        category: '',
        image: '',
        inStock: true
      });
      
      if (onCancel) onCancel();
    } catch (error) {
      toast.error('Failed to save product. Please try again.');
    }
  };

  const categories = ['Truffles', 'Pralines', 'Bars', 'Specialty', 'Gift Sets', 'Seasonal'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-lg p-6 mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-2xl font-bold text-chocolate-primary">
          {mode === 'edit' ? 'Edit Product' : 'Add New Product'}
        </h3>
        {mode === 'edit' && onCancel && (
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <Label htmlFor="name" className="text-chocolate-primary font-medium">
              Product Name *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Belgian Dark Chocolate Truffle"
              className="mt-1"
              required
            />
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price" className="text-chocolate-primary font-medium">
              Price (₹) *
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., 650"
              className="mt-1"
              required
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category" className="text-chocolate-primary font-medium">
              Category *
            </Label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-chocolate-accent focus:border-transparent"
              required
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Image URL */}
          <div>
            <Label htmlFor="image" className="text-chocolate-primary font-medium">
              Image URL
            </Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="e.g., /images/truffle.jpg (optional)"
              className="mt-1"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="text-chocolate-primary font-medium">
            Description *
          </Label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the chocolate's flavor, texture, and special qualities..."
            rows={4}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-chocolate-accent focus:border-transparent resize-none"
            required
          />
        </div>

        {/* In Stock */}
        <div className="flex items-center space-x-2">
          <input
            id="inStock"
            name="inStock"
            type="checkbox"
            checked={formData.inStock}
            onChange={handleChange}
            className="w-4 h-4 text-chocolate-accent border-gray-300 rounded focus:ring-chocolate-accent"
          />
          <Label htmlFor="inStock" className="text-chocolate-primary font-medium">
            In Stock
          </Label>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            type="submit"
            className="flex-1 bg-chocolate-accent hover:bg-chocolate-accent/90 text-chocolate-primary font-semibold py-3"
          >
            {mode === 'edit' ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Update Product
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </>
            )}
          </Button>
          
          {mode === 'edit' && onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50 py-3"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default AdminForm;