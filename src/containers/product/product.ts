import products from '../../files/products.json'
import { updateHeaderCart } from '../../modules/updateHeader'
export const PRODUCTS = products.products


export type productData = {
  id: number,
  title: string,
  description: string,
  price: number,
  rating: number,
  stock: number,
  brand: string,
  category: string,
  thumbnail: string,
  images:  string[]
}
export type item = {
  id: string;
  count: number;
}

export function createProductCart(productData :productData) :string {
  return `
  <div class="good__card">
    <img src="${productData.thumbnail}" alt="photo" class="good__img">
    <div class="good__content">
        <a href="./product.html">
            <div class="good__title">${productData.title}</div>
        </a>
        <div class="good__rating">
            <span class="star active material-icons ico">star_rate</span>
            <span class="star active material-icons ico">star_rate</span>
            <span class="star active material-icons ico">star_rate</span>
            <span class="star active material-icons ico">star_rate</span>
            <span class="star  material-icons ico">star_rate</span>
        </div>
        <div class="good__footer">
            <div class="good__price">${productData.price}<span>BYN</span></div>
            <button class="btn add-btn" data-id="${productData.id}">Добавить в корзину</button>
        </div>
    </div>
  </div>`
}

export function renderProducts(params? : string) : void {
  const productsWrapepr = document.querySelector('.goods__wrapper')
  if(productsWrapepr) {
    productsWrapepr.innerHTML = ''
    if(params) {
      return
    } else {
      Object.values(PRODUCTS).forEach((product) => {
        const productCart = createProductCart(product)
        if(productsWrapepr) productsWrapepr.innerHTML += productCart
      })
    }
    productsWrapepr.addEventListener('click', onProductHandler)
  }
}

function onProductHandler(e:Event) {
  if(e.target) {
    if((e.target as HTMLElement).tagName == 'BUTTON' ) {
      const id = (e.target as HTMLElement).getAttribute('data-id')
      addToProductToStorage(id as string)
      updateHeaderCart();
    }
  }
}

function addToProductToStorage(id: string) {
   const item: item = {
     id: id,
     count: 1,
   };

  const cart: item[] = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') as string) : [];
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
}
