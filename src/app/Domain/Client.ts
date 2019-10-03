import { Person } from './Person';

export class Client extends Person {
    constructor(dni: string, name: string, surname: string, username: string, birthDate: Date, mail: string)
    {
        super(dni, name, surname, username, birthDate, mail);
    }
}