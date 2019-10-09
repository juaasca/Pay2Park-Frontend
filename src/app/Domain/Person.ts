export class Person {
    Name: string;
    Surname: string;
    Username: string;
    BirthDate: Date;
    Email: string;

    constructor(name: string, surname: string, username: string, birthDate: Date, email: string) {
        this.Name = name;
        this.Surname = surname;
        this.Username = username;
        this.BirthDate = birthDate;
        this.Email = email;
    }

}