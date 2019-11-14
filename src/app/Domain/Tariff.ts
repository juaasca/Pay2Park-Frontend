import { StringUtils } from '../logic/utils/string.utils';

export class Tariff {
    Identifier: string;
    IsRealTime : boolean;
    Duration : number;
    Description : string;
    Price : number;

    constructor(isRealTime : boolean, description : string, price : number, duration : number) {
        this.Identifier = Tariff.getIdentifier(isRealTime, description, price, duration);
        this.IsRealTime = isRealTime;
        this.Description = description;
        this.Price = price;
        this.Duration = duration;
    }

    public static getIdentifier(isRealTime: boolean, description: string, price: number, duration: number) {
        return StringUtils.getHashCode(`${isRealTime}${description}${price}${duration}`);
    }
}