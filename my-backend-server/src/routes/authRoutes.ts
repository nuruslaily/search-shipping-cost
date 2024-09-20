import { Router } from 'express';
import { login } from '../controllers/authController';

const router = Router();

router.post('/login', login); // POST /api/auth/login

export default router;
