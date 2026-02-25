import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/me', authenticate, AuthController.me);
router.get('/users', authenticate, authorize(['Admin']), AuthController.getAll);
router.delete('/users/:id', authenticate, authorize(['Admin']), AuthController.delete);

export default router;
