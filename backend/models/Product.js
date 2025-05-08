// models/Product.js
import mongoose from 'mongoose';

const variationSchema = new mongoose.Schema({
  size: String,
  color: String,
  price: Number,
  discount: Number
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: String,
  productCode: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory'
  },
  variations: [variationSchema]
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
