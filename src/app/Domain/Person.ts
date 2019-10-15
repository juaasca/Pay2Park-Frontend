export class Person {
    Name: string;
    Username?: string;
    BirthDate?: Date;
    Email: string;

    constructor(name: string, username: string, birthDate: Date, email: string) {
        this.Name = name;
        this.Username = username;
        this.BirthDate = birthDate;
        this.Email = email;
    }

}