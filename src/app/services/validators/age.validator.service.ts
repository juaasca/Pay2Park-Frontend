import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class AgeValidatorService {
  static overEighteen(fc: FormControl) {
    var today = new Date();
    var birthDate = new Date(fc.value);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth(); - birthDate.getMonth();

    if(m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){
        age--;
    }

    if (age < 18){
        return ({overEighteen: true});
    } else {
        return (null);
    }
  }
}