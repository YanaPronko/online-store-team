import "./styles/style";
import { initProductSlider } from "./modules/productSlider";
import { initFilterSlider } from "./modules/priceSlider";
import "./modules/router";
import './containers/cart/cart';
import { onBuyNowHandler, onProductHandler } from "./containers/catalog/catalog";

document.addEventListener("DOMContentLoaded", () => {
  initProductSlider();
  initFilterSlider({
    sliderRangeSel: '.price__range-input input',
    sliderInputSel: '.price-input input',
    sliderProgressSel: '.price-slider .progress',
  });
  initFilterSlider({
    sliderRangeSel: '.stock__range-input input',
    sliderInputSel: '.stock-input input',
    sliderProgressSel: '.stock-slider .progress',
  });
  document.querySelector('.main-content')?.addEventListener('click', onProductHandler)
  document.querySelector('.main-content')?.addEventListener('click', onBuyNowHandler)
});
