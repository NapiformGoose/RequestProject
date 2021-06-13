
export class Mappers {

    static mapDateToClient(date) {
        return date.slice(0, 10);
    }

    static mapDateToServer(date) {
        return new Date(Date.parse(date)).toISOString()
    }
    
}

export default Mappers;