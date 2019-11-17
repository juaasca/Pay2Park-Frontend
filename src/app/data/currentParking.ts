import { Park } from '../Domain/Park';

export class CurrentParkingData {
   public static park: Park;
   public static parks: Park[];
   public static parkPosition: [number, number];
}