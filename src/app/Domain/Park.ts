import { Vehicle } from './Vehicle';
import { Fare } from './Fare';
import { VirtualTimeScheduler } from 'rxjs';


export class Park {
    id: number;
    Vehicle: Vehicle;
    Street: string;
    Coordinates: [number, number];
    Fare: Fare;
    Date: string;
    constructor(id: number, vehicle: Vehicle, street: string, coordinates: [number, number], fare: Fare, date: Date) {
        this.id = id;
        this.Vehicle = vehicle;
        this.Street = street;
        this.Coordinates = coordinates;
        this.Fare = fare;
        this.Date = date.toString();
    } 
    
    getCurrentTime(){
        let horaInicio = new Date(this.Date).getMinutes();
        let horaActual = (new Date()).getMinutes();
        return horaActual - horaInicio;
        
    }
}
