export class AlunoResponseDTO {
    constructor(aluno) {
        this.id = aluno.id;
        this.nome = aluno.nome;
        this.email = aluno.email;
        this.objetivo = aluno.objetivo;
        this.professorId = aluno.professorId;
        this.telefone = aluno.telefone;
        this.data_nascimento = aluno.data_nascimento;
    }
}