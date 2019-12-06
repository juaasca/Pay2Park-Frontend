import { StringUtils } from '../logic/utils/string.utils';

export class Warning {
    Identifier: String;
    Title: string;
    Description: string;
    InitalDate: Date;
    FinishDate: Date;

    constructor(title: string, description: string, initialDate: Date, finishDate: Date) {
        this.Title = title;
        this.Description = description;
        this.InitalDate = initialDate;
        this.FinishDate = finishDate;
        this.Identifier = Warning.getIdentifier(this.Title, this.Description, this.InitalDate, this.FinishDate);
    }

    public static getIdentifier(title: string, description: string, initialDate: Date, finishDate: Date) {
        return StringUtils.getHashCode(`${title}${description}${initialDate}${finishDate}`);
    }
}