const modal = () => {
  const scroll = calcScroll();

  const modal = document.createElement('div');
  modal.classList.add('modal', 'slideInDown');
  modal.setAttribute('id', 'exampleModal2');
  modal.innerHTML = `
        <div class="modal-dialog">
          <div class="modal-content">
            <button class="close" data-close>
              <span>&times;</span>
            </button>
            <div class="modal-header">
              <div class="modal-title">Доставка и оплата</div>
            </div>
            <div class="modal-body">
              <form action=# method=POST class="modal-body__form">
					      <div class="input__wrapper">
                  <input type="text" class="input input__name" name="name" placeholder="Ваше имя и фамилия" required>
                  <input type="tel" class="input input__phone" name="phone" placeholder="Ваш номер телефона" required>
                  <input type="email" class="input input__email" name="email" placeholder="Ваш E-mail">
                  <input type="text" class="input input__adress" name="adress"  placeholder="Адрес доставки" required>
					      </div>
                <div class="card__wrapper">
                  <div class="card__back">
                    <div class="card__back-line"></div>
                    <input type="number" maxlength="3" class="input input__code" placeholder="CVV" required>
                  </div>
                  <div class="card__front">
                    <img src="assets/images/icons/prior.png" alt="logo of bank" class="card__image">
                    <input type="number" class="input input__card-number" placeholder="номер карты" required>
                    <div class="card__front-footer">
                      <div class="date__wrap">
                        <input type="number" maxlength="2" class="input input__month" required>
                        <span class="slash">/</span>
                        <input type="number" maxlength="2" class="input input__year" required>
                      </div>
                      <img src="assets/images/icons/Mastercard.svg" alt="logo of payment system" class="card__logo">
                    </div>
                  </div>
                </div>
					      <button class="btn order__btn">Оплатить</button>
				      </form>
            </div>
            <div class="modal-footer">
              <div class="modal-message hidden">Заказ оплачен</div>
            </div>
          </div>
        </div>
      `;
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.body.append(modal);
  document.body.style.overflow = 'hidden';
  document.body.style.marginRight = `${scroll}px`;

  function calcScroll() {
    const div = document.createElement('div');
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';
    document.body.append(div);

    const scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;
  }

  const closeElem = document.querySelector('[data-close]');
  if (closeElem) {
    closeElem.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target instanceof HTMLElement && target.closest('[data-close]')) {
        console.log(e.target);
        closeModal();
      }
    });
  }

  function closeModal() {
    const element = document.querySelector('.modal');
    if (element) {
      element.classList.remove('slideInDown');
      element.classList.add('slideInUp');
      element.remove();
    }
    document.body.style.overflow = '';
    document.body.style.marginRight = '0px';
  }
};
export default modal;
