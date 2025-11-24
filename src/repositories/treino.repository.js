import Treino from '../models/treino.model.js';

class TreinoRepository {
    static async create(novoTreino) {
        return await Treino.create(novoTreino);
    }

    static async findById(id) {
        return await Treino.findOne({ id: id });
    }

    static async findByAlunoId(alunoId) {
        return await Treino.find({ alunoId: alunoId });
    }

    static async update(id, dadosAtualizados) {
        return await Treino.findOneAndUpdate({ id: id }, dadosAtualizados, { new: true });
    }

    static async delete(id) {
        const resultado = await Treino.findOneAndDelete({ id: id });
        return !!resultado;
    }

    static async deleteByAlunoId(alunoId) {
        const resultado = await Treino.deleteMany({ alunoId: alunoId });
        return resultado.deletedCount > 0;
    }

    static async deleteByProfessorId(professorId) {
        const resultado = await Treino.deleteMany({ professorId: professorId });
        return resultado.deletedCount > 0;
    }
}

export default TreinoRepository;