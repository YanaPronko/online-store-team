
import { renderCatalog } from "../containers/catalog/catalog";
import {  renderProductPage } from "../containers/product/product";
import { renderCart } from "../containers/cart/cart";

type pageObject = {
  template: string,
  title: string,
  render(param?:number | string):void,
}

type urlObject = {
  [key: number]: pageObject,
  [key: string]: pageObject ,

}

let TARGET_ID:number | undefined = undefined

const _urlROutes: urlObject = {
  404: {
    template: '/404.html',
    render: renderCatalog,
    title:'error',
  },
  "/": {
    template: '/main.html',
    render: renderCatalog,
    title:"Main",
  },
  "/cart": {
    template: '/cart.html',
    render: renderCart,
    title:"cart",
  },
  "/product": {
    template: '/product.html',
    render: renderProductPage,
    title:"cart",
  },
}

document.querySelectorAll('.rout-link').forEach(element => {
  element.addEventListener('click', linkHandler )
});

export function linkHandler (e:Event) {
  e.preventDefault()
  const id =  (e.currentTarget as HTMLElement).getAttribute('data-id');
  if(e.currentTarget && id !== null )
  TARGET_ID = +id
  urlRoute(e);
 }

const urlRoute = (event:Event) => {
  event  = event || window.event;
  event.preventDefault();
  if(event.currentTarget !== null ) window.history.pushState({}, '', `${(event.currentTarget as HTMLLinkElement).href}${TARGET_ID !== undefined ? '/' + TARGET_ID  : ''}`);

  urlLocationHandler();
}

const ifProductUrlHandler = (location:string) => {
  if(location.includes('product')) return '/product'
  return location
}

const urlLocationHandler = async () => {
  let location:string = ifProductUrlHandler(window.location.pathname);

  if(location.length == 0) {
    location = '/'
  }
  let route = _urlROutes[location] || _urlROutes[404]
  if(_urlROutes[location] === undefined) {
    route =  _urlROutes[404]
  }

  TARGET_ID === undefined ?  route.render() : (route.render(TARGET_ID),  TARGET_ID = undefined)

  document.querySelectorAll('.rout-link').forEach(element => {
    element.addEventListener('click', linkHandler )
  });
}

window.addEventListener('popstate', (e) => {
  e.preventDefault()
  urlLocationHandler()
});

urlLocationHandler();
