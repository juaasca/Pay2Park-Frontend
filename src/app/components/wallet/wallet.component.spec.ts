import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { CurrentUserData } from 'src/app/data/current.user';
import { WalletComponent } from './wallet.component';



describe('WalletComponent', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [WalletComponent],
      }).compileComponents();
    }));

it('saldo en cartera es 11', () => {
    let precio = CurrentUserData.getWallet();
    expect(precio).toBe(11);
})

})

