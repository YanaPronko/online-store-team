import products from '../../files/products.json'
import { deleteProductOnMain } from '../../modules/deleteGoods'
import { updateHeaderCart } from '../../modules/updateHeader'
import { parseStorage } from '../../modules/updateStorage'
import { addQueryParams} from '../../modules/goodsFilter'
import { isQueryParamsExist } from '../../modules/queryParams'

export const PRODUCTS = products.products

export type productData = {
  id: number,
  title: string,
  description: string,
  price: number,
  rating: number,
  stock: number,
  brand: string,
  category: string,
  thumbnail: string,
  images:  string[]
}
export type item = {
  id: string;
  count: number;
}

export function createProductCart(productData :productData, btnText?: string) :string {
  return `

  <div class="good__card">
    <img src="${productData.thumbnail}" alt="photo" class="good__img">
    <div class="good__content">
        <a href="/product" class="rout-link" data-id="${productData.id }">
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
  </div>`
}

// Return string with aside,top filters and products wrappers
function createAsideBlock () :string {
  return ` <div class="wrapper"><aside class="filters filters__container">
  <form action="#" class="filter-form">
      <fieldset class="filter filter-form__categories">
          <h3 class="form-title">Категория</h3>
          <ul class="filter__list category__list">
              <li class="filter__list-item category__list-item">
                  <input id="bike" type="checkbox" data-name='category' class="filter__target filter__input category__input">
                  <label for="bike" class="filter__label category__label">Велосипеды</label>
              </li>
              <li class="filter__list-item category__list-item">
                  <input id="Childbikee" type="checkbox" data-name='category' class="filter__target filter__input category__input">
                  <label for="Childbike" class="filter__label category__label">Детские велосипеды</label>
              </li>
              <li class="filter__list-item category__list-item">
                  <input id="tricycle" type="checkbox" data-name='category' class="filter__target filter__input category__input">
                  <label for="tricycle" class="filter__label category__label">Трехколесные велосипеды</label>
              </li>
              <li class="filter__list-item category__list-item">
                  <input id="bike rack" type="checkbox" data-name='category' class="filter__target filter__input category__input">
                  <label for="bike rack" class="filter__label category__label">Велобагажники</label>
              </li>
              <li class="filter__list-item category__list-item">
                  <input id="accessory" type="checkbox" data-name='category' class="filter__target filter__input category__input">
                  <label for="accessory" class="filter__label category__label">Аксессуары</label>
              </li>
          </ul>
      </fieldset>
      <fieldset class="filter filter-form__brands">
          <h3 class="form-title">Бренд</h3>
          <ul class="filter__list brand__list">
              <li class="filter__list-item brand__list-item">
                  <input id="Skill Bike" type="checkbox" data-name='brand' class="filter__target filter__input brand__input">
                  <label for="Skill Bike" class="filter__label brand__label">Skill Bike</label>
              </li>
              <li class="filter__list-item brand__list-item">
                  <input id="KUPI_LA" type="checkbox" data-name='brand' class="filter__target filter__input brand__input">
                  <label for="KUPI_LA" class="filter__label brand__label">KUPI_LA</label>
              </li>
              <li class="filter__list-item brand__list-item">
                  <input id="BMW" type="checkbox" data-name='brand' class="filter__target filter__input brand__input">
                  <label for="BMW" class="filter__label category__label">BMW</label>
              </li>
              <li class="filter__list-item brand__list-item">
                  <input id="STELS"" type="checkbox" data-name='brand' class="filter__target filter__input brand__input">
                  <label for="STELS"" class="filter__label brand__label">STELS</label>
              </li>
              <li class="filter__list-item category__list-item">
                  <input id="MAXISCOO" type="checkbox" data-name='brand' class="filter__target filter__input brand__input">
                  <label for="MAXISCOO" class="filter__label brand__label">MAXISCOO</label>
              </li>
              <li class="filter__list-item category__list-item">
                  <input id="Tech Team" type="checkbox" data-name='brand' class="filter__target filter__input brand__input">
                  <label for="Tech Team" class="filter__label brand__label">Tech Team</label>
              </li>
              <li class="filter__list-item category__list-item">
                  <input id="Safari proff" type="checkbox" data-name='brand'  class="filter__target filter__input brand__input">
                  <label for="Safari proff" class="filter__label brand__label">Safari proff</label>
              </li>
              <li class="filter__list-item category__list-item">
                  <input id="ZIGZAG" type="checkbox" data-name='brand' class="filter__target filter__input brand__input">
                  <label for="ZIGZAG" class="filter__label brand__label">ZIGZAG</label>
              </li>
              <li class="filter__list-item category__list-item">
                  <input id="City-Ride" type="checkbox" data-name='brand' class="filter__target filter__input brand__input">
                  <label for="City-Ride" class="filter__label brand__label">City-Ride</label>
              </li>
              <li class="filter__list-item category__list-item">
                  <input id="LAMBORGHINI" type="checkbox" data-name='brand' class="filter__target filter__input brand__input">
                  <label for="LAMBORGHINI" class="filter__label brand__label">LAMBORGHINI</label>
              </li>
              <li class="filter__list-item category__list-item">
                  <input id="Sundays" type="checkbox" data-name='brand' class="filter__target filter__input brand__input">
                  <label for="Sundays" class="filter__label brand__label">Sundays</label>
              </li>
              <li class="filter__list-item category__list-item">
                  <input id="Peruzzo" type="checkbox" data-name='brand' class="filter__target filter__input brand__input">
                  <label for="Peruzzo" class="filter__label brand__label">Peruzzo</label>
              </li>
              <li class="filter__list-item category__list-item">
                  <input id="LUX" type="checkbox" data-name='brand' class="filter__target filter__input brand__input">
                  <label for="LUX" class="filter__label brand__label">LUX</label>
              </li>
              <li class="filter__list-item category__list-item">
                  <input id="Вело-рай" type="checkbox" data-name='brand' class="filter__target filter__input brand__input">
                  <label for="Вело-рай" class="filter__label brand__label">Вело-рай</label>
              </li>
              <li class="filter__list-item category__list-item">
                  <input id="Mea Signum" type="checkbox" data-name='brand' class="filter__target filter__input brand__input">
                  <label for="Mea Signum" class="filter__label brand__label">Mea Signum</label>
              </li>
              <li class="filter__list-item category__list-item">
                  <input id="Дымовой" type="checkbox" data-name='brand' class="filter__target filter__input brand__input">
                  <label for="Дымовой" class="filter__label brand__label">Дымовой</label>
              </li>
              <li class="filter__list-item category__list-item">
                  <input id="KING TONY WB" type="checkbox" data-name='brand' class="filter__target filter__input brand__input">
                  <label for="KING TONY WB" class="filter__label brand__label">KING TONY WB</label>
              </li>
          </ul>
      </fieldset>
      <fieldset class="form__price">
          <h3 class="form-title">Цена</h3>
          <div class="price-input">
              <div class="field">
                  <span>Min</span>
                  <input type="number" class="filter__target input-min" value="500">
              </div>
              <div class="separator">-</div>
              <div class="field">
                  <span>Max</span>
                  <input type="number" class="filter__target input-max" value="1500">
              </div>
          </div>
          <div class="price-slider">
              <div class="progress"></div>
          </div>
          <div class="price__range-input">
              <input type="range" class="filter__target range-min" min="0" max="2000" value="500" step="50">
              <input type="range" class="filter__target range-max" min="0" max="2000" value="1500" step="50">
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
      <button class="btn reset__btn">Сбросить</button>
      <button class="btn copy__btn">Запомнить</button>
  </div>
</aside>
<section class="catalog__wrapper">
<div class="sort__wrapper">
    <div class="sort__block">
        <p class="sort__block-name">Сортировка по названию</p>
        <div class="sort__icon sort__icon_up ico">
            <span class="material-icons">arrow_circle_up</span>
        </div>
        <div class="sort__icon sort__icon_down ico">
            <span class="material-icons">arrow_circle_down</span>
        </div>
    </div>
    <div class="sort__block">
        <p class="sort__block-name">Сортировка по цене</p>
        <div class="sort__icon sort__icon_up ico">
            <span class="material-icons">arrow_circle_up</span>
        </div>
        <div class="sort__icon sort__icon_down ico">
            <span class="material-icons">arrow_circle_down</span>
        </div>
    </div>
    <div class="sort__block">
        <p class="sort__block-name">Сортировка по популярности</p>
        <div class="sort__icon sort__icon_up ico">
            <span class="material-icons">arrow_circle_up</span>
        </div>
        <div class="sort__icon sort__icon_down ico">
            <span class="material-icons">arrow_circle_down</span>
        </div>
        <div class="sort__block">
            <div class="sort__icon view__icon ico">
                <span class="material-icons">view_list</span>
            </div>
            <div class="sort__icon view__icon ico">
                <span class="material-icons">apps</span>
            </div>
        </div>
    </div>
</div>
<div class="not__found">Извините, по вашему запросу ничего не найдено</div></div>`;
}

