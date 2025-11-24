import ProfessorRepository from '../repositories/professor.repository.js';
import AlunoRepository from '../repositories/aluno.repository.js';
import TreinoRepository from '../repositories/treino.repository.js';
import AdminRepository from '../repositories/admin.repository.js';
import { ProfessorResponseDTO } from '../dtos/professor.dto.js';
import { AlunoResponseDTO } from '../dtos/aluno.dto.js';

class ProfessorService {
    static async getMeuPerfil(id) {
        const prof = await ProfessorRepository.findById(id);
        if (!prof) {
            const erro = new Error('Professor não encontrado.');
            erro.statusCode = 404;
            throw erro;
        };
        return new ProfessorResponseDTO(prof);
    };

    static async getMeusAlunos(solicitante) {
        let alunos;
        if (solicitante.role === 'admin') {
            alunos = await AlunoRepository.findAll();
        } else {
            alunos = await AlunoRepository.findByProfessorId(solicitante.id);
        };
        return alunos.map(a => new AlunoResponseDTO(a));
    };

    static async getAlunoEspecifico(solicitante, idAluno) {
        const aluno = await AlunoRepository.findById(idAluno);
        if (!aluno) {
            const erro = new Error('Aluno não encontrado.');
            erro.statusCode = 404;
            throw erro;
        };

        if (solicitante.role === 'professor' && aluno.professorId !== solicitante.id) {
            const erro = new Error('Acesso negado! Você não é o professor deste aluno.');
            erro.statusCode = 403;
            throw erro;
        };
        return new AlunoResponseDTO(aluno);
    };

    static async updateProfessor(id, dados) {
        const { id: _id, senha, role, ...dadosPermitidos } = dados;
        const atualizado = await ProfessorRepository.update(id, dadosPermitidos);
        if (!atualizado) {
            const erro = new Error('Professor não encontrado.');
            erro.statusCode = 404;
            throw erro;
        };
        return new ProfessorResponseDTO(atualizado);
    };

    static async deleteProfessor(idProfessor) {
        const admin = await AdminRepository.findMainAdmin();
        if (!admin) {
            const erro = new Error('Erro crítico: Admin não encontrado para transferência.');
            erro.statusCode = 500;
            throw erro;
        };

        // Regra de negócio complexa encapsulada no Service
        await AlunoRepository.transferirAlunos(idProfessor, admin.id);
        await TreinoRepository.deleteByProfessorId(idProfessor);
        const sucesso = await ProfessorRepository.delete(idProfessor);
        
        if (!sucesso) {
            const erro = new Error('Professor não encontrado.');
            erro.statusCode = 404;
            throw erro;
        };
        return { mensagem: "Professor deletado. Alunos transferidos para o admin." };
    };
}
export default ProfessorService;