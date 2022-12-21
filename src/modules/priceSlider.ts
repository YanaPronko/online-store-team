export const initPriceSlider = () => {
  const rangeInput = document.querySelectorAll<HTMLInputElement>('.price__range-input input'),
    priceInput = document.querySelectorAll<HTMLInputElement>('.price-input input'),
    range = document.querySelector<HTMLElement>('.slider .progress');

  const priceGap = 1000;

  priceInput.forEach((input) => {
    input.addEventListener('input', (e) => {
      const target = e.target;
      const minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);

      if (maxPrice - minPrice >= priceGap && maxPrice <= +rangeInput[1].max) {
        if (target && target instanceof HTMLInputElement
          && target.className === 'input-min') {
          rangeInput[0].value = `${minPrice}`;
          if (range) {
            range.style.left = (minPrice / +rangeInput[0].max) * 100 + '%';
          }
        } else {
          rangeInput[1].value = `${maxPrice}`;
          if (range) {
            range.style.right = 100 - (maxPrice / +rangeInput[1].max) * 100 + '%';
          }
        }
      }
    });
  });

  rangeInput.forEach((input) => {
    input.addEventListener('input', (e) => {
      const target = e.target;
      const minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

      if (maxVal - minVal < priceGap) {
        if (target && target instanceof HTMLInputElement
          && target.className === 'range-min') {
          rangeInput[0].value = `${maxVal - priceGap}`;
        } else {
          rangeInput[1].value = `${minVal + priceGap}`;
        }
      } else {
        priceInput[0].value = `${minVal}`;
        priceInput[1].value = `${maxVal}`;
        if (range) {
          range.style.left = (minVal / +rangeInput[0].max) * 100 + '%';
          range.style.right = 100 - (maxVal / +rangeInput[1].max) * 100 + '%';
        }
      }
    });
  });
};

