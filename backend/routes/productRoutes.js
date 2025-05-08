import express from 'express';
import { addProduct, getProductById } from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import Product from '../models/Product.js';
import upload from '../middleware/upload.js';
import mongoose from 'mongoose';
const router = express.Router();

router.post('/',upload.single('image'), addProduct);

router.get('/', async (req, res) => {
  try {
    const { category, subCategory } = req.query;
    const filter = {};

    if (category && mongoose.Types.ObjectId.isValid(category)) {
      filter.category = new mongoose.Types.ObjectId(category);
    }

    if (subCategory && mongoose.Types.ObjectId.isValid(subCategory)) {
      filter.subCategory = new mongoose.Types.ObjectId(subCategory);
    }

    const products = await Product.find(filter)
      .populate('category', 'name') // optional: populate category name
      .populate('subCategory', 'name'); // optional: populate subCategory name

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/:id', getProductById);

export default router;
