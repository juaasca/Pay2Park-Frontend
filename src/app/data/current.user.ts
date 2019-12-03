import { Person } from '../Domain/Person';

export class CurrentUserData {
    public static IsAdmin: boolean = false;
    public static IsChecker: boolean = false;
    public static CurrentPosition: [number, number];
    public static CurrentStreet : string;
    public static LoggedUser: Person = null;
    public static price : string = null;
    public static DuracionBono: number = 0;
    public static color : string = 'light';
    public static wallet : number = 0;
    public static motivo : string = "";

    public static getCurrentPosition(){
       return this.CurrentPosition = [39.482638, -0.348196];
    }
    public static getCalle(){
        let calle = 'Escuela Técnica Superior de Ingeniería Informática';
        return calle;
    }

    public static getWallet(){
        return this.wallet;
    }
}