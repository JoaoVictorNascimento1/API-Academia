import mongoose from 'mongoose';

const professorSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    CREF: { type: String, required: true },
    telefone: { type: String }
}, {
    timestamps: true
});

export default mongoose.model('Professor', professorSchema);