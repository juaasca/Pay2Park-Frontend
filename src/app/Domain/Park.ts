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
        let tiempoAhora = (new Date()).getTime() * 1.66667 * 0.00001;
        let tiempo = (new Date(this.Date)).getTime() *1.66667 * 0.00001;
        return Math.floor(tiempoAhora - tiempo);
        
    }
}
