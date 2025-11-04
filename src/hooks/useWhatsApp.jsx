import { useCallback } from 'react';
import { 
  openWhatsAppForProduct, 
  openWhatsAppForCart, 
  generateWhatsAppURL,
  formatSingleProductMessage,
  formatCartCheckoutMessage
} from '../utils/whatsapp';

export const useWhatsApp = () => {
  const buyNowProduct = useCallback((product, quantity = 1) => {
    openWhatsAppForProduct(product, quantity);
  }, []);

  const checkoutCart = useCallback((cartItems, total) => {
    openWhatsAppForCart(cartItems, total);
  }, []);

  const getProductMessage = useCallback((product, quantity = 1) => {
    return formatSingleProductMessage(product, quantity);
  }, []);

  const getCartMessage = useCallback((cartItems, total) => {
    return formatCartCheckoutMessage(cartItems, total);
  }, []);

  const openWhatsAppWithMessage = useCallback((message) => {
    const url = generateWhatsAppURL(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  return {
    buyNowProduct,
    checkoutCart,
    getProductMessage,
    getCartMessage,
    openWhatsAppWithMessage,
    generateWhatsAppURL
  };
};