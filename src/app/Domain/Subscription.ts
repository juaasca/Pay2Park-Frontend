import { StringUtils } from '../logic/utils/string.utils';

export class Subscription {
    Identifier: string;
    Name: string;
    durationInMilliseconds: Number;
    Price: Number;
    IsMultiCar: boolean;

    constructor(name: string, durationInMilliseconds: Number, price: Number, isMultiCar: boolean) {
        this.Identifier = Subscription.getIdentifier(name, durationInMilliseconds, price, isMultiCar);
        this.Name = name;
        this.durationInMilliseconds = durationInMilliseconds;
        this.Price = price;
        this.IsMultiCar = isMultiCar;
    }

    public static getIdentifier(name: string, durationInMilliseconds: Number, price: Number, isMultiCar: boolean) {
        return StringUtils.getHashCode(`${name}${durationInMilliseconds}${price}${isMultiCar}`);
    }
}