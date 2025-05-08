import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/auth.js'
import categoryRoutes from './routes/category.js';
import SubCategoryRoutes from './routes/subcategoryRoute.js'
// app.js or server.js
import path from 'path';
import { fileURLToPath } from 'url';



dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth',authRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/subcategory', SubCategoryRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
