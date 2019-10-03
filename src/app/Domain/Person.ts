export class Person {
    Dni: string;
    Name: string;
    Surname: string;
    Username: string;
    BirthDate: Date;
    Mail: string;

    constructor(dni: string, name: string, surname: string, username: string, birthDate: Date, mail: string) {
        this.Dni = dni;
        this.Name = name;
        this.Surname = surname;
        this.Username = username;
        this.BirthDate = birthDate;
        this.Mail = mail;
    }

}