import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { ParkComponent } from './park.component';
import { CurrentUserData } from 'src/app/data/current.user';



describe('ParkComponent', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ParkComponent],
      }).compileComponents();
    }));

it('obtener coordenadas', () => {
    const posicion = [39.482638, -0.348196];
    expect(CurrentUserData.getCurrentPosition()).toEqual(posicion);
});
it('obtener calle', () => {
    let calle = 'Escuela Técnica Superior de Ingeniería Informática';
    expect(CurrentUserData.getCalle()).toEqual(calle);
})

})

