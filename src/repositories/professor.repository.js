import Professor from '../models/professor.model.js';

class ProfessorRepository {
    static async create(novoProfessor) {
        return await Professor.create(novoProfessor);
    }

    static async findById(id) {
        return await Professor.findOne({ id: id });
    }

    static async findByEmail(email) {
        return await Professor.findOne({ email: email });
    }

    static async update(id, dadosAtualizados) {
        return await Professor.findOneAndUpdate({ id: id }, dadosAtualizados, { new: true });
    }

    static async delete(id) {
        const resultado = await Professor.findOneAndDelete({ id: id });
        return !!resultado;
    }
}

export default ProfessorRepository;