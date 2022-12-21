import "./styles/style";
import { initProductSlider } from "./modules/productSlider";
import { initPriceSlider } from "./modules/priceSlider";

document.addEventListener("DOMContentLoaded", () => {
  initProductSlider();
  initPriceSlider();
});
