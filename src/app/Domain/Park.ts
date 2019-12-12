import { Vehicle } from './Vehicle';
import { Tariff } from './Tariff';

export class Park {
    id: number;
    VehiclePlate: string;
    Street: string;
    Coordinates: [number, number];
    Fare: Tariff;
    InitialDate: number;
    FinalDate: number;

    constructor(id: number, vehiclePlate: string, street: string, coordinates: [number, number], fare: Tariff, initialDate: number, finalDate?: number) {
        this.id = id;
        this.VehiclePlate = vehiclePlate;
        this.Street = street;
        this.Coordinates = coordinates;
        this.Fare = fare;
        this.InitialDate = new Date(initialDate).getTime();
        this.FinalDate = new Date(finalDate).getTime();
    } 
    
    getCurrentTime(){
        let tiempoAhora = (new Date()).getTime() * 1.66667 * 0.00001;
        let tiempo = new Date(this.InitialDate).getTime() *1.66667 * 0.00001;

        return Math.floor(tiempoAhora - tiempo);
    }
}
