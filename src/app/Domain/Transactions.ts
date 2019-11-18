export class Transactions {
    
    LicensePlate: string;
    Name: string;
    Description: string;
    constructor(licensePlate: string, name: string, desciption: string) {
        this.LicensePlate = licensePlate;
        this.Name = name;
        this.Description = desciption;
    }
}