import { StringUtils } from '../logic/utils/string.utils';

export class Warning {
    Identifier: String;
    Title: string;
    Description: string;
    LocationName: string;
    InitalDate: Date;
    FinishDate: Date;

    constructor(title: string, description: string, locationName: string, initialDate: Date, finishDate: Date) {
        this.Title = title;
        this.Description = description;
        this.LocationName = locationName;
        this.InitalDate = initialDate;
        this.FinishDate = finishDate;
        this.Identifier = Warning.getIdentifier(this.Title, this.Description, this.LocationName, this.InitalDate, this.FinishDate);
    }

    public static getIdentifier(title: string, description: string, locationName: string, initialDate: Date, finishDate: Date) {
        return StringUtils.getHashCode(`${title}${description}${locationName}${initialDate}${finishDate}`);
    }
}