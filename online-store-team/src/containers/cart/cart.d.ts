import { productData, item } from "../catalog/catalog";
export type count = {
    count: number;
};
export type goodInCart = productData & count;
export declare function createGoodsInCart(goodsID: item<string>[]): goodInCart[];
export declare function renderCart(): void;
