import { createGoodsInCart } from "../containers/cart/cart";
import { countPrice, countFinalPrice } from "./countFinalPrice";
import { countTotalGoods } from "./totalQuantity";
import { parseStorage } from "./updateStorage";

export const updateHeaderCart = () => {
  const goodsID = parseStorage("cart");
  console.log(goodsID);
  const cartHeaderCount = document.querySelector('.cart__count');
  const cartHeaderSum = document.querySelector('.cart__sum');

  if (goodsID && goodsID.length > 0) {
    const goodsInCart = createGoodsInCart(goodsID);
    // console.log(goodsInCart);
    const price = countPrice(goodsInCart);
    console.log(price);
    const finalPrice = countFinalPrice(price);
    const totalGoods = countTotalGoods(goodsInCart);
    if (cartHeaderCount && cartHeaderSum) {
      cartHeaderCount.textContent = `${totalGoods}`;
      cartHeaderSum.textContent = `${Math.ceil(finalPrice)} BYN`;
    }
  } else {
     if (cartHeaderCount && cartHeaderSum) {
       cartHeaderCount.textContent = `0`;
       cartHeaderSum.textContent = `Корзина пуста`;
     }
  }
}
