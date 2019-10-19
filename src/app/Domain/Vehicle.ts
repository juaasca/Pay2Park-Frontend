import { Client } from './Client';

export class Vehicle {
    LicensePlate: string;
    Name: string;
    Description: string;
    OwnersEmail: string[];
    constructor(licensePlate: string, name: string, desciption: string, owner: string[]) {
        this.LicensePlate = licensePlate;
        this.Name = name;
        this.Description = desciption;
        this.OwnersEmail = owner;
    }
}