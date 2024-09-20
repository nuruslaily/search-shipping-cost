import { Router } from 'express';
import { getCost } from '../controllers/costController';

const router = Router();

router.post('/', getCost); // GET /api/Cost

export default router;
