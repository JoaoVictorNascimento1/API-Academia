export class TreinoResponseDTO {
    constructor(treino) {
        this.id = treino.id;
        this.alunoId = treino.alunoId;
        this.professorId = treino.professorId;
        this.nome = treino.nome;
        this.exercicios = treino.exercicios;
        this.criadoEm = treino.criadoEm;
        this.atualizadoEm = treino.atualizadoEm;
    }
}