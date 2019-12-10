import { StringUtils } from '../logic/utils/string.utils';
import { WarningType } from './WarningType';

export class Warning {
    Identifier: String;
    Title: string;
    Description: string;
    InitialDate: Date;
    FinishDate: Date;
    WarningType: WarningType;

    constructor(title: string, description: string, initialDate: Date, finishDate: Date, warningType: WarningType) {
        this.Title = title;
        this.Description = description;
        this.InitialDate = initialDate;
        this.FinishDate = finishDate;
        this.WarningType = warningType;
        this.Identifier = Warning.getIdentifier(this.Title, this.Description, this.InitialDate, this.FinishDate, this.WarningType);
    }

    public static getIdentifier(title: string, description: string, initialDate: Date, finishDate: Date, warningType: WarningType) {
        return StringUtils.getHashCode(`${title}${description}${initialDate}${finishDate}${warningType}`);
    }
}