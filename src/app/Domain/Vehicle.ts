export class Vehicle {
    LicensePlate: string;
    Manufacturer: string;
    ModelName: string;
    OwnerEmail: string;

    constructor(licensePlate: string, manufacturer: string, modelName: string, ownerEmail: string) {
        this.LicensePlate = licensePlate;
        this.Manufacturer = manufacturer;
        this.ModelName = modelName;
        this.OwnerEmail = ownerEmail;
    }
}