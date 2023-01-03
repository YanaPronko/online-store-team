export const getPromo = () => {
  const promoInput = document.querySelector<HTMLInputElement>('.promo-code__input');
  console.log(promoInput);
  if (promoInput) {
    promoInput.addEventListener("input", () => {
      const promocode = promoInput.value;
      console.log(promocode);
    });
  }

};