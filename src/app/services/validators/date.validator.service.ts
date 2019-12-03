import { Injectable } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class DateValidatorService {
  static initialDateLaterNow(fc: FormControl){
    var now = new Date();
    var startDate = new Date (fc.value)
    if(now >= startDate){
      return ({initialDateLaterNow: true});
    } 
    return (null);
  }

  static finalDateLater()
  { return (field: FormControl): {[key: string] : any} => {
      var startDate = new Date(field.get('InitialDateTime').value);
      var endDate = new Date(field.get('FinalDateTime').value);
      if(field.get('InitialDateTime').value < field.get('FinalDateTime').value){
        return ({finalDateLater: true});
      } else {
        return (null);
      } 
    }
  }
}
