
// import { PRODUCTS } from "../containers/catalog/catalog";
// import { productData } from "../containers/catalog/catalog";

import { isQueryParamsExist } from "./queryParams";

const setParam = (arr: string[], paramName: string, queryObj:{[key: string]:string}) => {
  if (arr) queryObj[paramName] = arr.join(", ");
};

/* const stringifySearch = (search: {[key: string]:string}) => {
  return Object.entries(search)
    .reduce((t, v) => `${t}${v[0]}=${encodeURIComponent(v[1])}&`,
    '');
}; */

export const addQueryParams = (e: Event) => {

  const target = e.target as HTMLInputElement;
  const filterInput = target.closest('.filter__target') as HTMLInputElement;
  if (filterInput) {
    const queryObject: { [key: string]: string } = {};

    const checkedBrands = getCheckedInputs('.brand__input:checked');
    const checkedCategory = getCheckedInputs('.category__input:checked');
    const minPrice = getRangeValue('.price-input .input-min');
    const maxPrice = getRangeValue('.price-input .input-max');
    const minStock = getRangeValue('.stock-input .input-min');
    const maxStock = getRangeValue('.stock-input .input-max');

    setParam(checkedCategory, 'category', queryObject);
    setParam(checkedBrands, 'brand', queryObject);
    setParam([`${minPrice}`, `${maxPrice}`], 'price', queryObject);
    setParam([`${minStock}`, `${maxStock}`], 'stock', queryObject);

    // const search = stringifySearch(queryObject);

    const location = window.location.href;
    const url = new URL(location);


    for (const [k, v] of Object.entries(queryObject)) {
      url.searchParams.set(k, encodeURIComponent(v));
    }
    // url.searchParams.set("", JSON.stringify(queryObject));
    history.pushState("", "", url);
  }
}


export const filterGoods = () => {
  const parseQueryObj = isQueryParamsExist();
  console.log({ parseQueryObj });

  /* if (filterInput) {
    const checkedBrands = getCheckedInputs(".brand__input:checked");
    const checkedCategory = getCheckedInputs(".category__input:checked");
    const minPrice = getRangeValue('.price-input .input-min');
    const maxPrice = getRangeValue('.price-input .input-max');
    const minStock = getRangeValue('.stock-input .input-min');
    const maxStock = getRangeValue('.stock-input .input-max');

    const filtered: productData[] = PRODUCTS.filter((product: productData) => {
      const brandFilter = !checkedBrands.length || checkedBrands.includes(
        (product.brand.trim().toUpperCase()));
      const categoryFilter = !checkedCategory.length || checkedCategory.includes(
        (product.latinCategory.trim().toUpperCase()));
      const priceFilter = ((product.price >= minPrice) && (product.price <= maxPrice));
      const stockFilter = ((product.stock >= minStock) && (product.stock <= maxStock));

      return brandFilter && categoryFilter && priceFilter && stockFilter;
    });
    return filtered;
  } */
}

  const getCheckedInputs = (sel: string) => {
    const checkedInputs = Array.from(document.querySelectorAll(sel))
      .map((input) => input.id.trim().toUpperCase());
    return checkedInputs;
  };

  const getRangeValue = (sel: string) => {
    const input = document.querySelector(sel) as HTMLInputElement;
    return +input.value;
  };
