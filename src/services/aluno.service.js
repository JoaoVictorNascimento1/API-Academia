import AlunoRepository from '../repositories/aluno.repository.js';
import TreinoRepository from '../repositories/treino.repository.js';
import { AlunoResponseDTO } from '../dtos/aluno.dto.js';
import { TreinoResponseDTO } from '../dtos/treino.dto.js';

class AlunoService {
    static async getMeuPerfil(id) {
        const aluno = await AlunoRepository.findById(id);
        if (!aluno) {
            const erro = new Error('Aluno não encontrado.');
            erro.statusCode = 404;
            throw erro;
        }
        return new AlunoResponseDTO(aluno);
    }

    static async getMeusTreinos(id) {
        const treinos = await TreinoRepository.findByAlunoId(id);
        return treinos.map(t => new TreinoResponseDTO(t));
    }

    static async updateMeuPerfil(id, dados) {
        const { role, id: _id, senha, professorId, ...dadosPermitidos } = dados;
        const atualizado = await AlunoRepository.update(id, dadosPermitidos);
        if (!atualizado) {
            const erro = new Error('Aluno não encontrado.');
            erro.statusCode = 404;
            throw erro;
        };
        return new AlunoResponseDTO(atualizado);
    }

    static async deleteMinhaConta(id) {
        await TreinoRepository.deleteByAlunoId(id);
        const sucesso = await AlunoRepository.delete(id);
        if (!sucesso) {
            const erro = new Error('Aluno não encontrado.');
            erro.statusCode = 404;
            throw erro;
        };
        return { mensagem: "Conta deletada com sucesso." };
    }
}
export default AlunoService;