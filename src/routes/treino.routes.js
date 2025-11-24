import express from 'express';

import {criarTreino, editarTreino, deletarTreino} from '../controllers/treino.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import {authorize} from '../middlewares/role.middleware.js'

const router = express.Router();

// Precisa estar logados para acessar qualquer rota de treino
router.use(authMiddleware);

// Apenas PROFESSORES podem criar, editar ou deletar treinos
router.post('/',authorize('admin','professor'),criarTreino);
router.put('/:idTreino',authorize('admin','professor'),editarTreino);
router.patch('/:idTreino', authorize('admin','professor'), editarTreino);
router.delete('/:idTreino',authorize('admin','professor'),deletarTreino);

export default router;