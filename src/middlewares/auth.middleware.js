import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'SUA_CHAVE_SECRETA_SUPER_SEGURA_AQUI_123456';

function authMiddleware(req,res,next){

    const authHeader = req.headers.authorization;
    if (!authHeader){
        return res.status(401).json({mensagem: "Token não fornecido!"})
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2){
        return res.status(401).json({mensagem: 'Token/Bearer não fornecido!'})
    };

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ mensagem: "Token mal formatado." });
    }

    jwt.verify(token,JWT_SECRET,(err, decoded) => {
        if (err){
            console.error('Erro de verificação de JWT:', err.message);
            return res.status(401).json({mensagem: "Token inválido ou expirado!"});
        }

        req.user = decoded;

        return next();
    });
}

export default authMiddleware;