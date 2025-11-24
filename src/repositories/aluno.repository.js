import Aluno from '../models/aluno.model.js';

class AlunoRepository {
    static async create(novoAluno) {
        return await Aluno.create(novoAluno);
    }

    static async findAll() {
        return await Aluno.find();
    }

    static async findById(id) {
        return await Aluno.findOne({ id: id });
    }

    static async findByProfessorId(professorId) {
        return await Aluno.find({ professorId: professorId });
    }

    static async findByEmail(email) {
        return await Aluno.findOne({ email: email });
    }

    static async update(id, dadosAtualizados) {
        return await Aluno.findOneAndUpdate({ id: id }, dadosAtualizados, { new: true });
    }

    static async transferirAlunos(idProfessorAntigo, idNovoProfessor) {
        const resultado = await Aluno.updateMany(
            { professorId: idProfessorAntigo },
            { professorId: idNovoProfessor }
        );
        return resultado.modifiedCount;
    }

    static async delete(id) {
        const resultado = await Aluno.findOneAndDelete({ id: id });
        return !!resultado;
    }
}

export default AlunoRepository;