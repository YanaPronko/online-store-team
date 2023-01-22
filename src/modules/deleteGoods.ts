import { renderCart } from "../containers/cart/cart";
import { item } from "../containers/catalog/catalog";
import { setStorage } from "./updateStorage";
import { clearCart } from "./clearCart";

export function deleteProductFromCart(array: item<string>[], ind: number): void {
  array.splice(ind, 1);  
  if (array.length === 0) {
    clearCart();
  }
  setStorage('cart', array);
  renderCart();
}

export function deleteProductOnMain(id: number | string): void {
  const newCart = JSON
  .parse(localStorage.getItem('cart') as string)
  .filter((el: item<string>) => +el.id !== +id)
  if (newCart.length === 0) {
    clearCart();
  }
  setStorage('cart', newCart); 
}
