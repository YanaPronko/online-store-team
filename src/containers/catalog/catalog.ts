import products from '../../files/products.json'
import { deleteProductOnMain } from '../../modules/deleteGoods'
import modal from "../../modules/modal";
import { updateHeaderCart } from '../../modules/updateHeader'
import { parseStorage } from '../../modules/updateStorage'
import { renderCart } from '../cart/cart'
import { renderProducts } from '../../modules/renderProducts'
import { addQueryParams} from '../../modules/goodsFilter'
import { initSearch } from '../../modules/search';
import { copyQueryParams } from '../../modules/queryParams';
import { changeGoodsView } from '../../modules/changeGoodsView';

export const PRODUCTS = products.products
const BRANDS = ['Skill Bike','KUPI_LA','BMW','STELS','MAXISCOO','Tech Team','Safari proff','ZIGZAG','City-Ride','LAMBORGHINI',
'Sundays','Peruzzo','LUX', 'Вело-рай','Mea Signum','Дымовой','KING TONY WB']
export const filteredProducts: productData[] = []

export type productSortData = {
  [key:string]:string | number | string[],

}
export type productData = {
  id: number,
  title: string,
  description: string,
  price: number,
  rating: number,
  stock: number,
  brand: string,
  category: string,
  latinCategory: string
  thumbnail: string,
  images:  string[]
}

export type item<T> = {
  id: T;
  count: number;
}

export type productId = number | string

export function createProductCart(productData :productData, btnText?: string) :string {
    return `
  <div class="good__card">
    <img src="${productData.thumbnail}" alt="photo" class="good__img">
    <div class="good__content">
        <a href="/product" class="rout-link" data-id="${productData.id}">
            <div class="good__title">${productData.title}</div>
        </a>
        <div class="good__rating">
            <span class="star active material-icons ico">star_rate</span>
            <span class="star active material-icons ico">star_rate</span>
            <span class="star active material-icons ico">star_rate</span>
            <span class="star active material-icons ico">star_rate</span>
            <span class="star  material-icons ico">star_rate</span>
        </div>
        <div class="good__footer">
            <div class="good__price">${productData.price}<span>BYN</span></div>
            <button class="btn add-btn" data-id="${productData.id}">${btnText}</button>
        </div>
    </div>
  </div>`;
}

