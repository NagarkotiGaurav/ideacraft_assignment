// routes/categoryRoutes.js
import express from 'express';
import { addCategory, getAllCategories, getCategoryWithSubcategories } from '../controllers/categoryController.js';
import { getAllUsers } from '../controllers/userController.js';

const router = express.Router();

// POST /api/categories
router.post('/', addCategory);

router.get('/', getAllCategories);
router.get('/getall',getCategoryWithSubcategories)

export default router;
