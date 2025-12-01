import express from 'express';
import {
  getAllDrinks,
  getDrinkById,
  createDrink,
  updateDrink,
  deleteDrink,
  searchDrinks,
  toggleBestseller,
} from '../controllers/drinkController.js';

const router = express.Router();

// Routes
router.get('/', getAllDrinks);
router.get('/search', searchDrinks);
router.get('/:id', getDrinkById);
router.post('/', createDrink);
router.put('/:id', updateDrink);
router.patch('/:id/bestseller', toggleBestseller);
router.delete('/:id', deleteDrink);

export default router;
