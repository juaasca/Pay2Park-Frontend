import { Vehicle } from '../Domain/Vehicle';
import {Fare} from '../Domain/Fare';
import { Park } from '../Domain/Park';
import { ParkService } from '../services/dao/parks.service';
import { CurrentUserData } from './current.user';
export class CurrentParkingData {
   public static park: Park;
   public static parks: Park[];
   private parkService: ParkService;
   
}