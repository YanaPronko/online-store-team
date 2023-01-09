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
export type item = {
    id: string;
    count: number;
};
export declare function createProductCart(productData: productData, btnText?: string): string;
export declare function renderCatalog(): void;
export declare function isProductInStorage(id: number | string): boolean;
export declare function onProductHandler(e: Event): void;
export declare function onBuyNowHandler(e: Event): void;
