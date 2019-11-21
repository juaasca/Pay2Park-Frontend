import { StringUtils } from '../logic/utils/string.utils';

export class Subscription {
    Identifier: string;
    Name: string;
    durationInMilliseconds: Number;
    Price: Number;

    constructor(name: string, durationInMilliseconds: Number, price: Number) {
        this.Identifier = Subscription.getIdentifier(name, durationInMilliseconds, price);
        this.Name = name;
        this.durationInMilliseconds = durationInMilliseconds;
        this.Price = price;
    }

    public static getIdentifier(name: string, durationInMilliseconds: Number, price: Number) {
        return StringUtils.getHashCode(`${name}${durationInMilliseconds}${price}`);
    }
}