// routes/subCategoryRoutes.js
import express from 'express';
import { addSubCategory, getSubCategoriesByCategory } from '../controllers/subCategoryController.js';

const router = express.Router();

// POST /api/subcategories
router.post('/', addSubCategory);

router.get('/', getSubCategoriesByCategory);

export default router;
