import express from 'express';
import {
  getAllCategories,
  getCategoryBySlug,
  getDrinksByCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';

const router = express.Router();

// Routes
router.get('/', getAllCategories);
router.get('/:slug', getCategoryBySlug);
router.get('/:slug/drinks', getDrinksByCategory);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
