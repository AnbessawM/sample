const asyncHandler = require('express-async-handler');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get cart for user
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product');
  if (!cart) {
    cart = await Cart.create({ user: req.user._id, cartItems: [] });
  }
  res.json(cart);
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const { productId, qty } = req.body;
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  let cart = await Cart.findOne({ user: req.user._id });
  if (cart) {
    const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.cartItems[itemIndex].qty += qty;
    } else {
      cart.cartItems.push({ product: productId, qty });
    }
    cart = await cart.save();
  } else {
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [{ product: productId, qty }]
    });
  }
  res.status(201).json(cart);
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  let cart = await Cart.findOne({ user: req.user._id });
  if (cart) {
    cart.cartItems = cart.cartItems.filter(
      item => item.product.toString() !== productId
    );
    cart = await cart.save();
    res.json(cart);
  } else {
    res.status(404);
    throw new Error('Cart not found');
  }
});

module.exports = { getCart, addToCart, removeFromCart };
