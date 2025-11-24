export const authorize = (...roles) => {
    return (req,res,next)=>{
        if (!req.user || !roles.includes(req.user.role)){
            return res.status(403).json({ message: `Acesso negado. Papel '${req.user.role}' não tem permissão para este recurso.` });
        }
        next();
    };
};