import { renderCart } from "../containers/cart/cart";
import { item } from "../containers/product/product";
import { setStorage, parseStorage, removeItemFromStorage } from "./updateStorage";


export function deleteProductFromCart(e: Event): void {
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
    const ind = goods.findIndex((item: item) => item.id === id);
    goods.splice(ind, 1);
    if (goods.length === 0) {
      removeItemFromStorage('cart');
    }
    setStorage('cart', goods);
    renderCart();
  }
}