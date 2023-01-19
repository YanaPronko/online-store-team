import products from '../../files/products.json'
import { initProductSlider } from '../../modules/productSlider'
import { isProductInStorage, productData } from '../catalog/catalog'
const PRODUCTS = products.products


export function createProductPage(productData :productData, btnText?:string) :string {
  return `
<div class="container">
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><a class="breadcrumb-ref rout-link" href="/">Главная</a></li>
      <li class="breadcrumb-item">${productData.category}</li>
      <li class="breadcrumb-item">${productData.title}</li>
    </ul>
    <div class="card">
      <div class="card-slider">
        <div class="card-slider__nav slider-nav">
          <div class="slider-nav__item" tabindex="0"><img src=${productData.thumbnail} alt="photo"></div>
          <div class="slider-nav__item" tabindex="0"><img src=${productData.images[0]} alt="photo"></div>
          <div class="slider-nav__item" tabindex="0"><img src=${productData.images[1]} alt="photo"></div>
        </div>
        <div class="card-slider__block slider-block">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img src=${productData.thumbnail} alt="photo">
            </div>
            <div class="swiper-slide">
              <img src=${productData.images[0]} alt="photo">
            </div>
            <div class="swiper-slide">
              <img src=${productData.images[1]} alt="photo">
            </div>
          </div>
        </div>
      </div>
      <div class="card-info">
        <span class="vendor">Артикул: ${productData.id}</span>
        <div class="card-details">
          <p class="card-brand">Бренд: <span>${productData.brand}</span></p>
          <p class="card-category">Категория: <span>${productData.category}</span></p>
        </div>
        <h1 class="card-title">${productData.category}</h1>
        <div class="card-description">
          <p>${productData.description}</p>
        </div>
        <div class="testimonials">
          <div class="good__rating">
            <span class="star active material-icons ico">star_rate</span>
            <span class="star active material-icons ico">star_rate</span>
            <span class="star active material-icons ico">star_rate</span>
            <span class="star active material-icons ico">star_rate</span>
            <span class="star  material-icons ico">star_rate</span>
          </div>
        </div>
        <span class="available">В наличии: ${productData.stock} шт</span>
        <div class="price">
          <div class="price__current">${productData.price}<span>BYN</span></div>
          <button class="btn product-btn" data-id="${productData.id}">${btnText}</button>
        </div>
        <button class="btn buy-btn" data-id="${productData.id}">Купить сейчас</button>
      </div>
    </div>
</div>
</div>`
}

export function renderProductPage(id : number) : void {
  const productsWrapepr = document.querySelector('.main-content')
  if(productsWrapepr) {
    productsWrapepr.innerHTML = ''
    // const productCart = createProductPage(PRODUCTS[id])
    const productCart = isProductInStorage(id) ? createProductPage(PRODUCTS[id], 'Удалить из корзины') : createProductPage(PRODUCTS[id], 'Добавить в корзину')
    if(productsWrapepr) productsWrapepr.innerHTML += productCart
    initProductSlider()
  }
}
