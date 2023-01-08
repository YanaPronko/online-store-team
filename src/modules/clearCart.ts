import { removeItemFromStorage } from "./updateStorage";

export const clearCart = () => {
  removeItemFromStorage("cart");
  removeItemFromStorage("codes");
  /* const location = window.location.pathname;
  const url = new URL(location);
  url.searchParams.delete("page"); */
};
