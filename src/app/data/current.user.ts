import { Person } from '../Domain/Person';

export class CurrentUserData {
    public static IsAdmin: boolean = false;
    public static IsChecker: boolean = false;
    public static CurrentPosition: [number, number];
    public static CurrentStreet : string;
    public static LoggedUser: Person = null;
    public static price : string = null;
<<<<<<< HEAD
    public static DuracionBono: number = null;
=======
    public static color : string = 'light';
    public static wallet : number = 11;
>>>>>>> master
}