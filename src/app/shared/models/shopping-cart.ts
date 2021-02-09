import { Product } from "./product";

export class ShoppingCart {
    constructor(public id?: string, public createdDate?: Date, public products?: Product[]) { }

    getQuantity(productId: string): number {
        if(!this.products) return 0;

        const item = this.products.find(product => product?.id == productId);

        if(!item?.quantity) return 0;

        return item ? item.quantity : 0;
    }

    getTotalItemsCount(): number {
        return this.products?.reduce((acc, product) => acc + (product?.quantity || 0), 0) || 0;
    }

    getTotalPrice(): number {
        let totalPrice = this.products?.reduce((acc, product) => acc + product.getTotalPrice(), 0) || 0;
        return Math.round((totalPrice + Number.EPSILON) * 100) / 100 
    }
}