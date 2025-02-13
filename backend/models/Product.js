const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  color: { type: [String] }, // Array of colors
  size: { type: [String] }, // Array of sizes (e.g., 'S', 'M', 'L', 'XL')
  brand: { type: String },
  images: [{ type: String }], // Array of image URLs
  countInStock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  createdAt: { type: Date, default: Date.now },
  material: { type: String }, // Material used for the product
  discount: { type: Number, default: 0 }, // Discount percentage (if any)
  featured: { type: Boolean, default: false } // Whether the product is featured
});

module.exports = mongoose.model('Product', ProductSchema);
