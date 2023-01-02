import { goodInCart } from '../containers/cart/cart';

export const countPrice = (arrayOfGoods: goodInCart[]) => {
  return arrayOfGoods.reduce((acc, item) => acc + item.price * item.count, 0);
};
