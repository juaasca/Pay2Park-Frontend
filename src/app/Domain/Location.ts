import { Warning } from './Warning';

export class Location {
    Name: string;
    Warnings: Warning[];

    constructor(name: string){
        this.Name = name;
        this.Warnings = [];
    }

    setWarnings(warnings: Warning[]) {
        this.Warnings = warnings;
    }

    addWarning(warning: Warning) {
        if (this.Warnings === undefined) {
            this.Warnings = [warning];
        } else {
            this.Warnings.push(warning);
        }
    }

    removeWarning(warning: Warning) {
        var warningPosition = this.Warnings.indexOf(warning);
        this.Warnings.splice(warningPosition, 1);
    }
}