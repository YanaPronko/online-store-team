import { removeItemFromStorage } from "./updateStorage";

export const clearCart = () => {
  removeItemFromStorage("cart");
  removeItemFromStorage("codes");
};
