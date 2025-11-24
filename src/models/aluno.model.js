import mongoose from 'mongoose';

const alunoSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    telefone: { type: String },
    data_nascimento: { type: String },
    objetivo: { type: String },
    professorId: { type: String, required: true }
}, {
    timestamps: true // cria createdAt e updatedAt automaticamente
});

export default mongoose.model('Aluno', alunoSchema);