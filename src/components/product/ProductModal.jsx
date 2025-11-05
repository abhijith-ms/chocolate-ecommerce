import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from '../ui/button';
import { useCart } from '../../hooks/useCart';
import { useWhatsApp } from '../../hooks/useWhatsApp';
import { toast } from 'sonner';

const ProductModal = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isInCart } = useCart();
  const { buyNowProduct } = useWhatsApp();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} x ${product.name} added to cart!`);
    onClose();
  };

  const handleBuyNow = () => {
    // For buy now, we'll use quantity 1 for simplicity
    buyNowProduct(product);
  };

  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 99));
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative p-4 sm:p-6 border-b border-gray-100">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 p-2"
                  onClick={onClose}
                >
                  <X className="h-5 w-5" />
                </Button>
                <div className="pr-10">
                  <span className="text-sm text-chocolate-accent font-medium bg-chocolate-secondary px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Image */}
              <div className="aspect-square bg-gradient-to-br from-chocolate-secondary to-chocolate-accent/20 flex items-center justify-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-chocolate-accent rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-chocolate-primary font-bold text-3xl sm:text-4xl">
                    {product.name.charAt(0)}
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-4 sm:p-6">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-chocolate-primary mb-3">
                  {product.name}
                </h2>

                <p className="text-chocolate-primary/80 text-base sm:text-lg mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center justify-between mb-6 p-4 bg-chocolate-secondary/50 rounded-lg">
                  <div>
                    <span className="text-sm text-chocolate-primary/70">Price per piece</span>
                    <div className="font-bold text-2xl sm:text-3xl text-chocolate-accent">
                      BHD. {product.price.toFixed(3)}
                    </div>
                  </div>
                  {isInCart(product.id) && (
                    <span className="text-sm text-green-600 font-medium bg-green-100 px-3 py-1 rounded-full">
                      Already in Cart
                    </span>
                  )}
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-chocolate-primary mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="p-2 border-chocolate-accent text-chocolate-accent hover:bg-chocolate-accent hover:text-chocolate-primary"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <span className="font-semibold text-lg min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={incrementQuantity}
                      disabled={quantity >= 99}
                      className="p-2 border-chocolate-accent text-chocolate-accent hover:bg-chocolate-accent hover:text-chocolate-primary"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {quantity > 1 && (
                    <p className="text-sm text-chocolate-primary/70 mt-2">
                      Total: BHD. {(product.price * quantity).toFixed(3)}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 bg-chocolate-accent hover:bg-chocolate-accent/90 text-chocolate-primary font-medium py-3 text-base"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add {quantity} to Cart
                  </Button>
                  
                  <Button
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                    variant="outline"
                    className="flex-1 border-chocolate-accent text-chocolate-accent hover:bg-chocolate-accent hover:text-chocolate-primary font-medium py-3 text-base"
                  >
                    Buy Now
                  </Button>
                </div>

                {!product.inStock && (
                  <p className="text-center text-red-600 text-sm mt-4 font-medium">
                    This item is currently out of stock
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;