import bcrypt from 'bcrypt';

const senhaPlana = 'adminSenhaForte123';
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(senhaPlana, salt);

console.log("Sua senha criptografada é:");
console.log(hash);