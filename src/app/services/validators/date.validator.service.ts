import { Injectable } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DateValidatorService {
  field: AbstractControl;
  static finalDateLater(date1: string, date2: string)
  { return (field:FormControl): {[key: string] : any} => {
      if(field.get(date1).value < field.get(date2).value){
        return ({finalDateLater: true});
      } else {
        return (null);
      } 
    }
  }

  static initialDateLaterNow(fc: FormControl){
    var now = new Date(Date.now());

    if(now < fc.value){
      return ({initialDateLaterNow: true});
    } else {
      return (null);
    }
  }
}
