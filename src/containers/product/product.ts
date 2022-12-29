import products from '../../files/products.json'

const PRODUCTS = products.products

type productData = {
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
  if(productsWrapepr) productsWrapepr.innerHTML = '' 
  if(params) {
    return
  } else {   
    Object.values(PRODUCTS).forEach((product) => {
      const productCart = createProductCart(product)      
      if(productsWrapepr) productsWrapepr.innerHTML += productCart
    })   
  }
}

