// Format price to USD currency
export const formatPrice = (price) => {
  if (typeof price !== 'number') {
    price = parseFloat(price) || 0;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

// Format price without currency symbol
export const formatPriceNumber = (price) => {
  if (typeof price !== 'number') {
    price = parseFloat(price) || 0;
  }

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

// Calculate discount percentage
export const calculateDiscount = (originalPrice, currentPrice) => {
  if (!originalPrice || !currentPrice || originalPrice <= currentPrice) {
    return 0;
  }

  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

// Format discount display
export const formatDiscount = (percentage) => {
  if (percentage <= 0) return '';
  return `${percentage}% OFF`;
};
