import AuthService from '../services/auth.service.js';

export const register = (tipoDeUsuario) => {
    return async (req, res,next) => {
        try {
            const resultado = await AuthService.register(tipoDeUsuario, req.body);
            res.status(201).json({
                mensagem: `${tipoDeUsuario} registrado com sucesso!`,
                ...resultado
            });
        } catch (error) {
            next(error);
        }
    };
};

export const login = async (req, res,next) => {
    try {
        const { email, senha } = req.body;
        const resultado = await AuthService.login(email, senha);
        res.status(200).json(resultado);
    } catch (error) {
        next(error);
    }
};