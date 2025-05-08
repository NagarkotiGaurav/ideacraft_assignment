import express from 'express';
import { addProduct, getProductById } from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import Product from '../models/Product.js';
import upload from '../middleware/upload.js';
import mongoose from 'mongoose';
import Category from '../models/Category.js';
import SubCategory from '../models/SubCategory.js';
const router = express.Router();

router.post('/',upload.single('image'), addProduct);

router.get('/', async (req, res) => {
  try {
    const { category, subCategory } = req.query;
    const filter = {};

    // Find category by name if provided
    if (category) {
      const categoryDoc = await Category.findOne({ name: category });
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      }
    }

    // Find subCategory by name if provided
    if (subCategory) {
      const subCategoryDoc = await SubCategory.findOne({ name: subCategory });
      if (subCategoryDoc) {
        filter.subCategory = subCategoryDoc._id;
      }
    }
console.log(category,subCategory)
    const products = await Product.find(filter)
      .populate('category', 'name')
      .populate('subCategory', 'name');

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/:id', getProductById);

export default router;
