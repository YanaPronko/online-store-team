import { renderCart } from "../containers/cart/cart";
import { item } from "../containers/product/product";
import { setStorage,  removeItemFromStorage } from "./updateStorage";


export function deleteProductFromCart(array: item[], ind: number): void {
    array.splice(ind, 1);
    if (array.length === 0) {
      removeItemFromStorage('cart');
    }
    setStorage('cart', array);
    renderCart();
  }