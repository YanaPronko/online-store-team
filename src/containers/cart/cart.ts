import { PRODUCTS } from "../product/product";
import { productData, item } from "../product/product";
import modal from "../../modules/modal";
import { deleteProductFromCart } from "../../modules/deleteGoods";


export type count = {
  count: number;
}

export type goodInCart = productData & count ;

export function renderCart(): void {
  const goodsID: item[] = JSON.parse(localStorage.getItem('cart') as string);
  const goodsInCart: goodInCart[] = [];

  if (!goodsID || goodsID.length === 0) {
    renderEmptyCart();
  } else {
    for (let i = 0; i < goodsID.length; i++) {
      const item = PRODUCTS.find((good) => good.id === +goodsID[i].id);
      const count = +goodsID[i].count;
      if (item) {
        const good: goodInCart = { ...item, count };
        goodsInCart.push(good);
      }
    }
    renderCartWithGoods(goodsInCart);
  }
}

function renderEmptyCart(): void {
  const emptyCart = createEmptyCart();
  const wrapper = document.querySelector('.wrapper');
  if (wrapper) {
    wrapper.innerHTML = '';
    wrapper.append(emptyCart);
  }
}

function renderCartWithGoods(arrayOfGoods: goodInCart[]): void {
  const wrapper = document.querySelector('.wrapper');
  const cart = createCart(arrayOfGoods);
  if (wrapper) {
    wrapper.innerHTML = '';
    wrapper.append(cart);
  }
  const deleteBtns = document.querySelectorAll<HTMLButtonElement>('.delete-btn');
  deleteBtns.forEach((item) => {
    item.addEventListener('click', deleteProductFromCart);
  });

  const buyBtn = document.querySelector('.buy-now');
  if (buyBtn) {
    buyBtn.addEventListener('click', () => modal());
  }
}


function createEmptyCart(): HTMLDivElement {
  const cartBody = document.createElement('div');
  cartBody.classList.add('section-cart__body');
  cartBody.innerHTML = `
    <h1 class="cart__subtitle">Корзина пуста!</h1>
    `;
  return cartBody;
}

function createCart(goodsInCart: goodInCart[]): HTMLDivElement {
  const cartBody = document.createElement('div');
  cartBody.classList.add('section-cart__body');
  cartBody.innerHTML = `
    <h1 class="cart__subtitle">Корзина товаров:</h1>
    `;

  const mainCartSection = document.createElement('section');
  mainCartSection.classList.add('main-cart');
  mainCartSection.innerHTML = `
    <header class="cart-header grid">
      <div class="cart-header__title">наименование</div>
      <div class="cart-header__count">количество</div>
      <div class="cart-header__cost">стоимость</div>
    </header>
  `;
  goodsInCart.forEach((item) => {
    const product = createProductSection(item);
    mainCartSection.append(product);
  });
  const footer = createCartFooter(goodsInCart);
  mainCartSection.innerHTML += footer;
  cartBody.append(mainCartSection);
  return cartBody;
}

function createProductSection(productData: goodInCart): HTMLElement {
  const productSection = document.createElement("section");
  productSection.classList.add("product", "grid");
  productSection.setAttribute('data-id', `${productData.id}`);
  productSection.innerHTML = `
      <div class="product__img">
        <img src=${productData.thumbnail} alt="Велосипед Skill Bike">
      </div>
      <div class="product__title">${productData.title}</div>
      <div class="product__count">
        <div class="count">
          <div class="count__box">
            <span class="count__span">${productData.count}</span>
          </div>
          <div class="count__controls">
            <button type="button" class="count__up">
              <span class="material-icons">arrow_circle_up</span>
            </button>
            <button type="button" class="count__down">
              <span class="material-icons">arrow_circle_down</span>
            </button>
          </div>
        </div>
      </div>
      <div class="product__price">${productData.price} BYN</div>
  `;
  const controls = createDeleteBtns(productData);
  productSection.append(controls);
  return productSection;
}

function createDeleteBtns(product: goodInCart): HTMLDivElement {
  const productControls = document.createElement("div");
  productControls.classList.add('product__controls');
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add('delete-btn');
  deleteBtn.setAttribute('data-id', `${product.id}`);
  deleteBtn.innerHTML = `<span class="material-icons">delete</span>`;
  productControls.append(deleteBtn);
  return productControls;
}

function createCartFooter(goodsInCart: goodInCart[]): string {
   return `
    <footer class="cart-footer flex_col">
      <div class="cart-footer__summary grid">
      <div class="cart-footer__limits">
        <span class="cart-footer__items">На странице по:</span>
        <input type="text" class="cart-footer__input" value="3">
      </div>
      <div class="cart-footer__pagination">
        <span class="page__quantity-title">Страница:</span>
        <button class="page__prev">
          <span class="material-icons">arrow_back_ios</span>
        </button>
        <span class="page__quantity">1</span>
        <button class="page__next">
          <span class="material-icons">arrow_forward_ios</span>
        </button>
      </div>
      <div class="cart-footer__count">Количество товаров: ${goodsInCart.length}</div>
      <div class="cart-footer__price flex_col">
        <span class="old__price">600 000 BYN</span>
        <span class="current__price">0 BYN.</span>
      </div>
      </div>
      <div class="cart-footer__promo">
        <div class="cart-footer__promo-code">
          <input type="search" placeholder="Введите ваш промокод" class="promo-code__input border">
        </div>
        <div class="cart-footer__promo-code-descr border flex_sb">
          Промокод RS -10%
          <button class="add__promo">
            <span class="material-icons">ads_click</span>
          </button>
        </div>
        <span class="test__promo-code border flex_sb">Для теста код: "RS"</span>
        <div class="applied__codes border">
          <h3 class="applied__codes-title">
            Примененные промокоды:
          </h3>
          <div class="applied__codes-text flex_sb">
            Промокод RS -10%
            <button class="drop">
              <span class="material-icons">delete</span>
            </button>
          </div>
        </div>
        <button class="btn buy-btn buy-now">Оплатить заказ</button>
      </div>
    </footer>
  `;
}




