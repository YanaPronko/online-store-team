import { goodInCart, renderCart } from '../containers/cart/cart';
import { parseStorage, setStorage} from './updateStorage';

export const cartPagination = (arr: goodInCart[]) => {
  const location = window.location.href;
  const url = new URL(location);

  const pagOptions = parseStorage("pagination");
  const arrayForPagination = [...arr];
  const currentPage = pagOptions[0].page;
  const rows = pagOptions[0].rows;

  url.searchParams.set('page', `${currentPage + 1}`);
  url.searchParams.set('row', `${rows}`);
  history.pushState("", "", url);

  const totalPages = Math.ceil(arrayForPagination.length / rows);
  localStorage.setItem("totalPages", `${totalPages}`);
  const start = rows * currentPage;
  const end = start + rows;
  const arrayForRender = arrayForPagination.slice(start, end);
  return arrayForRender;
};

export const changeInputLimit = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target) {
    const pagOptions = parseStorage('pagination');
    pagOptions[0].rows = +target.value;
    setStorage('pagination', pagOptions);
    renderCart();
  }
}
export const onNextArrowHandler = () => {
  const pagOptions = parseStorage('pagination');
  const totalPages = parseStorage("totalPages");
  if ((pagOptions[0].page + 1) === +totalPages) return;
  pagOptions[0].page = ++pagOptions[0].page;
   setStorage('pagination', pagOptions);
   renderCart();
}
export const onPrevArrowHandler = () => {
  const pagOptions = parseStorage('pagination');
  if (pagOptions[0].page === 0) return;
  pagOptions[0].page = --pagOptions[0].page;
  setStorage('pagination', pagOptions);
  renderCart();
};
