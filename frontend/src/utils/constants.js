// API URLs
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Payment methods
export const PAYMENT_METHODS = {
  ECOCASH: 'ecocash',
  CASH_ON_DELIVERY: 'cash_on_delivery',
};

// Order statuses
export const ORDER_STATUSES = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// Payment statuses
export const PAYMENT_STATUSES = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

// User roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

// Product categories
export const PRODUCT_CATEGORIES = [
  'Gifts for Him',
  'Gifts for Her',
  'Anniversary Gifts',
  'Birthday Gifts',
  'Wedding Gifts',
  'Valentine\'s Day',
  'Christmas Gifts',
  'Easter Gifts',
  'Mother\'s Day',
  'Father\'s Day',
  'Baby Gifts',
  'Home & Garden',
  'Books & Stationery',
  'Jewelry',
  'Accessories',
  'Electronics',
  'Sports & Outdoors',
  'Health & Beauty',
  'Food & Beverages',
  'Other',
];

// Zimbabwe provinces for shipping
export const ZIMBABWE_PROVINCES = [
  'Harare',
  'Bulawayo',
  'Manicaland',
  'Mashonaland Central',
  'Mashonaland East',
  'Mashonaland West',
  'Masvingo',
  'Matabeleland North',
  'Matabeleland South',
  'Midlands',
];

// Currency
export const CURRENCY = 'USD';

// Default pagination
export const ITEMS_PER_PAGE = 12;

// Toast messages
export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGIN_ERROR: 'Login failed. Please check your credentials.',
  REGISTER_SUCCESS: 'Registration successful!',
  REGISTER_ERROR: 'Registration failed. Please try again.',
  CART_ADD_SUCCESS: 'Item added to cart!',
  CART_REMOVE_SUCCESS: 'Item removed from cart!',
  ORDER_PLACE_SUCCESS: 'Order placed successfully!',
  ORDER_PLACE_ERROR: 'Failed to place order. Please try again.',
  PAYMENT_SUCCESS: 'Payment processed successfully!',
  PAYMENT_ERROR: 'Payment failed. Please try again.',
};
