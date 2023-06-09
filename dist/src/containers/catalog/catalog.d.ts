export declare const PRODUCTS: {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    latinCategory: string;
    thumbnail: string;
    images: string[];
}[];
export declare const filteredProducts: productData[];
export type productSortData = {
    [key: string]: string | number | string[];
};
export type productData = {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    latinCategory: string;
    thumbnail: string;
    images: string[];
};
export type item<T> = {
    id: T;
    count: number;
};
export type productId = number | string;
export declare function createProductCart(productData: productData, btnText?: string): string;
export declare function renderCatalog(): void;
export declare function isProductInStorage(id: productId): boolean;
export declare function onProductHandler(e: Event): void;
export declare function onBuyNowHandler(e: Event): void;