// Return string with aside,top filters and products wrappers
function createAsideBlock () :string {
  return ` <div class="wrapper"><aside class="filters filters__container">
  <form action="#" class="filter-form">
      <fieldset class="filter filter-form__categories">
          <h3 class="form-title">Категория</h3>
          <ul class="filter__list category__list">
              <li class="filter__list-item category__list-item">
                  <input id="BIKE" type="checkbox" data-name='category' class="filter__target filter__input category__input">
                  <label for="BIKE" class="filter__label category__label">Велосипеды</label>
              </li>
              <li class="filter__list-item category__list-item">
                  <input id="CHILDBIKE" type="checkbox" data-name='category' class="filter__target filter__input category__input">
                  <label for="CHILDBIKE" class="filter__label category__label">Детские велосипеды</label>
              </li>
              <li class="filter__list-item category__list-item">
                  <input id="TRICYCLE" type="checkbox" data-name='category' class="filter__target filter__input category__input">
                  <label for="TRICYCLE" class="filter__label category__label">Трехколесные велосипеды</label>
              </li>
              <li class="filter__list-item category__list-item">
                  <input id="BIKERACK" type="checkbox" data-name='category' class="filter__target filter__input category__input">
                  <label for="BIKERACK" class="filter__label category__label">Велобагажники</label>
              </li>
              <li class="filter__list-item category__list-item">
                  <input id="ACCESSORY" type="checkbox" data-name='category' class="filter__target filter__input category__input">
                  <label for="ACCESSORY" class="filter__label category__label">Аксессуары</label>
              </li>
          </ul>
      </fieldset>
      <fieldset class="filter filter-form__brands">
          <h3 class="form-title">Бренд</h3>
          <ul class="filter__list brand__list">
          </ul>
      </fieldset>
      <fieldset class="form__price">
          <h3 class="form-title">Цена</h3>
          <div class="price-input">
              <div class="field">
                  <span>Min</span>
                  <input type="number" class="filter__target input-min" value="0">
              </div>
              <div class="separator">-</div>
              <div class="field">
                  <span>Max</span>
                  <input type="number" class="filter__target input-max" value="2000">
              </div>
          </div>
          <div class="price-slider">
              <div class="progress"></div>
          </div>
          <div class="price__range-input">
              <input type="range" class="filter__target range-min" min="0" max="2000" value="0" step="50">
              <input type="range" class="filter__target range-max" min="0" max="2000" value="2000" step="50">
          </div>
      </fieldset>
      <fieldset class="form__stock">
          <h3 class="form-title">Количество на складе</h3>
          <div class="stock-input">
              <div class="field">
                  <span>Min</span>
                  <input type="number" class="filter__target input-min" value="0">
              </div>
              <div class="separator">-</div>
              <div class="field">
                  <span>Max</span>
                  <input type="number" class="filter__target input-max" value="100">
              </div>
          </div>
          <div class="stock-slider">
              <div class="progress"></div>
          </div>
          <div class="stock__range-input">
              <input type="range" class="filter__target range-min" min="0" max="100" value="0" step="5">
              <input type="range" class="filter__target range-max" min="0" max="100" value="100" step="5">
          </div>
      </fieldset>
  </form>
  <div class="filter__buttons">
      <a href="/" class="rout-link btn link__reset"
      <button class="btn reset__btn">Сбросить</button>
      </a>
      <button class="btn copy__btn">Запомнить</button>
  </div>
</aside>
<section class="catalog__wrapper">
<div class="sort__wrapper">
    <div class="sort__block">
        <p class="sort__block-name">Сортировка по названию</p>
        <div class="sort__icon sort__icon_up ico">
            <span class="material-icons" id="sortByNameUp">arrow_circle_up</span>
        </div>
        <div class="sort__icon sort__icon_down ico">
            <span class="material-icons" id="sortByNameDown">arrow_circle_down</span>
        </div>
    </div>
    <div class="sort__block">
        <p class="sort__block-name">Сортировка по цене</p>
        <div class="sort__icon sort__icon_up ico">
            <span class="material-icons" id="sortByPriceUp">arrow_circle_up</span>
        </div>
        <div class="sort__icon sort__icon_down ico">
            <span class="material-icons" id="sortByPriceDown">arrow_circle_down</span>
        </div>
        <div class="sort__block">
        <div data-view="list" class="sort__icon filter__target view__icon ico">
            <span class="material-icons">view_list</span>
        </div>
        <div data-view="grid" class="sort__icon filter__target view__icon ico">
            <span class="material-icons">apps</span>
        </div>
    </div>
    </div>
</div>
<div class="not__found">Извините, по вашему запросу ничего не найдено</div>
</div>`;
}

function appendBrends() {
  const brandList = document.querySelector('.brand__list')
  if(brandList) {
    BRANDS.map(brand => {
      const li = `
        <li class="filter__list-item brand__list-item">
          <input id="${brand.split(' ').join('').toUpperCase()}" type="checkbox" data-name='brand' class="filter__target filter__input brand__input">
          <label for="SKILBIKE" class="filter__label brand__label">${brand}</label>
      </li>
      `
      brandList.innerHTML += li
    })
  }
}

