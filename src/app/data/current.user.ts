import { Person } from '../Domain/Person';

export class CurrentUserData {
    public static IsAdmin: boolean = true;
    public static LoggedUser: Person = null;
}