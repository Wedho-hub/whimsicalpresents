import Product from '../models/Product.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 12, sort = 'name', category, occasion, search } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (occasion) filter.occasions = occasion;
    if (search) filter.name = { $regex: search, $options: 'i' };

    const sortField = sort.startsWith('-') ? sort.slice(1) : sort;
    const sortOrder = sort.startsWith('-') ? -1 : 1;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 12);

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort({ [sortField]: sortOrder })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    res.json({
      products,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, stock } = req.body;
    const product = new Product({
      name,
      description,
      price,
      category,
      imageUrl,
      stock,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, stock } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.imageUrl = imageUrl || product.imageUrl;
      product.stock = stock || product.stock;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
