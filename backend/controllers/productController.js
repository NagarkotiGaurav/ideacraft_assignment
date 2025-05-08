import Product from '../models/Product.js';

// controllers/productController.js
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      productCode,
      description,
      category,
      subCategory,
      variations
    } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const existing = await Product.findOne({ productCode });
    if (existing) {
      return res.status(409).json({ error: 'Product code already exists' });
    }

    const product = new Product({
      name,
      image,
      productCode,
      description,
      category,
      subCategory,
      variations: JSON.parse(variations) // if sent as stringified JSON
    });

    await product.save();
    res.status(201).json({ message: 'Product created', product });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category')
      .populate('subCategory');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};