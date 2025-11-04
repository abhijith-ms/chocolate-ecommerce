// WhatsApp utility functions
const WHATSAPP_NUMBER = '919895905758';

/**
 * Generate WhatsApp URL with encoded message
 * @param {string} message - The message to send
 * @returns {string} - WhatsApp URL
 */
export const generateWhatsAppURL = (message) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

/**
 * Format message for single product purchase
 * @param {Object} product - Product object
 * @param {number} quantity - Quantity (default: 1)
 * @returns {string} - Formatted message
 */
export const formatSingleProductMessage = (product, quantity = 1) => {
  const total = product.price * quantity;
  
  return `Hello! I'd like to order:

🍫 *${product.name}*
💰 Price: ₹${product.price} each
📦 Quantity: ${quantity}
💳 Total: ₹${total}

📝 Description: ${product.description}

Please confirm availability and delivery details. Thank you!`;
};

/**
 * Format message for cart checkout
 * @param {Array} cartItems - Array of cart items
 * @param {number} total - Total amount
 * @returns {string} - Formatted message
 */
export const formatCartCheckoutMessage = (cartItems, total) => {
  const itemsList = cartItems.map((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    return `${index + 1}. *${item.product.name}*
   - Quantity: ${item.quantity}
   - Price: ₹${item.product.price} each
   - Subtotal: ₹${itemTotal}`;
  }).join('\n\n');

  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return `Hello! I'd like to order the following chocolates:

${itemsList}

📊 *Order Summary:*
🛍️ Total Items: ${itemCount}
💳 *Grand Total: ₹${total}*

Please confirm availability and provide delivery details. Thank you!`;
};

/**
 * Open WhatsApp with formatted message for single product
 * @param {Object} product - Product object
 * @param {number} quantity - Quantity (default: 1)
 */
export const openWhatsAppForProduct = (product, quantity = 1) => {
  const message = formatSingleProductMessage(product, quantity);
  const url = generateWhatsAppURL(message);
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * Open WhatsApp with formatted message for cart checkout
 * @param {Array} cartItems - Array of cart items
 * @param {number} total - Total amount
 */
export const openWhatsAppForCart = (cartItems, total) => {
  const message = formatCartCheckoutMessage(cartItems, total);
  const url = generateWhatsAppURL(message);
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * Validate WhatsApp number format
 * @param {string} number - Phone number to validate
 * @returns {boolean} - Whether the number is valid
 */
export const validateWhatsAppNumber = (number) => {
  // Basic validation for international format
  const phoneRegex = /^\d{10,15}$/;
  return phoneRegex.test(number.replace(/\D/g, ''));
};

/**
 * Format phone number for display
 * @param {string} number - Phone number
 * @returns {string} - Formatted phone number
 */
export const formatPhoneNumber = (number) => {
  const cleaned = number.replace(/\D/g, '');
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  return number;
};

export default {
  generateWhatsAppURL,
  formatSingleProductMessage,
  formatCartCheckoutMessage,
  openWhatsAppForProduct,
  openWhatsAppForCart,
  validateWhatsAppNumber,
  formatPhoneNumber,
  WHATSAPP_NUMBER
};