/* global use, db */
// MongoDB Playground

// Select the database to use.
use('zemen');

// Insert 15 new products into the productDB collection.
db.getCollection('productDB').insertMany([
  { 
    'name': 'Classic Denim Jacket', 
    'description': 'A timeless denim jacket, perfect for casual wear.', 
    'price': 59.99, 
    'category': 'Jackets', 
    'color': ['Blue', 'Black', 'Grey'], 
    'size': ['S', 'M', 'L'], 
    'brand': 'DenimWorld', 
    'images': [
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b',
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b'
    ], 
    'countInStock': 50, 
    'rating': 4.7, 
    'numReviews': 120, 
    'material': 'Denim', 
    'discount': 10, 
    'featured': true
  },
  { 
    'name': 'Casual T-shirt', 
    'description': 'Soft and comfortable t-shirt, ideal for daily wear.', 
    'price': 19.99, 
    'category': 'T-shirts', 
    'color': ['White', 'Black', 'Blue'], 
    'size': ['M', 'L', 'XL'], 
    'brand': 'ComfyWear', 
    'images': [
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b',
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b'
    ], 
    'countInStock': 100, 
    'rating': 4.5, 
    'numReviews': 200, 
    'material': 'Cotton', 
    'discount': 5, 
    'featured': false
  },
  { 
    'name': 'Leather Boots', 
    'description': 'Stylish leather boots for both work and play.', 
    'price': 79.99, 
    'category': 'Footwear', 
    'color': ['Brown', 'Black'], 
    'size': ['7', '8', '9', '10'], 
    'brand': 'FootStyle', 
    'images': [
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b',
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b'
    ], 
    'countInStock': 30, 
    'rating': 4.8, 
    'numReviews': 50, 
    'material': 'Leather', 
    'discount': 15, 
    'featured': true
  },
  { 
    'name': 'Floral Summer Dress', 
    'description': 'A light and breezy dress, perfect for warm days.', 
    'price': 39.99, 
    'category': 'Dresses', 
    'color': ['Pink', 'Blue', 'Green'], 
    'size': ['S', 'M', 'L'], 
    'brand': 'SunStyle', 
    'images': [
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b',
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b'
    ], 
    'countInStock': 60, 
    'rating': 4.6, 
    'numReviews': 130, 
    'material': 'Cotton', 
    'discount': 12, 
    'featured': false
  },
  { 
    'name': 'Sports Shorts', 
    'description': 'Comfortable and flexible shorts for sports and outdoor activities.', 
    'price': 24.99, 
    'category': 'Activewear', 
    'color': ['Black', 'Grey', 'Blue'], 
    'size': ['M', 'L', 'XL'], 
    'brand': 'FitGear', 
    'images': [
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b',
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b'
    ], 
    'countInStock': 80, 
    'rating': 4.4, 
    'numReviews': 110, 
    'material': 'Polyester', 
    'discount': 8, 
    'featured': true
  },
  { 
    'name': 'Chic Black Purse', 
    'description': 'A stylish and sleek black purse that goes with any outfit.', 
    'price': 49.99, 
    'category': 'Accessories', 
    'color': ['Black'], 
    'size': ['One Size'], 
    'brand': 'PurseWorld', 
    'images': [
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b',
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b'
    ], 
    'countInStock': 25, 
    'rating': 4.9, 
    'numReviews': 180, 
    'material': 'Leather', 
    'discount': 20, 
    'featured': true
  },
  { 
    'name': 'Padded Jacket', 
    'description': 'A warm padded jacket perfect for winter weather.', 
    'price': 79.99, 
    'category': 'Jackets', 
    'color': ['Black', 'Grey'], 
    'size': ['M', 'L', 'XL'], 
    'brand': 'WinterWear', 
    'images': [
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b',
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b'
    ], 
    'countInStock': 40, 
    'rating': 4.8, 
    'numReviews': 220, 
    'material': 'Polyester', 
    'discount': 10, 
    'featured': false
  },
  { 
    'name': 'Cozy Knit Scarf', 
    'description': 'A soft, warm scarf to keep you cozy during chilly days.', 
    'price': 19.99, 
    'category': 'Accessories', 
    'color': ['Red', 'Green', 'Cream'], 
    'size': ['One Size'], 
    'brand': 'KnitWorld', 
    'images': [
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b',
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b'
    ], 
    'countInStock': 75, 
    'rating': 4.7, 
    'numReviews': 150, 
    'material': 'Wool', 
    'discount': 10, 
    'featured': true
  },
  { 
    'name': 'Hooded Sweatshirt', 
    'description': 'Comfortable and cozy hoodie for casual wear.', 
    'price': 34.99, 
    'category': 'Sweatshirts', 
    'color': ['Grey', 'Black', 'White'], 
    'size': ['M', 'L', 'XL'], 
    'brand': 'ComfyHood', 
    'images': [
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b',
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b'
    ], 
    'countInStock': 90, 
    'rating': 4.6, 
    'numReviews': 180, 
    'material': 'Cotton', 
    'discount': 15, 
    'featured': false
  },
  { 
    'name': 'Stylish Sunglasses', 
    'description': 'Sleek and stylish sunglasses that provide UV protection.', 
    'price': 29.99, 
    'category': 'Accessories', 
    'color': ['Black', 'Brown'], 
    'size': ['One Size'], 
    'brand': 'SunOptics', 
    'images': [
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b',
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b'
    ], 
    'countInStock': 120, 
    'rating': 4.8, 
    'numReviews': 200, 
    'material': 'Plastic', 
    'discount': 5, 
    'featured': true
  },
  { 
    'name': 'Sports Cap', 
    'description': 'Perfect for outdoor activities and casual wear.', 
    'price': 14.99, 
    'category': 'Accessories', 
    'color': ['Black', 'Red'], 
    'size': ['One Size'], 
    'brand': 'ActiveGear', 
    'images': [
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b',
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b'
    ], 
    'countInStock': 150, 
    'rating': 4.3, 
    'numReviews': 90, 
    'material': 'Polyester', 
    'discount': 10, 
    'featured': false
  },
  { 
    'name': 'Running Sneakers', 
    'description': 'Comfortable sneakers designed for running and sports.', 
    'price': 69.99, 
    'category': 'Footwear', 
    'color': ['White', 'Black'], 
    'size': ['8', '9', '10'], 
    'brand': 'SportFit', 
    'images': [
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b',
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b'
    ], 
    'countInStock': 50, 
    'rating': 4.7, 
    'numReviews': 150, 
    'material': 'Mesh', 
    'discount': 5, 
    'featured': true
  },
  { 
    'name': 'Classic Watch', 
    'description': 'A sleek, timeless watch for any occasion.', 
    'price': 149.99, 
    'category': 'Accessories', 
    'color': ['Silver', 'Gold'], 
    'size': ['One Size'], 
    'brand': 'TimePiece', 
    'images': [
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b',
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b'
    ], 
    'countInStock': 20, 
    'rating': 4.9, 
    'numReviews': 100, 
    'material': 'Stainless Steel', 
    'discount': 10, 
    'featured': true
  },
  { 
    'name': 'Sports Jacket', 
    'description': 'Lightweight sports jacket for outdoor activities.', 
    'price': 59.99, 
    'category': 'Jackets', 
    'color': ['Blue', 'Black'], 
    'size': ['M', 'L'], 
    'brand': 'SportStyle', 
    'images': [
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b',
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b'
    ], 
    'countInStock': 40, 
    'rating': 4.6, 
    'numReviews': 160, 
    'material': 'Polyester', 
    'discount': 10, 
    'featured': false
  },
  { 
    'name': 'Track Pants', 
    'description': 'Comfortable and flexible pants for jogging and sports.', 
    'price': 29.99, 
    'category': 'Activewear', 
    'color': ['Black', 'Grey'], 
    'size': ['M', 'L', 'XL'], 
    'brand': 'FitActive', 
    'images': [
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b',
      'https://images.unsplash.com/photo-1600421990193-8d76b9fd927b'
    ], 
    'countInStock': 70, 
    'rating': 4.5, 
    'numReviews': 140, 
    'material': 'Polyester', 
    'discount': 5, 
    'featured': true
  }
]);
