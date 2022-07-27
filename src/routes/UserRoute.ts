import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

// USAR ANTES /api/user
// http://localhost:4000/api/user

router.get('/', UserController.getPaginator);
router.get('/all', UserController.getAll);
router.get('/:id', UserController.getById);
router.post('/register', UserController.register);

export default router;