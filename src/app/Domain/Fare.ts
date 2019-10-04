export class Fare {
    IsRealTime : boolean;
    Duration : number;
    Description : string;
    Price : number;

    constructor(isRealTime : boolean, description : string, price : number, duration : number) {
        this.IsRealTime = isRealTime;
        this.Description = description;
        this.Price = price;
        this.Duration = duration;
    }
}