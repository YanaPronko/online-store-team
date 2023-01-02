import { renderCart } from "../containers/cart/cart";
import { item } from "../containers/product/product";


export function deleteProductFromCart(e: Event): void {
  const target = e.target as HTMLElement;
  if (target && target.closest('.delete-btn')) {
    const goods = JSON.parse(localStorage.getItem('cart') as string);
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
      localStorage.removeItem('cart');
    }
    localStorage.setItem('cart', JSON.stringify(goods));
    renderCart();
  }
}