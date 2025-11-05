import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../hooks/useCart';

const Cart = () => {
  const { items, getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/products">
                <Button variant="ghost" size="sm" className="text-chocolate-primary hover:text-chocolate-accent">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-6 w-6 text-chocolate-accent" />
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-chocolate-primary">
                Shopping Cart
              </h1>
            </div>
          </div>
          {itemCount > 0 && (
            <p className="text-chocolate-primary/70 text-sm sm:text-base mt-2">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {items.length === 0 ? (
          /* Empty Cart State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12 sm:py-16"
          >
            <div className="w-24 h-24 bg-chocolate-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-chocolate-primary/50" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-chocolate-primary mb-4">
              Your cart is empty
            </h2>
            <p className="text-chocolate-primary/70 text-base sm:text-lg mb-8 max-w-md mx-auto">
              Looks like you haven't added any delicious dishes to your cart yet. 
              Let's fix that!
            </p>
            <Link to="/products">
              <Button 
                size="lg" 
                className="bg-chocolate-accent hover:bg-chocolate-accent/90 text-chocolate-primary font-semibold px-8 py-3"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <AnimatePresence>
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </AnimatePresence>
              </div>

              {/* Continue Shopping Button (Mobile) */}
              <div className="mt-6 lg:hidden">
                <Link to="/products">
                  <Button 
                    variant="outline" 
                    className="w-full border-chocolate-accent text-chocolate-accent hover:bg-chocolate-accent hover:text-chocolate-primary py-3"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA for Mobile (when cart has items) */}
      {items.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-chocolate-primary">
              Total: BHD. {items.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(3)}
            </span>
            <span className="text-sm text-chocolate-primary/70">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <Button 
            className="w-full bg-chocolate-accent hover:bg-chocolate-accent/90 text-chocolate-primary font-semibold py-3"
            onClick={() => {
              // Scroll to top to show cart summary
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            View Checkout Options
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;