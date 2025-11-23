import Product from '../models/Product.js';

// Get all products with optional filtering
const getAllProducts = async (filters = {}) => {
  try {
    const query = {};
    if (filters.category) query.category = filters.category;
    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = filters.minPrice;
      if (filters.maxPrice) query.price.$lte = filters.maxPrice;
    }
    return await Product.find(query).sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
};

// Get product by ID
const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) throw new Error('Product not found');
    return product;
  } catch (error) {
    throw new Error(`Error fetching product: ${error.message}`);
  }
};

// Create new product
const createProduct = async (productData) => {
  try {
    const product = new Product(productData);
    return await product.save();
  } catch (error) {
    throw new Error(`Error creating product: ${error.message}`);
  }
};

// Update product
const updateProduct = async (id, updateData) => {
  try {
    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!product) throw new Error('Product not found');
    return product;
  } catch (error) {
    throw new Error(`Error updating product: ${error.message}`);
  }
};

// Delete product
const deleteProduct = async (id) => {
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new Error('Product not found');
    return product;
  } catch (error) {
    throw new Error(`Error deleting product: ${error.message}`);
  }
};

// Get products by category
const getProductsByCategory = async (category) => {
  try {
    return await Product.find({ category }).sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Error fetching products by category: ${error.message}`);
  }
};

// Search products
const searchProducts = async (searchTerm) => {
  try {
    const regex = new RegExp(searchTerm, 'i');
    return await Product.find({
      $or: [
        { name: regex },
        { description: regex },
        { category: regex },
      ],
    }).sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Error searching products: ${error.message}`);
  }
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts,
};
