import { TestBed } from '@angular/core/testing';

import { ClientsService } from '../clients.service';

import * as firebase from "@firebase/testing";
import { Client } from 'src/app/Domain/Client';

describe('ClientServiceTestingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('Client should be created', async () => {
    const service: ClientsService = TestBed.get(ClientsService);
    
    const app = firebase.initializeAdminApp({
      databaseName: "test-database"
    });

    service.setDatabase(app.database());

    var client = new Client("Carlos", "carzaza", new Date(Date.now()), "testmail@mail.es", +0, +0);
    
    await service.addEntityAsync(client.Email, client);

    var clientInDatabase = await service.getEntityAsync(client.Email);
    expect(clientInDatabase).toBe(client);
  });
});
