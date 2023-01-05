import { renderCart } from "../containers/cart/cart";
import { item } from "../containers/catalog/catalog";
import { setStorage } from "./updateStorage";
import { clearCart } from "./clearCart";


export function deleteProductFromCart(array: item[], ind: number): void {
  array.splice(ind, 1);
  if (array.length === 0) {
    clearCart();
  }
  setStorage('cart', array);
  renderCart();
}
