import { Person } from './Person';

export class Client extends Person {

    Wallet: number;
    DuracionBono: number;

    constructor(name: string, username: string, birthDate: Date, email: string, wallet: number, duracionBono: number) {
        super(name, username, birthDate, email);
        this.Wallet = wallet;
        this.DuracionBono = duracionBono;

    }
}