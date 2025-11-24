import mongoose from 'mongoose';

const treinoSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    alunoId: { type: String, required: true },
    professorId: { type: String, required: true },
    nome: { type: String, required: true },
    exercicios: [{
        nome: String,
        series: Number,
        reps: Number
    }],
    criadoEm: { type: Date, default: Date.now },
    atualizadoEm: { type: Date }
});

export default mongoose.model('Treino', treinoSchema);