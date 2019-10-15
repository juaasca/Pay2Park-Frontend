import { Person } from './Person';

export class Administrator extends Person {
    constructor(name: string, username: string, birthDate: Date, email: string) {
        super(name, username, birthDate, email);
    }
}