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

    public Equals(otherTariff: Tariff) {
        return this.Description === otherTariff.Description && this.Duration === otherTariff.Duration
            && this.Identifier === otherTariff.Identifier && this.IsRealTime === otherTariff.IsRealTime
            && this.Price === otherTariff.Price;
    }
}