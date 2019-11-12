import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CurrentUserData } from '../data/current.user';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  private _color: Subject<string> = new Subject<string>();
  public color: Observable<string> = this._color.asObservable();

  constructor() {
    this.lightMode();
  }

  public changeColor(color: string) {
    CurrentUserData.color = color;
    this._color.next(color);
  }

  darkMode() {
    this.changeColor('dark');
  }

  lightMode() {
    this.changeColor('light');
  }
}
