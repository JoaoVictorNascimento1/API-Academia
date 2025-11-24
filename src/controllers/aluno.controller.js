import AlunoService from '../services/aluno.service.js';

export const getMeuPerfil = async (req, res,next) => {
    try {
        const perfil = await AlunoService.getMeuPerfil(req.user.id);
        res.status(200).json(perfil);
    } catch (error) {
        next(error);
    }
};

export const getMeusTreinos = async (req, res,next) => {
    try {
        const treinos = await AlunoService.getMeusTreinos(req.user.id);
        res.status(200).json(treinos);
    } catch (error) {
        next(error);
    }
};

export const updateMeuPerfil = async (req, res,next) => {
    try {
        const perfil = await AlunoService.updateMeuPerfil(req.user.id, req.body);
        res.status(200).json(perfil);
    } catch (error) {
        next(error);
    }
};

export const deleteMinhaConta = async (req, res,next) => {
    try {
        const resultado = await AlunoService.deleteMinhaConta(req.user.id);
        res.status(200).json(resultado);
    } catch (error) {
       next(error);
    }
};