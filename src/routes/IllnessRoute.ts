import { Router, Request, Response } from 'express';
import IllnessController from '../controllers/IllnessController';


const router = Router()

// USAR ANTES /api/illness
// http://localhost:4000/api/illness

router.get('/all/:id', IllnessController.getAllByUser);
router.get('/:id', IllnessController.getById);
router.post('/register', IllnessController.register);

export default router;