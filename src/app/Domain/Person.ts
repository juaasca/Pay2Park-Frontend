export class Person {
    Name: string;
    Surname: string;
    Username: string;
    BirthDate: Date;
    Mail: string;

    constructor(name: string, surname: string, username: string, birthDate: Date, mail: string) {
        this.Name = name;
        this.Surname = surname;
        this.Username = username;
        this.BirthDate = birthDate;
        this.Mail = mail;
    }

}