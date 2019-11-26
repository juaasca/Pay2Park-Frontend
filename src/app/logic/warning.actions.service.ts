import { Injectable } from '@angular/core';
import { Location } from '../Domain/Location';
import { WarningService } from '../services/dao/warning.service';

@Injectable({
    providedIn: 'root'
})

export class WarningActionsService {
    constructor(private warningsService: WarningService) { }

    getWarningsByLocationAsync(location: Location) {
        return this.warningsService.getEntitiesAsync()
            .then((warnings) => {
                return warnings.filter((warning) => warning.Location === location.Name)
            });
    }
}