import { renderProducts } from "../containers/product/product";
import { renderCart } from "../containers/cart/cart";
type pageObject = {
  template: string,
  title: string,
  render():void,
}

type urlObject = {
  [key: number]: pageObject,
  [key: string]: pageObject ,

}

const _urlROutes: urlObject = {
  404: {
    template: '/404.html',
    render: renderProducts,
    title:'error',
  },
  "/": {
    template: '/main.html',
    render: renderProducts,
    title:"Main",
  },
  "/cart": {
    template: '/cart.html',
    render: renderCart,
    title:"cart",
  },
}

document.querySelectorAll('.rout-link').forEach(element => {
  element.addEventListener('click', linkHandler )
});

function linkHandler (e:Event) {
  e.preventDefault()
  // console.log(e.currentTarget)
  urlRoute(e);
 }


const urlRoute = (event:Event) => {
  event  = event || window.event;
  event.preventDefault();
  if(event.currentTarget !== null ) window.history.pushState({}, '', (event.currentTarget as HTMLLinkElement).href);

  urlLocationHandler();
}

const urlLocationHandler = async () => {
  let location:string = window.location.pathname;
  if(location.length == 0) {
    location = '/'
  }
  let route = _urlROutes[location] || _urlROutes[404]
  if(_urlROutes[location] === undefined) {
    route =  _urlROutes[404]
  }
  route.render()
}

window.addEventListener('popstate', (e) => {
  e.preventDefault()
  urlLocationHandler()
});

urlLocationHandler();
