import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, CategoryController.getAll);
router.post('/', authenticate, authorize(['Admin']), CategoryController.create);
router.patch('/:id', authenticate, authorize(['Admin']), CategoryController.update);
router.delete('/:id', authenticate, authorize(['Admin']), CategoryController.delete);

export default router;
