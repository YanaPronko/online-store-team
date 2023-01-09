import { productData } from "../containers/catalog/catalog";
export declare const addQueryParams: (e: Event) => void;
export declare const filterGoods: (queryObj: {
    [key: string]: string;
}) => productData[];
