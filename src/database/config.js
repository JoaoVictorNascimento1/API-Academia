import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

export async function connectDB() {
    try {
        await mongoose.connect(uri, {
            dbName: 'academia-db'
        });
        console.log("✅ Conectado ao MongoDB via Mongoose!");
    } catch (error) {
        console.error("❌ Erro ao conectar no MongoDB:", error);
        process.exit(1);
    }
}