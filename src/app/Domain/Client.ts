import { Person } from './Person';

export class Client extends Person {
    constructor(name: string, surname: string, username: string, birthDate: Date, email: string)
    {
        super(name, surname, username, birthDate, email);
    }
}