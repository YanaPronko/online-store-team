import { createProductCart, isProductInStorage, productData, PRODUCTS } from "../containers/catalog/catalog"
import { filterGoods } from "./goodsFilter"
import { isQueryParamsExist } from "./queryParams"
import { linkHandler } from "./router"

export function initSearch() : void {
  if(isSearchParamsExist()) {
    renderSearchedProducts()
  }
  const searchForm = document.querySelector('.search-field')
  const searchField = document.querySelector('.search-field__input')

  searchForm?.addEventListener('submit', (e) => {e.preventDefault()})
  searchField?.addEventListener('keyup', onSearchHandler)
}

function onSearchHandler (e: Event) {
  addSearchParams(e)
  renderSearchedProducts()
}

function addSearchParams(e: Event) {
  const target = e.target 
  const location = window.location.href;
  const url = new URL(location);
  url.searchParams.set('search',(target as HTMLInputElement).value);
  history.pushState("", "", url);
}

export function isSearchParamsExist(): boolean {
  const params = new URL(window.location.href).searchParams.get('search');  
  if(params) return true
  return false
}

function sortProducts() {   
   const params = new URL(window.location.href).searchParams.get('search')?.toLocaleUpperCase();
   const queryParams = isQueryParamsExist();   
   let dataForFilter = PRODUCTS
   
   if(queryParams && Object.keys(queryParams).length > 1) {
    dataForFilter = filterGoods(queryParams); 
   }
  
   if(params) {
    const filtered: productData[] = dataForFilter.filter((product: productData) => product.title.trim().toUpperCase().split(' ').join('').includes(params) || product.description.trim().toUpperCase().split(' ').join('').includes(params) || product.brand.trim().toUpperCase().split(' ').join('').includes(params) || product.category.trim().toUpperCase().split(' ').join('').includes(params) || product.latinCategory.trim().toUpperCase().split(' ').join('').includes(params));
    return filtered;
   }  
}

export function renderSearchedProducts() {
  const productsWrapepr = document.querySelector('.goods__wrapper');
  const searchParams = isSearchParamsExist();
  if(searchParams) {
    const sortedProducts = sortProducts()  
    if(productsWrapepr && sortedProducts) {
      productsWrapepr.innerHTML = '';
      sortedProducts.forEach((product) => {
          if (productsWrapepr) {
            const productCart = isProductInStorage(product.id) ? createProductCart(product, 'Удалить из корзины') : createProductCart(product, 'Добавить в корзину');
            if (productsWrapepr) productsWrapepr.innerHTML += productCart;
          }
        });
    }
    document.querySelectorAll('.rout-link').forEach(element => {
      element.addEventListener('click', linkHandler )
    });
  }
}
