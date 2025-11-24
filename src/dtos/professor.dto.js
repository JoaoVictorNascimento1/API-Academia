export class ProfessorResponseDTO {
    constructor(professor) {
        this.id = professor.id;
        this.nome = professor.nome;
        this.email = professor.email;
        this.CREF = professor.CREF;
        this.telefone = professor.telefone;
    }
}