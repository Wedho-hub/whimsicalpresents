import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import User from './models/User.js';

dotenv.config();

const img = (keywords, lock) => `https://loremflickr.com/700/700/${keywords}?lock=${lock}`;

const products = [
  // ── For Her ──
  {
    name: 'Rose Gold Bouquet',
    description: 'A hand-tied bouquet of fresh roses finished with champagne-gold ribbon, delivered same-day in Harare.',
    price: 38,
    originalPrice: 45,
    category: 'her',
    occasions: ['valentines', 'anniversary', 'birthday'],
    imageUrl: img('roses,bouquet', 1),
    images: [img('roses,bouquet', 1), img('flowers,pink', 2)],
    stock: 24,
    rating: 4.8,
    numReviews: 132,
    sku: 'WP-HER-001',
  },
  {
    name: 'Pearl Elegance Necklace',
    description: 'A timeless freshwater pearl necklace set in sterling silver, presented in a velvet gift box.',
    price: 64,
    category: 'her',
    occasions: ['anniversary', 'wedding', 'birthday'],
    imageUrl: img('pearl,necklace', 3),
    images: [img('pearl,necklace', 3), img('jewelry,elegant', 4)],
    stock: 15,
    rating: 4.9,
    numReviews: 87,
    sku: 'WP-HER-002',
  },
  {
    name: 'Luxury Perfume Gift Set',
    description: 'A curated trio of floral and oud fragrances in travel-friendly bottles, beautifully boxed.',
    price: 52,
    category: 'her',
    occasions: ['valentines', 'christmas'],
    imageUrl: img('perfume,bottle', 5),
    images: [img('perfume,bottle', 5)],
    stock: 30,
    rating: 4.6,
    numReviews: 64,
    sku: 'WP-HER-003',
  },
  {
    name: 'Rose Petal Spa Hamper',
    description: 'Bath salts, scented candles and a plush robe for a relaxing at-home spa evening.',
    price: 47,
    category: 'her',
    occasions: ['birthday', 'anniversary'],
    imageUrl: img('spa,candles', 6),
    images: [img('spa,candles', 6)],
    stock: 18,
    rating: 4.7,
    numReviews: 41,
    sku: 'WP-HER-004',
  },
  {
    name: 'Silk Floral Scarf',
    description: 'A lightweight, hand-printed silk scarf in a romantic floral pattern, made to elevate any outfit.',
    price: 29,
    category: 'her',
    occasions: ['birthday', 'graduation'],
    imageUrl: img('silk,scarf', 7),
    images: [img('silk,scarf', 7)],
    stock: 22,
    rating: 4.5,
    numReviews: 36,
    sku: 'WP-HER-005',
  },

  // ── For Him ──
  {
    name: 'Heritage Leather Wallet',
    description: 'Full-grain leather bifold wallet, hand-stitched and embossed — built to age beautifully.',
    price: 34,
    category: 'him',
    occasions: ['birthday', 'graduation'],
    imageUrl: img('leather,wallet', 8),
    images: [img('leather,wallet', 8)],
    stock: 27,
    rating: 4.7,
    numReviews: 58,
    sku: 'WP-HIM-001',
  },
  {
    name: 'Classic Chronograph Watch',
    description: 'A stainless-steel chronograph watch with a genuine leather strap — sharp for any occasion.',
    price: 89,
    originalPrice: 110,
    category: 'him',
    occasions: ['anniversary', 'graduation', 'christmas'],
    imageUrl: img('watch,mens', 9),
    images: [img('watch,mens', 9), img('wristwatch', 10)],
    stock: 12,
    rating: 4.9,
    numReviews: 73,
    sku: 'WP-HIM-002',
  },
  {
    name: 'Premium Whiskey Gift Set',
    description: 'A handsome decanter and tumbler set, perfect for the whiskey connoisseur in your life.',
    price: 56,
    category: 'him',
    occasions: ['birthday', 'christmas'],
    imageUrl: img('whiskey,glass', 11),
    images: [img('whiskey,glass', 11)],
    stock: 20,
    rating: 4.6,
    numReviews: 49,
    sku: 'WP-HIM-003',
  },
  {
    name: "Gentleman's Grooming Kit",
    description: 'A complete grooming set with beard oil, comb and trimmer scissors in a leather roll case.',
    price: 41,
    category: 'him',
    occasions: ['birthday', 'graduation'],
    imageUrl: img('grooming,shaving', 12),
    images: [img('grooming,shaving', 12)],
    stock: 25,
    rating: 4.4,
    numReviews: 33,
    sku: 'WP-HIM-004',
  },
  {
    name: 'Portable Bluetooth Speaker',
    description: 'Compact, rugged speaker with rich bass and 12-hour battery life — gift for the music lover.',
    price: 45,
    category: 'him',
    occasions: ['birthday', 'christmas', 'graduation'],
    imageUrl: img('speaker,gadget', 13),
    images: [img('speaker,gadget', 13)],
    stock: 19,
    rating: 4.5,
    numReviews: 91,
    sku: 'WP-HIM-005',
  },

  // ── General ──
  {
    name: 'Gourmet Chocolate Hamper',
    description: 'A generous selection of artisan chocolates, truffles and biscuits in a keepsake hamper box.',
    price: 36,
    category: 'general',
    occasions: ['christmas', 'birthday', 'valentines'],
    imageUrl: img('chocolate,hamper', 14),
    images: [img('chocolate,hamper', 14)],
    stock: 35,
    rating: 4.8,
    numReviews: 110,
    sku: 'WP-GEN-001',
  },
  {
    name: 'Scented Candle Trio',
    description: 'Three hand-poured soy candles in vanilla, sandalwood and rose scents.',
    price: 24,
    category: 'general',
    occasions: ['christmas', 'wedding'],
    imageUrl: img('candles,scented', 15),
    images: [img('candles,scented', 15)],
    stock: 40,
    rating: 4.6,
    numReviews: 67,
    sku: 'WP-GEN-002',
  },
  {
    name: 'Keepsake Photo Frame',
    description: 'A hand-finished wooden photo frame, engraved with a personal message of your choice.',
    price: 19,
    category: 'general',
    occasions: ['wedding', 'anniversary', 'graduation'],
    imageUrl: img('photo,frame', 16),
    images: [img('photo,frame', 16)],
    stock: 50,
    rating: 4.3,
    numReviews: 28,
    sku: 'WP-GEN-003',
  },
  {
    name: 'Wine & Cheese Celebration Hamper',
    description: 'A South African red wine paired with cheese, crackers and preserves for any celebration.',
    price: 58,
    category: 'general',
    occasions: ['anniversary', 'wedding', 'christmas'],
    imageUrl: img('wine,cheese', 17),
    images: [img('wine,cheese', 17)],
    stock: 16,
    rating: 4.7,
    numReviews: 52,
    sku: 'WP-GEN-004',
  },
  {
    name: 'Teddy Bear & Greeting Card',
    description: 'A soft plush teddy bear paired with a handwritten greeting card for a heartfelt surprise.',
    price: 16,
    category: 'general',
    occasions: ['birthday', 'valentines'],
    imageUrl: img('teddybear', 18),
    images: [img('teddybear', 18)],
    stock: 60,
    rating: 4.5,
    numReviews: 44,
    sku: 'WP-GEN-005',
  },
  {
    name: 'Zimbabwean Handmade Craft Basket',
    description: 'A woven basket hamper filled with local snacks, tea and a handcrafted wooden ornament.',
    price: 42,
    category: 'general',
    occasions: ['christmas', 'birthday'],
    imageUrl: img('basket,handmade', 19),
    images: [img('basket,handmade', 19)],
    stock: 21,
    rating: 4.8,
    numReviews: 39,
    sku: 'WP-GEN-006',
  },
];

const run = async () => {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not set in backend/.env');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB for seeding.');

  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products.`);

  const adminEmail = 'admin@whimsicalpresents.co.zw';
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      name: 'Whimsical Admin',
      email: adminEmail,
      password: 'Admin@123',
      role: 'admin',
    });
    console.log(`Seeded admin user: ${adminEmail} / Admin@123`);
  } else {
    console.log('Admin user already exists, skipping.');
  }

  await mongoose.disconnect();
  console.log('Done.');
  process.exit(0);
};

run().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
