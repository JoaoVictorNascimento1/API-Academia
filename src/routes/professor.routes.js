import express from 'express';
import {
    getMeuPerfil,
    getMeusAlunos,
    getAlunoEspecifico,
    updateMeuPerfilProfessor,
    deleteMinhaContaProfessor,
    updateAluno,
    deleteAluno,
    updateProfessor,
    deleteProfessor
} from '../controllers/professor.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/meu-perfil', authorize('professor'), getMeuPerfil);
router.put('/meu-perfil', authorize('professor'), updateMeuPerfilProfessor);
router.patch('/meu-perfil', authorize('professor'), updateMeuPerfilProfessor);
router.delete('/minha-conta', authorize('professor'), deleteMinhaContaProfessor);

router.get('/meus-alunos', authorize('admin', 'professor'), getMeusAlunos);
router.get('/meus-alunos/:idAluno', authorize('admin', 'professor'), getAlunoEspecifico);
router.put('/meus-alunos/:idAluno', authorize('admin', 'professor'), updateAluno);
router.patch('/meus-alunos/:idAluno', authorize('admin', 'professor'), updateAluno);
router.delete('/meus-alunos/:idAluno', authorize('admin', 'professor'), deleteAluno);

router.put('/:idProfessor', authorize('admin'), updateProfessor);
router.patch('/:idProfessor', authorize('admin'), updateProfessor);
router.delete('/:idProfessor', authorize('admin'), deleteProfessor);

export default router;
