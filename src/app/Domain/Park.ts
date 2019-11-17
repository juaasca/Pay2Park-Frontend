import { Vehicle } from './Vehicle';
import { Tariff } from './Tariff';

export class Park {
    id: number;
    Vehicle: Vehicle;
    Street: string;
    Coordinates: [number, number];
    Fare: Tariff;
    Date: string;
    Paid: boolean;
    constructor(id: number, vehicle: Vehicle, street: string, coordinates: [number, number],
         fare: Tariff, date: string) {
        this.id = id;
        this.Vehicle = vehicle;
        this.Street = street;
        this.Coordinates = coordinates;
        this.Fare = fare;
        this.Date = date;
    } 
    
    getCurrentTime(){
        let tiempoAhora = (new Date()).getTime() * 1.66667 * 0.00001;
        let tiempo = (new Date(this.Date)).getTime() *1.66667 * 0.00001;
        console.log()
        return Math.floor(tiempoAhora - tiempo);
        
    }
}
