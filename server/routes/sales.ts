import { Router } from 'express';
import { SalesController } from '../controllers/SalesController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.post('/', authenticate, SalesController.create);
router.get('/', authenticate, authorize(['Admin']), SalesController.getAll);
router.get('/stats', authenticate, authorize(['Admin']), SalesController.getStats);
router.get('/:id/items', authenticate, authorize(['Admin']), SalesController.getItems);

export default router;
