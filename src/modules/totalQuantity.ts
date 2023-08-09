import { goodInCart } from '../containers/cart/cart';

export const countTotalGoods = (arrayOfGoods: goodInCart[]) => {
  return arrayOfGoods.reduce((acc, item) => (acc + item.count), 0);
};
