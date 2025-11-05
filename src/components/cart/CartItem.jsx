import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useCart } from '../../hooks/useCart';
import { toast } from 'sonner';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
    toast.success(`${item.product.name} removed from cart`);
  };

  const itemTotal = item.product.price * item.quantity;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="w-full sm:w-24 h-24 bg-gradient-to-br from-chocolate-secondary to-chocolate-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <div className="w-12 h-12 bg-chocolate-accent rounded-full flex items-center justify-center">
            <span className="text-chocolate-primary font-bold text-lg">
              {item.product.name.charAt(0)}
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
            <div className="flex-grow">
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-chocolate-primary mb-1">
                {item.product.name}
              </h3>
              <p className="text-chocolate-primary/70 text-sm mb-2 line-clamp-2">
                {item.product.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-chocolate-primary/60">
                <span className="bg-chocolate-secondary px-2 py-1 rounded-full text-xs">
                  {item.product.category}
                </span>
                <span>BHD. {item.product.price.toFixed(3)} each</span>
              </div>
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="font-bold text-xl sm:text-2xl text-chocolate-accent">
                BHD. {itemTotal.toFixed(3)}
              </div>
              {item.quantity > 1 && (
                <div className="text-sm text-chocolate-primary/60">
                  {item.quantity} × BHD. {item.product.price.toFixed(3)}
                </div>
              )}
            </div>
          </div>

          {/* Quantity Controls and Remove Button */}
          <div className="flex items-center justify-between mt-4">
            {/* Quantity Controls */}
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-chocolate-primary">Qty:</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="p-1 h-8 w-8 border-chocolate-accent text-chocolate-accent hover:bg-chocolate-accent hover:text-chocolate-primary"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                
                <span className="font-semibold text-lg min-w-[2rem] text-center">
                  {item.quantity}
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={item.quantity >= 99}
                  className="p-1 h-8 w-8 border-chocolate-accent text-chocolate-accent hover:bg-chocolate-accent hover:text-chocolate-primary"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Remove Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
            >
              <Trash2 className="h-4 w-4" />
              <span className="ml-1 hidden sm:inline">Remove</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;