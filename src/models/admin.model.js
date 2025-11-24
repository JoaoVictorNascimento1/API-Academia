import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true }
});

export default mongoose.model('Admin', adminSchema);