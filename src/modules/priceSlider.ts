type SliderSelectors = {
  sliderRangeSel: string;
  sliderInputSel: string;
  sliderProgressSel: string;
  gap: number;
};
export const initFilterSlider = ({ sliderRangeSel, sliderInputSel, sliderProgressSel, gap }: SliderSelectors) => {
  const rangeInput = document.querySelectorAll<HTMLInputElement>(sliderRangeSel),
    valueInput = document.querySelectorAll<HTMLInputElement>(sliderInputSel),
    range = document.querySelector<HTMLElement>(sliderProgressSel);

  const valueGap = gap;

  valueInput.forEach((input) => {
    input.addEventListener('input', (e) => {
      const target = e.target;
      const minValue = parseInt(valueInput[0].value),
        maxValue = parseInt(valueInput[1].value);

      if (maxValue - minValue >= valueGap && maxValue <= +rangeInput[1].max) {
        if (target && target instanceof HTMLInputElement
          && target.classList.contains('input-min')) {
          rangeInput[0].value = `${minValue}`;
          if (range) {
            range.style.left = (minValue / +rangeInput[0].max) * 100 + '%';
          }
        } else {
          rangeInput[1].value = `${maxValue}`;
          if (range) {
            range.style.right = 100 - (maxValue / +rangeInput[1].max) * 100 + '%';
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

      if (maxVal - minVal < valueGap) {
        if (target && target instanceof HTMLInputElement
          && target.classList.contains('range-min')) {
          rangeInput[0].value = `${maxVal - valueGap}`;
        } else {
          rangeInput[1].value = `${minVal + valueGap}`;
        }
      } else {
        valueInput[0].value = `${minVal}`;
        valueInput[1].value = `${maxVal}`;
        if (range) {
          range.style.left = (minVal / +rangeInput[0].max) * 100 + '%';
          range.style.right = 100 - (maxVal / +rangeInput[1].max) * 100 + '%';
        }
      }
    });
  });
};
