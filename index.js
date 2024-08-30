const form = document.forms.form__contacts;
const inputList = Array.from(form.querySelectorAll(".form__input"));
const nameInput = form.elements.name;
const emailInput = form.elements.email;
const phoneInput = form.elements.phone;
const nameError = form.querySelector(".name-error");
const emailError = form.querySelector(".email-error");
const phoneError = form.querySelector(".phone-error");
const formSubmitBtn = form.querySelector(".form__button");

const namePattern =  /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const phonePattern = /^[+]+7[0-9]{10}$/;

const patternMap = {
  name: namePattern,
  email: emailPattern,
  phone: phonePattern,
};

const errorElementMap = {
  name: nameError,
  email: emailError,
  phone: phoneError,
};

//показать ошибку
const showInputError = (input, errorElement) => {
  errorElement.classList.add(`${input.id}-error_active`);
};

//скрыть ошибку
const hideInputError = (input, errorElement) => {
  errorElement.classList.remove(`${input.id}-error_active`);
};

//проверить валидность поля ввода
const checkInputValidity = (inputElement, pattern, errorElement) => {
  if (!inputElement.value.match(pattern)) {
    showInputError(inputElement, errorElement);
    return false;
  } else {
    hideInputError(inputElement, errorElement);
    return true;
  }
};

//установить состояние кнопки
function disableSubmitBtn(boolean) {
  if (boolean == false) {
    formSubmitBtn.removeAttribute("disabled");
    formSubmitBtn.classList.remove("form__button:disabled");
  } else {
    formSubmitBtn.setAttribute("disabled", true);
    formSubmitBtn.classList.add("form__button:disabled");
  }
}

disableSubmitBtn(true);

//проверить валидность формы
const checkFormValidity = () => {
  const isNameValid = namePattern.test(nameInput.value);
  const isEmailValid = emailPattern.test(emailInput.value);
  const isPhoneValid = phonePattern.test(phoneInput.value);

  if (isNameValid && isEmailValid && isPhoneValid) {
    disableSubmitBtn(false);
  } else {
    disableSubmitBtn(true);
  }
};

//слушатели события инпут на поля ввода
const setEventListeners = () => {
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(
        inputElement,
        patternMap[inputElement.id],
        errorElementMap[inputElement.id]
      );
      checkFormValidity();
    });
  });
};

setEventListeners();

//слушатель события на сабмит формы
form.addEventListener("submit", (event) => {
  event.preventDefault();
  //добавить отправку данных на сервер
  form.reset();
  disableSubmitBtn(true);
});
