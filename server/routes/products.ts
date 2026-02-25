import { Router } from 'express';
import { ProductController } from '../controllers/ProductController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, ProductController.getAll);
router.post('/', authenticate, authorize(['Admin']), ProductController.create);
router.patch('/:id', authenticate, authorize(['Admin']), ProductController.update);
router.delete('/:id', authenticate, authorize(['Admin']), ProductController.delete);

export default router;
