import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Importando os Models que criamos
import Aluno from './src/models/aluno.model.js';
import Professor from './src/models/professor.model.js';
import Treino from './src/models/treino.model.js';
import Admin from './src/models/admin.model.js';

dotenv.config();

const uri = process.env.MONGO_URI;

// Dados iniciais (com a correção do ID duplicado do Professor 2)
const dadosIniciais = {
  professores: [
    {
      "id": "8aa9c7be-91ba-4b83-9ea2-b66973a85b23",
      "nome": "Professor teste",
      "email": "testeprofessor@email.com",
      "senha": "$2b$10$mdQw1peZCIL/Cwz4d.MWpORx4fQp1ePLKQUmFhXFUAu9NSd7og/Bm", // password123
      "CREF": "123456-G/RN",
      "telefone": "99999-9999" // Adicionado pois o Schema pode ter campo telefone
    },
    {
      "id": "9bb1d8cf-22ca-5c94-0fb3-c77084b96c34", // ID NOVO (para não dar erro de duplicidade no Schema)
      "nome": "Professor teste2",
      "email": "testeprofessor2@email.com",
      "senha": "$2b$10$mdQw1peZCIL/Cwz4d.MWpORx4fQp1ePLKQUmFhXFUAu9NSd7og/Bm",
      "CREF": "123456-G/RN"
    }
  ],
  alunos: [
    {
      "id": "54004944-8325-48fa-b929-5334b5b3f17e",
      "professorId": "8aa9c7be-91ba-4b83-9ea2-b66973a85b23",
      "nome": "Teste da Silva",
      "email": "testealuno@email.com",
      "senha": "$2b$10$7z9HwwfdUSTguBVwtBhGFOsE7WkH6R55LrUI7xIt/WBboMbCx6jW2", // senhaforte
      "objetivo": "Hipertrofia",
      "telefone": "88888-8888",
      "data_nascimento": "2000-01-01"
    }
  ],
  treinos: [], // Pode deixar vazio ou adicionar um objeto seguindo o Schema de Treino
  admins: [
    {
      "id": "8b2878cf-5811-478a-9696-2dd73f844f30",
      "nome": "Administrador Mestre",
      "email": "admin@email.com",
      "senha": "$2b$10$KyFKoF6agQzmBb5.YjN5neTu58HWCIyZT33IBjlORAXjojP9tmoE2" // adminSenhaForte123
    }
  ]
};

async function seedDatabase() {
    try {
        // 1. Conectar ao Mongoose
        await mongoose.connect(uri, {
            dbName: 'academia-db'
        });
        console.log("🔌 Conectado ao MongoDB via Mongoose para seed...");

        // 2. Limpar coleções antigas usando os Models
        // Isso é mais seguro pois respeita middlewares se existissem
        console.log("🧹 Limpando dados antigos...");
        await Professor.deleteMany({});
        await Aluno.deleteMany({});
        await Treino.deleteMany({});
        await Admin.deleteMany({});

        // 3. Inserir os dados
        console.log("🌱 Inserindo novos dados...");

        if (dadosIniciais.professores.length > 0) {
            await Professor.insertMany(dadosIniciais.professores);
        }
        
        if (dadosIniciais.alunos.length > 0) {
            await Aluno.insertMany(dadosIniciais.alunos);
        }
        
        if (dadosIniciais.admins.length > 0) {
            await Admin.insertMany(dadosIniciais.admins);
        }

        if (dadosIniciais.treinos.length > 0) {
             await Treino.insertMany(dadosIniciais.treinos);
        }

        console.log("✅ Dados inseridos com sucesso!");

    } catch (err) {
        console.error("❌ Erro ao rodar o seed:", err);
    } finally {
        // 4. Fechar conexão
        await mongoose.disconnect();
        console.log("👋 Conexão encerrada.");
        process.exit(0);
    }
}

seedDatabase();