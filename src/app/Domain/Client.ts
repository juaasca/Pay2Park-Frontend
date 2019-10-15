import { Person } from './Person';

export class Client extends Person {
    constructor(name: string, username: string, birthDate: Date, email: string) {
        super(name, username, birthDate, email);
    }
}