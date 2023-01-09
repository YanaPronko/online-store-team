import "./styles/style";
import { initProductSlider } from "./modules/productSlider";
import { initFilterSlider } from "./modules/priceSlider";
import "./modules/router";
import './containers/cart/cart';
import { onBuyNowHandler, onProductHandler } from "./containers/catalog/catalog";
import { initSearch } from "./modules/search";

document.addEventListener("DOMContentLoaded", () => {
  initProductSlider();
  initFilterSlider({
    sliderRangeSel: '.price__range-input input',
    sliderInputSel: '.price-input input',
    sliderProgressSel: '.price-slider .progress',
    gap: 200,
  });
  initFilterSlider({
    sliderRangeSel: '.stock__range-input input',
    sliderInputSel: '.stock-input input',
    sliderProgressSel: '.stock-slider .progress',
    gap: 10,
  });
  document.querySelector('.main-content')?.addEventListener('click', onProductHandler)
  document.querySelector('.main-content')?.addEventListener('click', onBuyNowHandler)
  // document.querySelector('.goods__wrapper')?.addEventListener('click', linkHandler)
  initSearch()
});
