// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation (Zimbabwe format)
export const isValidPhoneNumber = (phone) => {
  // Zimbabwe phone number formats: +263XXXXXXXXX, 07XXXXXXXX, etc.
  const phoneRegex = /^(\+263|0)[7-8][0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Password validation
export const isValidPassword = (password) => {
  // At least 6 characters, contains letters and numbers
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
  return passwordRegex.test(password);
};

// Name validation
export const isValidName = (name) => {
  return name.trim().length >= 2 && name.trim().length <= 50;
};

// Address validation
export const isValidAddress = (address) => {
  return address.trim().length >= 10 && address.trim().length <= 200;
};

// Price validation
export const isValidPrice = (price) => {
  const numPrice = parseFloat(price);
  return !isNaN(numPrice) && numPrice >= 0 && numPrice <= 10000;
};

// Quantity validation
export const isValidQuantity = (quantity, maxStock = 100) => {
  const numQuantity = parseInt(quantity);
  return !isNaN(numQuantity) && numQuantity >= 1 && numQuantity <= maxStock;
};

// Product name validation
export const isValidProductName = (name) => {
  return name.trim().length >= 1 && name.trim().length <= 100;
};

// Product description validation
export const isValidDescription = (description) => {
  return description.trim().length >= 10 && description.trim().length <= 1000;
};

// Category validation
export const isValidCategory = (category) => {
  const validCategories = [
    'Gifts for Him', 'Gifts for Her', 'Anniversary Gifts', 'Birthday Gifts',
    'Wedding Gifts', 'Valentine\'s Day', 'Christmas Gifts', 'Easter Gifts',
    'Mother\'s Day', 'Father\'s Day', 'Baby Gifts', 'Home & Garden',
    'Books & Stationery', 'Jewelry', 'Accessories', 'Electronics',
    'Sports & Outdoors', 'Health & Beauty', 'Food & Beverages', 'Other'
  ];
  return validCategories.includes(category);
};

// Stock validation
export const isValidStock = (stock) => {
  const numStock = parseInt(stock);
  return !isNaN(numStock) && numStock >= 0 && numStock <= 10000;
};

// Form validation helpers
export const validateField = (value, validator, fieldName) => {
  if (!validator(value)) {
    return `${fieldName} is invalid`;
  }
  return null;
};

export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} is required`;
  }
  return null;
};

// Complete form validation
export const validateUserRegistration = (formData) => {
  const errors = {};

  const nameError = validateRequired(formData.name, 'Name') ||
                   validateField(formData.name, isValidName, 'Name');
  if (nameError) errors.name = nameError;

  const emailError = validateRequired(formData.email, 'Email') ||
                    validateField(formData.email, isValidEmail, 'Email');
  if (emailError) errors.email = emailError;

  const passwordError = validateRequired(formData.password, 'Password') ||
                       validateField(formData.password, isValidPassword, 'Password');
  if (passwordError) errors.password = passwordError;

  return errors;
};

export const validateUserLogin = (formData) => {
  const errors = {};

  const emailError = validateRequired(formData.email, 'Email') ||
                    validateField(formData.email, isValidEmail, 'Email');
  if (emailError) errors.email = emailError;

  const passwordError = validateRequired(formData.password, 'Password');
  if (passwordError) errors.password = passwordError;

  return errors;
};

export const validateProductForm = (formData) => {
  const errors = {};

  const nameError = validateRequired(formData.name, 'Product name') ||
                   validateField(formData.name, isValidProductName, 'Product name');
  if (nameError) errors.name = nameError;

  const descriptionError = validateRequired(formData.description, 'Description') ||
                          validateField(formData.description, isValidDescription, 'Description');
  if (descriptionError) errors.description = descriptionError;

  const priceError = validateRequired(formData.price, 'Price') ||
                    validateField(formData.price, isValidPrice, 'Price');
  if (priceError) errors.price = priceError;

  const categoryError = validateRequired(formData.category, 'Category') ||
                       validateField(formData.category, isValidCategory, 'Category');
  if (categoryError) errors.category = categoryError;

  const stockError = validateField(formData.stock, isValidStock, 'Stock');
  if (stockError) errors.stock = stockError;

  return errors;
};

export const validateOrderForm = (formData) => {
  const errors = {};

  const addressError = validateRequired(formData.shippingAddress, 'Shipping address') ||
                      validateField(formData.shippingAddress, isValidAddress, 'Shipping address');
  if (addressError) errors.shippingAddress = addressError;

  return errors;
};
