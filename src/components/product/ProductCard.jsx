import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { useCart } from '../../hooks/useCart';
import { useWhatsApp } from '../../hooks/useWhatsApp';
import { toast } from 'sonner';

const ProductCard = ({ product, onViewDetails }) => {
  const { addToCart, isInCart } = useCart();
  const { buyNowProduct } = useWhatsApp();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    buyNowProduct(product);
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onClick={handleViewDetails}
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gradient-to-br from-chocolate-secondary to-chocolate-accent/20 overflow-hidden">
        {/* Placeholder for product image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-chocolate-accent rounded-full flex items-center justify-center shadow-lg">
            <span className="text-chocolate-primary font-bold text-xl sm:text-2xl">
              {product.name.charAt(0)}
            </span>
          </div>
        </div>
        
        {/* Stock indicator */}
        {!product.inStock && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Out of Stock
          </div>
        )}

        {/* Quick view button - hidden on mobile, shown on hover for desktop */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          <Button
            size="sm"
            variant="secondary"
            className="rounded-full p-2 bg-white/90 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-6">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm text-chocolate-accent font-medium bg-chocolate-secondary px-2 py-1 rounded-full">
            {product.category}
          </span>
          {isInCart(product.id) && (
            <span className="text-xs text-green-600 font-medium">In Cart</span>
          )}
        </div>

        {/* Product Name */}
        <h3 className="font-serif text-lg sm:text-xl font-semibold text-chocolate-primary mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-chocolate-primary/70 text-sm sm:text-base mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-xl sm:text-2xl text-chocolate-accent">
            ₹{product.price}
          </span>
          <span className="text-xs sm:text-sm text-chocolate-primary/60">
            per piece
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1 bg-chocolate-accent hover:bg-chocolate-accent/90 text-chocolate-primary font-medium py-2 sm:py-3 text-sm sm:text-base"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          
          <Button
            onClick={handleBuyNow}
            disabled={!product.inStock}
            variant="outline"
            className="flex-1 border-chocolate-accent text-chocolate-accent hover:bg-chocolate-accent hover:text-chocolate-primary font-medium py-2 sm:py-3 text-sm sm:text-base"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;