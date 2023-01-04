import { goodInCart } from '../containers/cart/cart';

export const countPrice = (arrayOfGoods: goodInCart[]) => {
  return arrayOfGoods.reduce((acc, item) => acc + item.price * item.count, 0);
};

export const countFinalPrice = (price: number) => {
  const appliedCodes: string[] = Array.from(new Set(JSON.parse(localStorage.getItem('codes') as string)));
  const discount = 10 * appliedCodes.length;
  const discountSum = (price * discount) / 100;
  const finalPrice = price - discountSum;
  return finalPrice;
};