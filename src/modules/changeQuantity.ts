import { item } from '../containers/product/product';
import { renderCart } from '../containers/cart/cart';

export const changeQuantity = () => {
  const goodsID: item[] = JSON.parse(localStorage.getItem('cart') as string);
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
        // decreaseQuantity(e, /* goodsID */);
      }
      renderCart();
    });
};

function increaseQuantity(e: Event, goods: item[]) {
  const target = e.target as HTMLElement;
  if (target && target.closest('.count__up')) {
    const parent = target.closest('.product') as HTMLElement;
    const ind = goods.findIndex((item: item) => item.id === parent.dataset.id);
    const countSpan = parent.querySelector<HTMLElement>('.count__span');
    if (countSpan) countSpan.textContent = `${++goods[ind].count}`;
    localStorage.setItem('cart', JSON.stringify(goods));

  }
}
