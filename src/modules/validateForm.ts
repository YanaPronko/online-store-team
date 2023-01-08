import JustValidate, { Rules } from 'just-validate';
import { modal, closeModal } from './modal';
import { clearCart } from './clearCart';
import { renderCart } from '../containers/cart/cart';
import { renderCatalog } from '../containers/catalog/catalog';


const validateForm = () => {
  const form = document.querySelector<HTMLFormElement>('#form');

  const messages = {
    sucсess: 'Заказ оформлен! Мы скоро с вами свяжемся!',
    failure: 'Что-то пошло не так. Попробуйте позже!',
  };

  function createStatusMessage(status: string, ...classNames: string[]) {
    const message = document.createElement(`div`);
    message.textContent = status;
    message.classList.add(...classNames);
    const footer = modal.querySelector('.modal-footer');
    if (form && footer) {
      footer.append(message);
    }
    return message;
  }

  if (form) {
    const validation = new JustValidate('#form', {
      errorLabelStyle: {
        color: 'red',
      },
      focusInvalidField: true,
      lockForm: true,
      validateBeforeSubmitting: true,
    });
    validation
      .addField('#name', [
        {
          rule: 'customRegexp' as Rules,
          value: /(^[A-Z]{1}[a-z]{2,14} [A-Z]{1}[a-z]{2,14}$)|(^[А-Я]{1}[а-я]{2,14} [А-Я]{1}[а-я]{2,14}$)/,
          errorMessage: 'Должно быть 2 слова (минимум 3 буквы), первая буква в слове: прописная',
        },
        {
          rule: 'required' as Rules,
          errorMessage: 'Поле обязательно для заполнения',
        },
      ])
      .addField('#phone', [
        {
          rule: 'customRegexp' as Rules,
          value: /^(\+375)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/,
          errorMessage: 'Введите номер в формате +375 код оператора ...',
        },
        {
          rule: 'required' as Rules,
          errorMessage: 'Поле обязательно для заполнения',
        },
      ])
      .addField('#email', [
        {
          rule: 'email' as Rules,
          errorMessage: 'Введите верный email',
        },
        {
          rule: 'required' as Rules,
          errorMessage: 'Поле обязательно для заполнения',
        },
      ])
      .addField('#adress', [
        {
          validator: (value) => {
            if (typeof value === 'string') {
              const arr = value.split(' ');
              console.log(arr);
              const newArr = arr.filter((item) => item.length >= 5);
              console.log(newArr);
              if (arr.length > 3 && newArr) {
                return true;
              }
              return false;
            }
            return value;
          },
          errorMessage: 'Введите минимум 3 слова длиной минимум 5 символов',
        },
        {
          rule: 'required' as Rules,
          errorMessage: 'Поле обязательно для заполнения',
        },
      ])
      .addField('#bank-number', [
        {
          rule: 'number' as Rules,
          errorMessage: 'Должно быть только цифры',
        },
        {
          rule: 'minLength' as Rules,
          value: 16,
          errorMessage: 'Должно быть 16 цифр',
        },
        {
          rule: 'maxLength' as Rules,
          value: 16,
          errorMessage: 'Должно быть 16 цифр',
        },
        {
          rule: 'required' as Rules,
          errorMessage: 'Поле обязательно для заполнения',
        },
      ])
      .addField('#cvv', [
        {
          rule: 'minLength' as Rules,
          value: 3,
          errorMessage: 'Должно быть 3 цифры',
        },
        {
          rule: 'required' as Rules,
          errorMessage: 'Поле обязательно для заполнения',
        },
      ])
      .addField('#month', [
        {
          rule: 'customRegexp' as Rules,
          value: /(^([0]{1})([1-9]{1})$)|(^([1]{1})([0-2]{1})$)/,
          errorMessage: 'Должно быть: от 01 до 12',
        },
        {
          rule: 'required' as Rules,
          errorMessage: 'Поле обязательно для заполнения',
        },
      ])
      .addField('#year', [
        {
          rule: 'customRegexp' as Rules,
          value: /\d{2}/,
          errorMessage: 'Должно быть 2 цифры',
        },
        {
          rule: 'required' as Rules,
          errorMessage: 'Поле обязательно для заполнения',
        },
      ])
      .onSuccess((event) => {
        event?.preventDefault();
        const thanks = createStatusMessage(messages.sucсess, 'status', 'animated', 'slideInDown');
        setTimeout(() => {
          form.reset();
          thanks.remove();
          clearCart();
          closeModal();
          renderCart();
          renderCatalog();
        }, 5000);
      });
  }

  const paymentRegs = [
    {
      name: 'maestro',
      regExp: /^(?:50|5[6-9]|6[0-9])d+$/,
      src: '../assets/images/payments//maestro-original.png',
    },
    {
      name: 'visa',
      regExp: /^4[0-9]\d+$/,
      src: '../assets/images/payments/visa-original.png',
    },
    {
      name: 'amex',
      regExp: /^(34|37)\d+$/,
      src: '../assets/images/payments/american-express-original.png',
    },
    {
      name: 'mastercardId',
      regExp: /(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}/,
      src: '../assets/images/payments/mastercard-original.png',
    },
  ];

  if (form) {
    const id = form.querySelector<HTMLInputElement>('#bank-number');
    const paymentImg = form.querySelector<HTMLImageElement>('.card__logo');
    if (id && paymentImg) {
      id.addEventListener('change', () => {
        const obj = paymentRegs.find((item) => (id.value.match(item.regExp)));
        if(obj) paymentImg.src = obj.src;
      });
    }
  }
}

export default validateForm;
