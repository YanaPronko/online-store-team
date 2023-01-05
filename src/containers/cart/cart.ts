import { PRODUCTS } from "../catalog/catalog";
import { productData, item } from "../catalog/catalog";
import modal from "../../modules/modal";
import { deleteProductFromCart } from "../../modules/deleteGoods";
import { countPrice } from '../../modules/countFinalPrice';
import { countTotalGoods } from "../../modules/totalQuantity";
import { changeQuantity } from '../../modules/changeQuantity';
import { parseStorage } from "../../modules/updateStorage";
import { getPromo, applyPromo, renderAppliedCodes, renderFinalPrice  } from '../../modules/promocodes';
import { updateHeaderCart } from "../../modules/updateHeader";

export type count = {
  count: number;
}

export type goodInCart = productData & count;


export function createGoodsInCart(goodsID: item[]) {
  const goodsInCart: goodInCart[] = [];
  for (let i = 0; i < goodsID.length; i++) {
    const item = PRODUCTS.find((good) => good.id === +goodsID[i].id);
    const count = +goodsID[i].count;
    if (item) {
      const good: goodInCart = { ...item, count };
      goodsInCart.push(good);
    }
  }
  return goodsInCart;
}

export function renderCart(): void {
  const goodsID: item[] = parseStorage("cart");
  if (!goodsID || goodsID.length === 0) {
    renderEmptyCart();
  } else {
    const goodsInCart = createGoodsInCart(goodsID);
    renderCartWithGoods(goodsInCart);
    changeQuantity();
    getPromo();
    const price = countPrice(goodsInCart);
    applyPromo(price);
    renderAppliedCodes();
    renderFinalPrice(price);
    updateHeaderCart();
  }
}


function renderEmptyCart(): void {
  const emptyCart = createEmptyCart();
  const wrapper = document.querySelector('.wrapper');
  const container = document.querySelector('.main-content .container');
  if (wrapper) {
    wrapper.innerHTML = '';
    wrapper.append(emptyCart);
  } else {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    wrapper.append(emptyCart);
    if (container) {
      container.innerHTML = '';
      container.append(wrapper);
    }
  }
}

function renderCartWithGoods(arrayOfGoods: goodInCart[]): void {
  const wrapper = document.querySelector('.wrapper');
  const container = document.querySelector('.main-content .container');
  const cart = createCart(arrayOfGoods);
  if (wrapper) {
    wrapper.innerHTML = '';
    wrapper.append(cart);
  } else {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    wrapper.append(cart);
    if (container) {
      container.innerHTML = '';
      container.append(wrapper);
    }
  }

  const deleteBtns = document.querySelectorAll<HTMLButtonElement>('.delete-btn');
  deleteBtns.forEach((item) => {
    item.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      if ((target && target.closest('.delete-btn'))) {
        const goods = parseStorage('cart');
        let id: string;
        if (target.tagName == 'SPAN') {
          const parent = target.parentElement;
          if (parent) id = parent.getAttribute('data-id') as string;
        } else {
          id = target.getAttribute('data-id') as string;
        }
        const ind = +(goods.findIndex((item: item) => item.id === id));
        deleteProductFromCart(goods, ind);
      }
    });
  });

  const buyBtn = document.querySelector('.buy-now');
  if (buyBtn) {
    buyBtn.addEventListener('click', modal);
  }
}

function createEmptyCart(): HTMLDivElement {
  const cartBody = document.createElement('div');
  cartBody.classList.add('section-cart__body');
  cartBody.innerHTML = `
    <h1 class="cart__subtitle">Корзина пуста!</h1>
    <input type="search">
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
  const gridContainer = document.createElement('div');
  gridContainer.classList.add('grid__container');
  goodsInCart.forEach((item) => {
    const product = createProductSection(item);
    gridContainer.append(product);
  });
  mainCartSection.append(gridContainer);
  const sum = countPrice(goodsInCart);
  const quantity = countTotalGoods(goodsInCart);
  const footer = createCartFooter(sum, quantity);
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
      <div class="product__title">${productData.title}
        <span class="stock__subtitle">На складе: ${productData.stock} ед.</span>
      </div>
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
      <div class="product__price">${productData.price * productData.count} BYN</div>
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

function createCartFooter(sum: number, quantity: number): string {
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
      <div class="cart-footer__count">Количество товаров: ${quantity}</div>
      <div class="cart-footer__price flex_col">
        <span class="old__price"></span>
        <span class="current__price">${sum} BYN</span>
      </div>
      </div>
      <div class="cart-footer__promo">
        <div class="cart-footer__promo-code">
          <input type="search" placeholder="Введите ваш промокод" class="promo-code__input border">
        </div>
        <div class="cart-footer__promo-code-descr border flex_sb">
          <span>Найденные промокоды</span>
          <button class="add__promo">
            <span class="material-icons">ads_click</span>
          </button>
        </div>
        <span class="test__promo-code border flex_sb">Для теста коды: "YANA", "ARTEM"</span>
        <div class="applied__codes border">
          <h3 class="applied__codes-title">
            Примененные промокоды:
          </h3>
          <div class="applied__codes-text flex_sb">
            <span></span>
          </div>
        </div>
        <button class="btn buy-btn buy-now">Оплатить заказ</button>
      </div>
    </footer>
  `;
}
