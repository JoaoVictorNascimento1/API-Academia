import express from 'express';
import {getMeuPerfil, getMeusTreinos, updateMeuPerfil, deleteMinhaConta} from '../controllers/aluno.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/meu-perfil', authorize('aluno'), getMeuPerfil); //Rota GET
router.get('/meus-treinos', authorize('aluno'), getMeusTreinos); //Rota GET
router.put('/meu-perfil', authorize('aluno'), updateMeuPerfil); // Rota PUT
router.patch('/meu-perfil', authorize('aluno'), updateMeuPerfil); // Rota PATCH
router.delete('/minha-conta', authorize('aluno'), deleteMinhaConta); // Rota DELETE

export default router;