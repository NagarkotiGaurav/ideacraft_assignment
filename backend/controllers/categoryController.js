// controllers/categoryController.js
import Category from '../models/Category.js';
import slugify from 'slugify';
import SubCategory from '../models/SubCategory.js';

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(409).json({ error: 'Category already exists' });
    }

    const category = new Category({
      name,
      slug: slugify(name, { lower: true })
    });

    await category.save();
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find().sort({ createdAt: -1 });
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  export const getCategoryWithSubcategories = async (req, res) => {
    try {
      // Fetch all categories
      const categories = await Category.find();
  
      // For each category, fetch subcategories and structure the output
      const result = await Promise.all(
        categories.map(async (cat) => {
          const subCats = await SubCategory.find({ category: cat._id });
          return {
            name: cat.name,
            items: subCats.map(sub => sub.name)
          };
        })
      );
  
      res.json(result);
    } catch (err) {
      console.error('Error fetching category data:', err);
      res.status(500).json({ error: 'Failed to fetch category list' });
    }
  };