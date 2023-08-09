import { PRODUCTS } from "../containers/catalog/catalog"
import { productData } from "../containers/catalog/catalog"

const setParam = (arr: string[]| undefined, paramName: string, queryObj:{[key: string]:string}) => {
  if (arr) queryObj[paramName] = arr.join(",");
};

export const addQueryParams = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const filterInput = target.closest('.filter__target') as HTMLInputElement;
  const goodsWrap = document.querySelector('.goods__wrapper') as HTMLElement;
  if (filterInput && goodsWrap) {
    const queryObject: { [key: string]: string } = {};
    const view: string | undefined = goodsWrap.dataset.temp;

    if (view) {
      const viewParam = view.split('');
      const checkedBrands = getInputsID('.brand__input:checked');
      const checkedCategory = getInputsID('.category__input:checked');
      const minPrice = getRangeValue('.price-input .input-min');
      const maxPrice = getRangeValue('.price-input .input-max');
      const minStock = getRangeValue('.stock-input .input-min');
      const maxStock = getRangeValue('.stock-input .input-max');

      setParam(viewParam, 'view', queryObject);
      setParam(checkedCategory, 'category', queryObject);
      setParam(checkedBrands, 'brand', queryObject);
      setParam([`${minPrice}`, `${maxPrice}`], 'price', queryObject);
      setParam([`${minStock}`, `${maxStock}`], 'stock', queryObject);

      const location = window.location.href;
      const url = new URL(location);
      for (const [k, v] of Object.entries(queryObject)) {
        url.searchParams.set(k, v);
      }
      history.pushState('', '', url);
    }
  }
}

const changeRangeProgress = (
  val: string[],
  minRange: HTMLInputElement | null,
  maxRange: HTMLInputElement | null,
  minInput: HTMLInputElement | null,
  maxInput: HTMLInputElement | null,
  range: HTMLElement | null,
  gap: number
) => {
  const valueGap = gap;
  const minVal = parseInt(val[0]),
    maxVal = parseInt(val[1]);

  if (maxVal - minVal < valueGap) {
    if (minRange) minRange.value = `${maxVal - valueGap}`;
    if (maxRange) maxRange.value = `${minVal + valueGap}`;
  } else {
    if (minInput) minInput.value = `${minVal}`;
    if (maxInput) maxInput.value = `${maxVal}`;
    if (range && minRange && maxRange) {
      range.style.left = (minVal / +minRange.max) * 100 + '%';
      range.style.right = 100 - (maxVal / +maxRange.max) * 100 + '%';
    }
  }
};

const addCheckMark = (brands: string[], categories: string[], price: string[], stock: string[], view: string[]) => {
  const goodsWrap = document.querySelector('.goods__wrapper') as HTMLElement;
  goodsWrap.dataset.temp = view.join('');

  const brandsID = getInputsID('.brand__input');
  const categoriesID = getInputsID('.category__input');
  const rangePrice = document.querySelector<HTMLElement>('.price-slider .progress');
  const rangeStock = document.querySelector<HTMLElement>('.stock-slider .progress');


  const minPriceInput = document.querySelector<HTMLInputElement>('.price-input .input-min');
  const maxPriceInput = document.querySelector<HTMLInputElement>('.price-input .input-max');

  const minPriceRange = document.querySelector<HTMLInputElement>('.price__range-input .range-min');
  const maxPriceRange = document.querySelector<HTMLInputElement>('.price__range-input .range-max');

  const minStockInput = document.querySelector<HTMLInputElement>('.stock-input .input-min');
  const maxStockInput = document.querySelector<HTMLInputElement>('.stock-input .input-max');

  const minStockRange = document.querySelector<HTMLInputElement>('.stock__range-input .range-min');
  const maxStockRange = document.querySelector<HTMLInputElement>('.stock__range-input .range-max');

  if (minPriceInput) minPriceInput.value = price[0];
  if (minPriceRange) minPriceRange.value = price[0];
  if (maxPriceInput) maxPriceInput.value = price[1];
  if (maxPriceRange) maxPriceRange.value = price[1];

  if (minStockInput) minStockInput.value = stock[0];
  if (minStockRange) minStockRange.value = stock[0];
  if (maxStockInput) maxStockInput.value = stock[1];
  if (maxStockRange) maxStockRange.value = stock[1];

  changeRangeProgress(price, minPriceRange, maxPriceRange, minPriceInput, maxPriceInput, rangePrice, 200);
  changeRangeProgress(stock, minStockRange, maxStockRange, minStockInput, maxStockInput, rangeStock, 10);

  const checkedBrandID = brandsID.filter((brand) => brands.includes(brand));
  const checkedCategoryID = categoriesID.filter((category) => categories.includes(category));

  checkedBrandID.forEach((id) => {
    console.log(id);
    const input = document.getElementById(`${id.toUpperCase()}`) as HTMLInputElement;
    if (input) input.checked = true;
  });

  checkedCategoryID.forEach((id) => {
    const input = document.getElementById(`${id.trim().toUpperCase().split(' ').join('')}`) as HTMLInputElement;
    if (input) input.checked = true;
  });
}

export const filterGoods = (queryObj: { [key: string]: string }) => {
  const categories = queryObj.category.split('%2C').filter((item) => item);
  const brands = queryObj.brand.split('%2C').filter(item => item);
  const price = queryObj.price.split('%2C').filter((item) => item);
  const stock = queryObj.stock.split('%2C').filter((item) => item);
  const view = queryObj.view.split('%2C').filter((item) => item);

  addCheckMark(brands, categories, price, stock, view);

  const filtered: productData[] = PRODUCTS.filter((product: productData) => {
    const brandFilter = !brands.length || brands.includes(product.brand.trim().toUpperCase().split(' ').join(''));
    const categoryFilter = !categories.length || categories.includes(product.latinCategory.trim().toUpperCase().split(' ').join(''));
    const priceFilter = product.price >= +price[0] && product.price <= +price[1];
    const stockFilter = product.stock >= +stock[0] && product.stock <= +stock[1];

    return brandFilter && categoryFilter && priceFilter && stockFilter;
  });
  return filtered;
};

const getInputsID = (sel: string) => {
  const checkedInputs = Array.from(document.querySelectorAll(sel))
      .map((input) => input.id.trim().toUpperCase().split(' ').join(''));
  return checkedInputs;
};

const getRangeValue = (sel: string) => {
  const input = document.querySelector(sel) as HTMLInputElement;
  return +input.value;
};
