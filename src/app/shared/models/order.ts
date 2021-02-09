import { Shipping } from "./shipping";

export class Order {
    constructor(private products?: any[], private shipping?: Shipping, private createdDate: Date = new Date()) { }
}