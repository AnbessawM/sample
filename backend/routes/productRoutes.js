const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  searchProducts
} = require('../controllers/productController');
const { protect, admin } = require('../middlewares/authMiddleware');
const { upload } = require('../middlewares/uploadMiddleware');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/search', searchProducts);

// Protected admin routes
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

// Upload image endpoint (optional – using Multer)
router.post('/upload', protect, admin, upload.single('image'), (req, res) => {
  res.status(201).json({ imageUrl: `/${req.file.path}` });
});

// Product review route (authenticated users)
router.post('/:id/reviews', protect, createProductReview);

module.exports = router;