export function renderCatalog(/* params? : string */): void {
    const mainContent = document.querySelector('.main-content .container')
    const queryParams = isQueryParamsExist();

  if (mainContent) {
    const productsWrapepr =  document.createElement('div')
    productsWrapepr.classList.add('goods__wrapper')

    // Clear previous content and render catalog content with wrapper for goods
    mainContent.innerHTML = createAsideBlock()
    const catalowWrapper = document.querySelector('.catalog__wrapper')
    if (catalowWrapper !== null)  catalowWrapper.append(productsWrapepr)
    productsWrapepr.innerHTML = ''


      if (queryParams) {
       
      /* return */
    } else {
      Object.values(PRODUCTS).forEach((product) => {
        const productCart = isProductInStorage(product.id) ? createProductCart(product, 'Удалить из корзины') : createProductCart(product, 'Добавить в корзину')
         
        if(productsWrapepr) productsWrapepr.innerHTML += productCart
      })
    }
      productsWrapepr.addEventListener('click', onProductHandler)

      const filterForm = document.querySelector('.filter-form');
      filterForm?.addEventListener('change', (e: Event) => {
          addQueryParams(e);
        //   renderCatalog();
       /*  if (array) {
          productsWrapepr.innerHTML = '';
          array.forEach((product) => {
            if (productsWrapepr) {
              const productCart = createProductCart(product);
              if (productsWrapepr) productsWrapepr.innerHTML += productCart;
            }
          });
        } */
      });

      const pagOptions = localStorage.getItem('pagination') ? parseStorage("pagination"): [{ rows: 3, page: 0 }];
      localStorage.setItem('pagination', JSON.stringify(pagOptions));
       updateHeaderCart();
  }

}

function isProductInStorage(id : number | string) : boolean {
  let status = false
  JSON.parse(localStorage.getItem('cart') as string).forEach((element : item) => {   
    if(+id === +element.id) {
      status = true
    }
  });
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
    if((e.target as HTMLElement).tagName == 'BUTTON' ) {
      const id = (e.target as HTMLElement).getAttribute('data-id')
      if(id && !isProductInStorage(id)) addToProductToStorage(id as string)       
        toggleProductBtn(e.target as HTMLElement)
        updateHeaderCart();
    }
  }
}


function addToProductToStorage(id: string) {
  const item: item = {
    id: id,
    count: 1,
  };

   const cart: item[] = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') as string) : [];
   cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
}