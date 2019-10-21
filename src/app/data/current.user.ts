import { Person } from '../Domain/Person';

export class CurrentUserData {
    public static IsAdmin: boolean = false;
    public static IsChecker: boolean = false;
    public static LoggedUser: Person = null;
}