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
  const appliedCodes = [];
  const applyBtn = document.querySelector('.add__promo');
  const promocodeDescr = document.querySelector('.cart-footer__promo-code-descr span');
  const appliedCodeField = document.querySelector('.applied__codes');
  const oldPrice = document.querySelector('.old__price');
  const currentPrice = document.querySelector('.current__price');

  if (applyBtn && promocodeDescr && appliedCodeField) {
    applyBtn.addEventListener('click', () => {
      const appliedCode = promocodeDescr.textContent?.split(' ')[0];
      if (appliedCode && permittedCodes.includes(appliedCode)) {
        appliedCodes.push(appliedCode);
        const textField = document.createElement("div");
        textField.classList.add('applied__codes-text', 'flex_sb');
        textField.innerHTML = `
           <span>${appliedCode} - 10%</span>
        `;
        const dropBtn = document.createElement('button');
        dropBtn.classList.add('drop');
        dropBtn.innerHTML = `<span class="material-icons">delete</span>`;
        textField.append(dropBtn);
        appliedCodeField.append(textField);
        promocodeDescr.textContent = `Найденные промокоды`;
        if (oldPrice) oldPrice.textContent = `${price}`;
        const discount = 10 * appliedCodes.length;
        const discountSum = (price * discount) / 100;
        const finalPrice = price - discountSum;
        if (currentPrice) currentPrice.textContent = `${Math.ceil(finalPrice)}`;
      }
    });
  }
};
