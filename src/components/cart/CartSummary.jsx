import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import { Button } from '../ui/button';
import { useCart } from '../../hooks/useCart';
import { useWhatsApp } from '../../hooks/useWhatsApp';

const CartSummary = () => {
  const { items, getCartTotal, getCartItemCount, clearCart } = useCart();
  const { checkoutCart } = useWhatsApp();

  const total = getCartTotal();
  const itemCount = getCartItemCount();

  const handleCheckout = () => {
    if (items.length === 0) return;
    checkoutCart(items, total);
  };

  const handleClearCart = () => {
    clearCart();
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg border border-gray-100 p-4 sm:p-6 sticky top-4"
    >
      <h3 className="font-serif text-xl sm:text-2xl font-bold text-chocolate-primary mb-4">
        Order Summary
      </h3>

      {/* Order Details */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center text-chocolate-primary">
          <span>Items ({itemCount})</span>
          <span>₹{total}</span>
        </div>
        
        <div className="flex justify-between items-center text-chocolate-primary">
          <span>Delivery</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
        
        <hr className="border-gray-200" />
        
        <div className="flex justify-between items-center text-lg font-bold text-chocolate-primary">
          <span>Total</span>
          <span className="text-chocolate-accent">₹{total}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleCheckout}
          className="w-full bg-chocolate-accent hover:bg-chocolate-accent/90 text-chocolate-primary font-semibold py-3 text-base sm:text-lg"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Checkout via WhatsApp
        </Button>
        
        <Button
          variant="outline"
          onClick={handleClearCart}
          className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 py-2"
        >
          Clear Cart
        </Button>
      </div>

      {/* Delivery Info */}
      <div className="mt-6 p-4 bg-chocolate-secondary/30 rounded-lg">
        <div className="flex items-start space-x-3">
          <ShoppingBag className="h-5 w-5 text-chocolate-accent mt-0.5" />
          <div>
            <h4 className="font-medium text-chocolate-primary text-sm">
              Free Delivery
            </h4>
            <p className="text-chocolate-primary/70 text-xs mt-1">
              We'll coordinate delivery details via WhatsApp after your order
            </p>
          </div>
        </div>
      </div>

      {/* WhatsApp Info */}
      <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
        <p className="text-green-800 text-xs text-center">
          <MessageCircle className="h-4 w-4 inline mr-1" />
          Your order will be sent to our WhatsApp for quick processing
        </p>
      </div>
    </motion.div>
  );
};

export default CartSummary;