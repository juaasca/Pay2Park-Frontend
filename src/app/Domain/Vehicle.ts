export class Vehicle {
    LicensePlate: string;
    Manufacturer: string;
    ModelName: string;
    OwnerEmail: string;
    Parked: boolean;
    
    constructor(licensePlate: string, manufacturer: string, modelName: string, ownerEmail: string) {
        this.LicensePlate = licensePlate;
        this.Manufacturer = manufacturer;
        this.ModelName = modelName;
        this.OwnerEmail = ownerEmail;
        this.Parked = false;
    }
}