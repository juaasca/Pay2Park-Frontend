import { Vehicle } from './Vehicle';
import { Fare } from './Fare';


export class Park {
    id: number;
    Vehicle: Vehicle;
    Street: string;
    Coordinates: [number, number];
    Date: Date;
    Fare: Fare;
    constructor(id: number, vehicle: Vehicle, street: string, coordinates: [number, number], fare: Fare) {
        this.id = id;
        this.Vehicle = vehicle;
        this.Street = street;
        this.Coordinates = coordinates;
        this.Fare = fare;
        this.Date = new Date();
    }
    
    getCurrentTime(){
        let horaInicio = this.Date.getMinutes();
        let horaActual = (new Date()).getMinutes();
        return horaActual - horaInicio;
        
    }
}
