import { isQueryParamsExist } from "./queryParams";
import { filterGoods } from "./goodsFilter";
import { createProductCart, isProductInStorage, PRODUCTS} from "../containers/catalog/catalog"

export const renderProducts = () => {
  const productsWrapepr = document.querySelector('.goods__wrapper');
  const queryParams = isQueryParamsExist();
  if (queryParams) {
    const arrayForRender = filterGoods(queryParams);
    if (arrayForRender && productsWrapepr) {
      productsWrapepr.innerHTML = '';
      arrayForRender.forEach((product) => {
        if (productsWrapepr) {
          const productCart = isProductInStorage(product.id) ? createProductCart(product, 'Удалить из корзины') : createProductCart(product, 'Добавить в корзину');
          if (productsWrapepr) productsWrapepr.innerHTML += productCart;
        }
      });
    }
  } else {
    Object.values(PRODUCTS).forEach((product) => {
      const productCart = isProductInStorage(product.id)
        ? createProductCart(product, 'Удалить из корзины')
        : createProductCart(product, 'Добавить в корзину');
      if (productsWrapepr) productsWrapepr.innerHTML += productCart;
    });
  }
}
