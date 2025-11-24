import express from 'express';
import authRoutes from './src/routes/auth.routes.js';
import alunoRoutes from './src/routes/aluno.routes.js';
import professoresRoutes from './src/routes/professor.routes.js';
import treinoRoutes from './src/routes/treino.routes.js';
import { globalErrorHandler } from './src/middlewares/error.middleware.js';
import { connectDB } from './src/database/config.js';

const app = express();
const PORTA = process.env.PORTA || 3000; 

app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Você está na API-Academia com MongoDB!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/alunos', alunoRoutes);
app.use('/api/professores', professoresRoutes);
app.use('/api/treinos', treinoRoutes);

app.use(globalErrorHandler);

async function startServer() {
    await connectDB();
    app.listen(PORTA, () => {
        console.log(`Servidor rodando na porta: ${PORTA}`);
    });
}

startServer();