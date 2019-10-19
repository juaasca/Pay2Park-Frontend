import { Injectable } from '@angular/core';
import { OpenALPRResult } from 'plugins/cordova-plugin-openalpr/native';

@Injectable({
  providedIn: 'root'
})
export class PruebaMatriculaService {

  public result: OpenALPRResult[] = [];
  public country: string = '';

  constructor() { }

  setData(result: OpenALPRResult[], country: string) {
    this.result = result;
    this.country = country;
  }
}
