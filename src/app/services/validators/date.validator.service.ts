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
}
