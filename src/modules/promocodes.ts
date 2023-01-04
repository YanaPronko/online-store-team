import { countFinalPrice } from "./countFinalPrice";
import { updateHeaderCart } from "./updateHeader";
import { parseStorage, setStorage } from "./updateStorage";

const permittedCodes = ["YANA", "ARTEM"];

export const getPromo = () => {
  const promoInput = document.querySelector<HTMLInputElement>('.promo-code__input');
  const promocodeDescr = document.querySelector('.cart-footer__promo-code-descr span');
  if (promoInput) {
    promoInput.addEventListener("change", () => {
      const promocode = promoInput.value;
      const formattedPromo = promocode.trim().toUpperCase();
      if (permittedCodes.includes(formattedPromo)) {
        if (promocodeDescr) {
          promocodeDescr.textContent = `${formattedPromo} - 10%`;
        }
      }
    });
  }
};

export const applyPromo = (price: number) => {
  const appliedCodes: string[] = localStorage.getItem('codes') ? parseStorage("codes") : [];
  const applyBtn = document.querySelector('.add__promo');
  const promocodeDescr = document.querySelector('.cart-footer__promo-code-descr span');
  if (applyBtn && promocodeDescr) {
    applyBtn.addEventListener('click', () => {
      const appliedCode = promocodeDescr.textContent?.split(' ')[0];
      if (appliedCode && permittedCodes.includes(appliedCode)) {
        appliedCodes.push(appliedCode);
        setStorage("codes", appliedCodes);
        renderAppliedCodes();
        renderFinalPrice(price);
        updateHeaderCart();
        promocodeDescr.textContent = `Найденные промокоды`;
      }
    });
  }
};

export const renderAppliedCodes = () => {
  const appliedCodeField = document.querySelector('.applied__codes');
  const appliedCodes: string[] = Array.from(new Set(parseStorage("codes")));
  if (appliedCodeField) {
    appliedCodeField.innerHTML = `
          <h3 class="applied__codes-title">
            Примененные промокоды:
          </h3>`;
  }

  appliedCodes.forEach((code: string) => {
    const textField = document.createElement('div');
    textField.classList.add('applied__codes-text', 'flex_sb');
    textField.innerHTML = `<span>${code} - 10%</span>`;
    const dropBtn = document.createElement('button');
    dropBtn.classList.add('drop');
    dropBtn.innerHTML = `<span class="material-icons">delete</span>`;
    textField.append(dropBtn);
    if (appliedCodeField) {
      appliedCodeField.append(textField);
    }
  });
};

export const renderFinalPrice = (price: number) => {
  const appliedCodes: string[] = Array.from(new Set(parseStorage('codes')));
  if (appliedCodes.length === 0) return;

  const oldPrice = document.querySelector('.old__price');
  const currentPrice = document.querySelector('.current__price');
  if (oldPrice) oldPrice.textContent = `${price} BYN`;
  const finalPrice = countFinalPrice(price);
  if (currentPrice) currentPrice.textContent = `${Math.ceil(finalPrice)} BYN`;
}
