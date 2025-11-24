import TreinoRepository from '../repositories/treino.repository.js';
import AlunoRepository from '../repositories/aluno.repository.js';
import { v4 as uuidv4 } from 'uuid';
import { TreinoResponseDTO } from '../dtos/treino.dto.js';

class TreinoService {
    static async criarTreino(professorId, dados) {
        const { alunoId, nome, exercicios } = dados;
        if (!alunoId || !nome || !exercicios) {
            const erro = new Error('Dados incompletos: alunoId, nome e exercicios são obrigatórios.');
            erro.statusCode = 400;
            throw erro;
        };

        const aluno = await AlunoRepository.findById(alunoId);
        if (!aluno) {
            const erro = new Error('Aluno não encontrado.');
            erro.statusCode = 404;
            throw erro;
        };
        
        if (aluno.professorId !== professorId) {
            const erro = new Error('Acesso negado: Você não é o professor deste aluno.');
            erro.statusCode = 403;
            throw erro;
        };

        const novoTreino = {
            id: uuidv4(),
            alunoId,
            professorId,
            nome,
            exercicios,
            criadoEm: new Date().toISOString()
        };
        
        const treinoCriado = await TreinoRepository.create(novoTreino);
        return new TreinoResponseDTO(treinoCriado);
    }

    static async editarTreino(professorId, idTreino, dados) {
        const treino = await TreinoRepository.findById(idTreino);
        if (!treino) {
            const erro = new Error('Treino não encontrado.');
            erro.statusCode = 404;
            throw erro;
        }

        if (treino.professorId !== professorId) {
            const erro = new Error('Acesso negado: Você não é o criador deste treino.');
            erro.statusCode = 403;
            throw erro;
        }

        const dadosComData = { ...dados, atualizadoEm: new Date().toISOString() };
        const atualizado = await TreinoRepository.update(idTreino, dadosComData);
        return new TreinoResponseDTO(atualizado);
    }

    static async deletarTreino(professorId, idTreino) {
        const treino = await TreinoRepository.findById(idTreino);
        if (!treino) {
            const erro = new Error('Treino não encontrado.');
            erro.statusCode = 404;
            throw erro;
        }

        if (treino.professorId !== professorId) {
            const erro = new Error('Acesso negado.');
            erro.statusCode = 403;
            throw erro;
        }
        
        await TreinoRepository.delete(idTreino);
        return { mensagem: "Treino removido com sucesso." };
    }
}
export default TreinoService;