export class UsuarioCriacaoDTO {
    id?: number
    nome?: string
    login?: string
    email?: string
    senha?: string
    dataDeNascimento?: Date

    /*
    constructor(
         nome: string,
         login: string,
         email: string,
         senha: string,
        dataDeNascimento: Date) {
            this.nome = nome
            this.login = login
            this.email = email
            this.senha = senha
            this.dataDeNascimento = dataDeNascimento
    }
    */
}