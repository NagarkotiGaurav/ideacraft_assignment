// controllers/subCategoryController.js
import SubCategory from '../models/SubCategory.js';
import Category from '../models/Category.js';

export const addSubCategory = async (req, res) => {
  try {
    const { name, category } = req.body;

    if (!name || !category) {
      return res.status(400).json({ error: 'Name and category ID are required' });
    }

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const subCategory = new SubCategory({ name, category });
    await subCategory.save();

    res.status(201).json({ message: 'Subcategory created successfully', subCategory });
  } catch (error) {
    console.error('Error creating subcategory:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const getSubCategoriesByCategory = async (req, res) => {
    try {
      const { category } = req.query;
      if (!category) {
        return res.status(400).json({ error: 'Category ID is required' });
      }
  
      const subCategories = await SubCategory.find({ category });
      res.status(200).json(subCategories);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch subcategories' });
    }
  };
  