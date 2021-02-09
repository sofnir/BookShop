import { Book } from "./book";

export class Product {        
    constructor(public id?: string, public book?: Book, public quantity?: number) {
    }

    getTotalPrice() {
        if(!this.quantity || ! this.book) return 0;
        return this.quantity * this.book?.price;
    }
}