import { addQueryParams } from "./goodsFilter";

export const changeGoodsView = (e: Event, parent: HTMLElement) => {
  const target = e.target;
  if (target && target instanceof HTMLElement) {
    const changeBtn = target.closest('.sort__icon');
    if (changeBtn && changeBtn instanceof HTMLDivElement) {
      const view = changeBtn.dataset.view;
      parent.dataset.temp = view;
      addQueryParams(e);
    }
  }
}