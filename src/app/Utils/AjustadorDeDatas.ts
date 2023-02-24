export abstract class AjustadorDeDatas {
    static ajustaData = (data: Date): Date => {
        return new Date(data[0], data[1] - 1, data[2])
    }

    static ajustaDataEHora = (data: Date): Date => {
        if (data) {
            return new Date(data[0], data[1] - 1, data[2], data[3], data[4])
        }
    }
}