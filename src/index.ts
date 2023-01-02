import "./styles/style";
import { initProductSlider } from "./modules/productSlider";
import { initFilterSlider } from "./modules/priceSlider";
import "./modules/router";
import './containers/cart/cart';


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
});
