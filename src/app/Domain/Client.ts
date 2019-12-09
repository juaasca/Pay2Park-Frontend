import { Person } from './Person';

export class Client extends Person {

    Wallet: number;
    FechaFinalizacion: number;
    EsMultiBono: Boolean;
    CochesAparcados: number;

    constructor(name: string, username: string, birthDate: Date, email: string, wallet: number, FechaFinalizacion: number, EsMultibono: boolean, CochesAparcados: number) {
        super(name, username, birthDate, email);
        this.Wallet = wallet;
        this.FechaFinalizacion = FechaFinalizacion;
        this.EsMultiBono = EsMultibono;
        this.CochesAparcados = CochesAparcados;

    }
}