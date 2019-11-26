import { StringUtils } from '../logic/utils/string.utils';

export class Subscription {
    Identifier: string;
    Name: string;
    DurationInMilliseconds: number;
    DurationInDays: number;
    Price: number;
    IsMultiCar: boolean;

    constructor(name: string, durationInDays: number, price: number, isMultiCar: boolean) {
        this.Name = name;
        this.DurationInDays = durationInDays;
        this.DurationInMilliseconds = durationInDays * 86400000;
        this.Price = price;
        this.IsMultiCar = isMultiCar;
        this.Identifier = Subscription.getIdentifier(this.Name, this.DurationInDays, this.DurationInMilliseconds, this.Price, this.IsMultiCar);
    }

    public static getIdentifier(name: string, durationInDays: number, durationInMilliseconds: number, price: number, isMultiCar: boolean) {
        return StringUtils.getHashCode(`${name}${durationInDays}${durationInMilliseconds}${price}${isMultiCar}`);
    }

    public Equals(otherSubscription: Subscription) {
        return this.Name === otherSubscription.Name && this.DurationInDays === otherSubscription.DurationInDays
            && this.DurationInMilliseconds === otherSubscription.DurationInMilliseconds && this.Price === otherSubscription.Price
            && this.IsMultiCar === otherSubscription.IsMultiCar && this.Identifier === otherSubscription.Identifier;
    }
}