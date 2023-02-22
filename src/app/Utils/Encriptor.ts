export abstract class Encriptor {
    static encriptografaSenha = (texto:string): string => {
        return btoa(texto)
    }
    static descriptografaSenha = (texto:string): string => {
        return atob(texto)
    }
}