import { Vehicle } from './Vehicle';
import { Fare } from './Fare';
import { VirtualTimeScheduler } from 'rxjs';


export class Park {
    id: number;
    Vehicle: Vehicle;
    Street: string;
    Coordinates: [number, number];
    Fare: Fare;
    constructor(id: number, vehicle: Vehicle, street: string, coordinates: [number, number], fare: Fare) {
        this.id = id;
        this.Vehicle = vehicle;
        this.Street = street;
        this.Coordinates = coordinates;
        this.Fare = fare;
    }
    
    getCurrentTime(){
        /*let horaInicio = this.Date.getMinutes();
        console.log(this.Date);
        let horaActual = (new Date()).getMinutes();
        this.Minutes = horaActual - horaInicio;
        return this.Minutes;*/
        return 0;
    }
}
