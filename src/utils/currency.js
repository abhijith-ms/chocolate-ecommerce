/**
 * Format price in Bahrain Dinar
 * @param {number} amount - Amount to format
 * @param {boolean} showSymbol - Whether to show currency symbol (default: true)
 * @returns {string} - Formatted price
 */
export const formatPrice = (amount, showSymbol = true) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return showSymbol ? 'BD 0' : '0';
  }

  const formatted = amount.toFixed(2);
  return showSymbol ? `BD ${formatted}` : formatted;
};

/**
 * Format price for display with proper spacing
 * @param {number} amount - Amount to format
 * @returns {string} - Formatted price with proper spacing
 */
export const formatDisplayPrice = (amount) => {
  return formatPrice(amount, true);
};

/**
 * Calculate discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} discountedPrice - Discounted price
 * @returns {number} - Discount percentage
 */
export const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
  if (originalPrice <= 0 || discountedPrice < 0) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

/**
 * Calculate total for cart items
 * @param {Array} items - Array of cart items
 * @returns {number} - Total amount
 */
export const calculateCartTotal = (items) => {
  return items.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
};

/**
 * Calculate item subtotal
 * @param {number} price - Item price
 * @param {number} quantity - Item quantity
 * @returns {number} - Subtotal
 */
export const calculateItemSubtotal = (price, quantity) => {
  return price * quantity;
};

/**
 * Validate price input
 * @param {string|number} price - Price to validate
 * @returns {boolean} - Whether price is valid
 */
export const validatePrice = (price) => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return !isNaN(numPrice) && numPrice >= 0;
};

/**
 * Parse price from string input
 * @param {string} priceString - Price string to parse
 * @returns {number} - Parsed price
 */
export const parsePrice = (priceString) => {
  const cleaned = priceString.replace(/[^\d.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

export default {
  formatPrice,
  formatDisplayPrice,
  calculateDiscountPercentage,
  calculateCartTotal,
  calculateItemSubtotal,
  validatePrice,
  parsePrice
};