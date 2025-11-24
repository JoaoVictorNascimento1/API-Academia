import TreinoService from '../services/treino.service.js';

export const criarTreino = async (req, res,next) => {
    try {
        const treino = await TreinoService.criarTreino(req.user.id, req.body);
        res.status(201).json(treino);
    } catch (error) {
        next(error);
    }
};

export const editarTreino = async (req, res,next) => {
    try {
        const treino = await TreinoService.editarTreino(req.user.id, req.params.idTreino, req.body);
        res.status(200).json(treino);
    } catch (error) {
        next(error);
    }
};

export const deletarTreino = async (req, res,next) => {
    try {
        const result = await TreinoService.deletarTreino(req.user.id, req.params.idTreino);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};