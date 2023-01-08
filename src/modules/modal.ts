import validateForm from "./validateForm";

export const modal = document.createElement('div');

export function closeModal() {
  const element = document.querySelector('.modal');
  if (element) {
    element.classList.remove('slideInDown');
    element.remove();
  }
  document.body.style.overflow = '';
  document.body.style.marginRight = '0px';
}

const createModal = () => {
  const scroll = calcScroll();


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
              <form action=# method=POST id="form" class="modal-body__form">
					      <div class="input__wrapper">
                <label for="name" class="label">
                <input type="text" id="name" class="input input__name form__input form-control" name="name" placeholder="Ваше имя и фамилия" required>
                </label>
                <label for="phone" class="label">
                  <input type="tel" id="phone" class="input input__phone" name="phone" placeholder="Ваш номер телефона" required>
                </label>
                <label for="email" class="label">
                  <input type="email" id="email" class="input input__email" name="email" placeholder="Ваш E-mail">
                </label>
                <label for="adress" class="label">
                  <input type="text" id="adress" class="input input__adress" name="adress"  placeholder="Адрес доставки" required>
                </label>
					      </div>
                <div class="card__wrapper">
                  <div class="card__back">
                    <div class="card__back-line"></div>
                    <label for="cvv" class="label cvv-label">
                    <input type="number" id="cvv" maxlength="3" class="input input__code" placeholder="CVV" required>
                    </label>
                  </div>
                  <div class="card__front">
                    <div class="card__image">BANK</div>
                    <label for="bank-number" class="label">
                    <input id="bank-number" class="input input__card-number" placeholder="номер карты" required>
                    </label>
                    <div class="card__front-footer">
                      <div class="date__wrap">
                        <label for="month" class="label">
                        <input type="number" id="month" maxlength="2" class="input input__month" required>
                        </label>
                        <label for="slash" class="label">
                        <span id="slash" class="slash">/</span>
                        </label>
                        <label for="year" class="label">
                        <input type="number" id="year" maxlength="2" class="input input__year" required>
                        </label>
                      </div>
                      <img src="assets/images/icons/Mastercard.svg" alt="logo of payment system" class="card__logo">
                    </div>
                  </div>
                </div>
					      <button  id="submit-btn" class="btn order__btn">Оплатить</button>
				      </form>
            </div>
            <div class="modal-footer">
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
        closeModal();
      }
    });
  }

  const form = document.querySelector("#form");
  if (form) {
    validateForm();
  }
}
export default createModal;