export function renderCatalog(/* params? : string */): void {

    const mainContent = document.querySelector('.main-content .container')

    if (mainContent) {
        const productsWrapepr = document.createElement('div')
        productsWrapepr.classList.add('goods__wrapper');
        productsWrapepr.setAttribute("data-temp", "grid");

        // Clear previous content and render catalog content with wrapper for goods
        mainContent.innerHTML = createAsideBlock()
        appendBrends()
        const catalowWrapper = document.querySelector('.catalog__wrapper')
        if (catalowWrapper !== null) catalowWrapper.append(productsWrapepr)
        productsWrapepr.innerHTML = ''
        renderProducts();
        initSearch()
        const copyParamsBtn = document.querySelector(".copy__btn");
        if (copyParamsBtn) copyParamsBtn.addEventListener("click", (e: Event) => {
            copyQueryParams(e);
        });

        const viewBtns = document.querySelectorAll("[data-view]");
          if(viewBtns) viewBtns.forEach(item => {
              item.addEventListener("click", (e: Event) => {
                changeGoodsView(e, productsWrapepr);
              });
        });

        const filterForm = document.querySelector('.filter-form');

        if (filterForm) {
            filterForm.addEventListener('change', (e: Event) => {
                addQueryParams(e);
                renderProducts();
                initSearch()
            });
        }
        setSortListeners()
        const pagOptions = localStorage.getItem('pagination') ? parseStorage("pagination") : [{ rows: 3, page: 0 }];
        localStorage.setItem('pagination', JSON.stringify(pagOptions));
        updateHeaderCart();
    }
}

export function isProductInStorage(id : productId) : boolean {
  let status = false
  if(localStorage.getItem('cart')) {
    JSON.parse(localStorage.getItem('cart') as string).forEach((element : item<string>) => {
      if(+id === +element.id) {
        status = true
      }
    });
  }
  return status
}

function toggleProductBtn (btn: HTMLElement) {
  const id = btn.getAttribute('data-id')
  if(btn.innerHTML === 'Удалить из корзины' && id !== null) {
    deleteProductOnMain(id)
    btn.innerHTML = 'Добавить в корзину'
  }
  if(id && isProductInStorage(id)) {
    btn.innerHTML = 'Удалить из корзины'
  }

}

export function onProductHandler(e:Event) {
  if(e.target) {
    if((e.target as HTMLElement).className == 'btn product-btn' || (e.target as HTMLElement).className == 'btn add-btn') {

      const id = (e.target as HTMLElement).getAttribute('data-id')
      if(id && !isProductInStorage(id)) addToProductToStorage(id as string)
        toggleProductBtn(e.target as HTMLElement)
        updateHeaderCart();
    }
  }
}

export function onBuyNowHandler(e:Event) {
  if(e.target) {
    if((e.target as HTMLElement).className == 'btn buy-btn' ) {
      const id = (e.target as HTMLElement).getAttribute('data-id')
      if(id && !isProductInStorage(id)) {
        addToProductToStorage(id as string)
      }
      renderCart();
      modal()
    }
  }
}

function addToProductToStorage(id: string) {
    const item: item<string> = {
        id: id,
        count: 1,
    };
    const cart: item<string>[] = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') as string) : [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function sortUp(field:string) {
  return (a:productSortData, b:productSortData) => a[field] > b[field] ? 1 : -1;
}

function sortDown(field:string) {
  return (a:productSortData, b:productSortData) => a[field] < b[field] ? 1 : -1;
}

function sortByTitleUp(field:string) {
  PRODUCTS.sort(sortUp(field))
  renderCatalog()
}

function sortByTitleDown(field:string) {
  PRODUCTS.sort(sortDown(field))
  renderCatalog()
}

function sortByPriceUp(field:string) {
  PRODUCTS.sort(sortUp(field))
  renderCatalog()
}

function sortByPriceDown(field:string) {
  PRODUCTS.sort(sortDown(field))
  renderCatalog()
}

function setSortListeners () {
  document.querySelector('#sortByNameUp')?.addEventListener('click',() => { sortByTitleUp('title')})
  document.querySelector('#sortByNameDown')?.addEventListener('click',() => { sortByTitleDown('title')})
  document.querySelector('#sortByPriceUp')?.addEventListener('click',() => { sortByPriceUp('price')})
  document.querySelector('#sortByPriceDown')?.addEventListener('click',() => { sortByPriceDown('price')})
}

