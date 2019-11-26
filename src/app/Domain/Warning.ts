export class Warning {
    Title: string;
    Description: string;
    Location: string;
    InitalDate: Date;
    FinishDate: Date;

    constructor(title: string, description: string, location: string, initialDate: Date, finishDate: Date) {
        this.Title = title;
        this.Description = description;
        this.Location = location;
        this.InitalDate = initialDate;
        this.FinishDate = finishDate;
    }
}