import { Swiper } from "swiper";

export const initProductSlider = () => {
  const mySwiper = new Swiper('.slider-block', {
		slidesPerView: 1,
	})

	const sliderNavItems = document.querySelectorAll('.slider-nav__item');
	sliderNavItems.forEach((el: Element, index: number) => {
		el.setAttribute('data-index', `${index}`);

    el.addEventListener('click', (e: Event) => {
      const target = e.currentTarget;
      if (target && target instanceof HTMLElement && target.dataset.index) {
        const index = parseInt(target.dataset.index);
        console.log(index);
        mySwiper.slideTo(index);
      }
		});
  });
}
