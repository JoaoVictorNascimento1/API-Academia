import ProfessorService from '../services/professor.service.js';
import AlunoService from '../services/aluno.service.js';

export const getMeuPerfil = async (req, res,next) => {
    try {
        const perfil = await ProfessorService.getMeuPerfil(req.user.id);
        res.status(200).json(perfil);
    } catch (error) {
        next(error);
    }
};

export const getMeusAlunos = async (req, res,next) => {
    try {
        const alunos = await ProfessorService.getMeusAlunos(req.user);
        res.status(200).json(alunos);
    } catch (error) {
        next(error);
    }
};

export const getAlunoEspecifico = async (req, res,next) => {
    try {
        const aluno = await ProfessorService.getAlunoEspecifico(req.user, req.params.idAluno);
        res.status(200).json(aluno);
    } catch (error) {
        next(error);
    }
};

export const updateMeuPerfilProfessor = async (req, res,next) => {
    try {
        const perfil = await ProfessorService.updateProfessor(req.user.id, req.body);
        res.status(200).json(perfil);
    } catch (error) {
        next(error);
    }
};

export const deleteMinhaContaProfessor = async (req, res,next) => {
    try {
        const result = await ProfessorService.deleteProfessor(req.user.id);
        res.status(200).json(result);
    } catch (error) {
       next(error);
    }
};

// Admin Actions
export const updateProfessor = async (req, res,next) => {
    try {
        const perfil = await ProfessorService.updateProfessor(req.params.idProfessor, req.body);
        res.status(200).json(perfil);
    } catch (error) {
        next(error);
    }
};

export const deleteProfessor = async (req, res,next) => {
    try {
        const result = await ProfessorService.deleteProfessor(req.params.idProfessor);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

// Professor Actions on Aluno
export const updateAluno = async (req, res,next) => {
    try {
        // Valida se é professor do aluno
        await ProfessorService.getAlunoEspecifico(req.user, req.params.idAluno);
        const perfil = await AlunoService.updateMeuPerfil(req.params.idAluno, req.body);
        res.status(200).json(perfil);
    } catch (error) {
       next(error);
    }
};

export const deleteAluno = async (req, res,next) => {
    try {
        await ProfessorService.getAlunoEspecifico(req.user, req.params.idAluno);
        const result = await AlunoService.deleteMinhaConta(req.params.idAluno);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};