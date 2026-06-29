import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ['her', 'him', 'general'],
  },
  occasions: {
    type: [String],
    default: [],
  },
  imageUrl: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  sku: {
    type: String,
  },
  originalPrice: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
