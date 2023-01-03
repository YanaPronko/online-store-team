import { item } from '../containers/product/product';
import { renderCart } from '../containers/cart/cart';
import { setStorage, parseStorage } from './updateStorage';
import { deleteProductFromCart } from './deleteGoods';

export const changeQuantity = () => {
  const goodsID: item[] = parseStorage("cart");
  const mainCartSection = document.querySelector('.main-cart');
  if (mainCartSection)
    mainCartSection.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      const upBtn = target.closest('.count__up');
      const downBtn = target.closest('.count__down');
      if (upBtn) {
        increaseQuantity(e, goodsID);
      }
      if (downBtn) {
        decreaseQuantity(e, goodsID);
      }
      renderCart();
    });
};

function getParent(target: HTMLElement, sel: string) {
  const parent = target.closest(sel) as HTMLElement;
  return parent;
}
function getIndex(arr: item[], parent: HTMLElement) {
  return arr.findIndex((item: item) => item.id === parent.dataset.id);
}
function getSpan(parent: HTMLElement, sel: string) {
  return parent.querySelector<HTMLElement>(sel);
}

function increaseQuantity(e: Event, goods: item[]) {
  const target = e.target as HTMLElement;
  if (target && target.closest('.count__up')) {
    const parent = getParent(target, '.product');
    const ind = getIndex(goods, parent);
    const countSpan = getSpan(parent, '.count__span' );
    if (countSpan) countSpan.textContent = `${++goods[ind].count}`;
    setStorage("cart", goods);
  }
}

function decreaseQuantity(e: Event, goods: item[]) {
  const target = e.target as HTMLElement;
  if (target && target.closest('.count__down')) {
    const parent = getParent(target, '.product');
    const ind = getIndex(goods, parent);
    const countSpan = getSpan(parent, '.count__span');
    if (countSpan) countSpan.textContent = `${--goods[ind].count}`;
    setStorage('cart', goods);
    if (goods[ind].count <= 0) {
      deleteProductFromCart(goods, ind);
    }
  }
}
