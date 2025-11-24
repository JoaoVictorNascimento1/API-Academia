import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import AlunoRepository from '../repositories/aluno.repository.js';
import ProfessorRepository from '../repositories/professor.repository.js';
import AdminRepository from '../repositories/admin.repository.js';

const JWT_SECRET = process.env.JWT_SECRET || 'SUA_CHAVE_SECRETA_SUPER_SEGURA_AQUI_123456';

class AuthService {
    static async register(tipoUsuario, dadosUsuario) {
        if (!dadosUsuario.email || !dadosUsuario.senha || !dadosUsuario.nome) {
            const erro = new Error("Nome, email e senha são obrigatórios.");
            erro.statusCode = 400;
            throw erro;
        };

        const alunoExistente = await AlunoRepository.findByEmail(dadosUsuario.email);
        const profExistente = await ProfessorRepository.findByEmail(dadosUsuario.email);

        if (alunoExistente || profExistente) {
            const erro = new Error("Este email já está em uso.");
            erro.statusCode = 400;
            throw error;
        };

        const salt = await bcrypt.genSalt(10);
        const senhaCriptografada = await bcrypt.hash(dadosUsuario.senha, salt);

        const novoUsuario = {
            id: uuidv4(),
            nome: dadosUsuario.nome,
            email: dadosUsuario.email,
            senha: senhaCriptografada,
            telefone: dadosUsuario.telefone,
            data_nascimento: dadosUsuario.data_nascimento
        };

        if (tipoUsuario === 'aluno') {
            novoUsuario.objetivo = dadosUsuario.objetivo;
            novoUsuario.professorId = dadosUsuario.professorId;
            await AlunoRepository.create(novoUsuario);
        } else if (tipoUsuario === 'professor') {
            novoUsuario.CREF = dadosUsuario.CREF;
            await ProfessorRepository.create(novoUsuario);
        }

        const payload = { id: novoUsuario.id, email: novoUsuario.email, role: tipoUsuario };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        return { token, usuario: { id: novoUsuario.id, nome: novoUsuario.nome, email: novoUsuario.email } };
    }

    static async login(email, senha) {
        if (!email || !senha){
            const erro = new Error("Por favor, envie email e senha.");
            erro.statusCode = 400;
            throw erro;

        } 

        let usuario = await AdminRepository.findByEmail(email);
        let role = 'admin';

        if (!usuario) {
            usuario = await ProfessorRepository.findByEmail(email);
            role = 'professor';
        }
        if (!usuario) {
            usuario = await AlunoRepository.findByEmail(email);
            role = 'aluno';
        }

        if (!usuario) {
            const erro =  new Error("Credenciais inválidas.")
            erro.statusCode = 401;
            throw erro
        };

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            const erro =  new Error("Credenciais inválidas.")
            erro.statusCode = 401;
            throw erro
        };

        const token = jwt.sign({ id: usuario.id, email: usuario.email, role }, JWT_SECRET, { expiresIn: '1h' });

        return { token, mensagem: "Login realizado com sucesso!" };
    }
}
export default AuthService;