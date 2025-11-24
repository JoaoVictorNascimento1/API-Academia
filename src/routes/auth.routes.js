import express from 'express'
import { register,login } from '../controllers/auth.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';

const router = express.Router();

//rota post para registrar aluno e professor com base no tipo
router.post('/register/aluno',authMiddleware,authorize('admin','professor'),register('aluno'));
router.post('/register/professor',authMiddleware, authorize('admin'), register('professor'));//rota post para login
router.post('/login',login)

export default router;