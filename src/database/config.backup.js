/*
//JWolA3kLl5yoaH5g
//mongodb+srv://usuario-acad:JWolA3kLl5yoaH5g@cluster0-acad.8o8pidx.mongodb.net/?appName=Cluster0-acad

import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, 'db.json');

const defaultData = {
    professores: [
        {
        "id": "8aa9c7be-91ba-4b83-9ea2-b66973a85b23",
        "nome": "Professor teste",
        "email": "testeprofessor@email.com",
        "senha": "$2b$10$mdQw1peZCIL/Cwz4d.MWpORx4fQp1ePLKQUmFhXFUAu9NSd7og/Bm", //password123
        "CREF": "123456-G/RN"
        },
        {
        "id": "8aa9c7be-91ba-4b83-9ea2-b66973a85b23",
        "nome": "Professor teste2",
        "email": "testeprofessor2@email.com",
        "senha": "$2b$10$mdQw1peZCIL/Cwz4d.MWpORx4fQp1ePLKQUmFhXFUAu9NSd7og/Bm", //password123
        "CREF": "123456-G/RN"
        }
    ],
    alunos: [
        {
        "id": "54004944-8325-48fa-b929-5334b5b3f17e",
        "professorId": "8aa9c7be-91ba-4b83-9ea2-b66973a85b23",
        "nome": "Teste da Silva",
        "email": "testealuno@email.com",
        "senha": "$2b$10$7z9HwwfdUSTguBVwtBhGFOsE7WkH6R55LrUI7xIt/WBboMbCx6jW2", //senhaforte
        "objetivo": "Hipertrofia"
        }
    ],
    treinos: [],
    admins: [
        {
            id: uuidv4(),
            nome: "Administrador Mestre",
            email: "admin@email.com",
            senha: "$2b$10$KyFKoF6agQzmBb5.YjN5neTu58HWCIyZT33IBjlORAXjojP9tmoE2" //adminSenhaForte123
        }
    ]
};

const adapter = new JSONFile(file);
const db = new Low(adapter, defaultData);

await db.read();
await db.write();

export default db;
*/