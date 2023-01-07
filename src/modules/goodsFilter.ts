import { PRODUCTS } from "../containers/catalog/catalog";
import { productData } from "../containers/catalog/catalog";


export const filterByCategoryAndBrands = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const filterInput = target.closest('.filter__target') as HTMLInputElement;

  if (filterInput) {
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
                          (product.category.trim().toUpperCase()));
      const priceFilter = ((product.price >= minPrice) && (product.price <= maxPrice));
      const stockFilter = ((product.stock >= minStock) && (product.stock <= maxStock));

      return brandFilter && categoryFilter && priceFilter && stockFilter;
    });
    return filtered;
  }
}

const getCheckedInputs = (sel: string) => {
  const checkedInputs = Array.from(document.querySelectorAll(sel))
    .map((input) => input.id.trim().toUpperCase());
  return checkedInputs;
}
const getRangeValue =(sel:string) => {
  const input = document.querySelector(sel) as HTMLInputElement;
  return +input.value;
}