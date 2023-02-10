# Валидация формы чистом JavaScript
[Cсылка на демо](https://eduardvorsin.github.io/form-validation/src/index.html)

![Валидация формы](./src//images/validation.jpg)

## Технологии которые использовались при написании
![javascript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![jest](https://img.shields.io/badge/jest-%2399425B.svg?style=for-the-badge&logo=jest&logoColor=%white)
![testing library](https://img.shields.io/badge/testing_library-%23E33332.svg?style=for-the-badge&logo=testing-library&logoColor=white)

## 🧱 `HTML-атрибуты` которые использовались для формы
- `autocomplete` - автозаполнение поля в зависимости от типа значения
- `required` - показывает что поле обязательное
- `minlength` - позволяет указать минимальную длину значения для поля ввода
- `type` - тип поля ввода
- `pattern` - шаблон регулярного выражения для проверки на соответствие значения этому шаблону

## 🎨 Стили
- `is-invalid` - класс который добавляется динамически при условии что поле не проходит валидацию
- `required-star` - стили для красной звездочки которая указывает на то что поле обязательное для ввода
- `no-empty` - класс который назначается полю когда оно не пустое
- `_active` - класс который добавляется кнопке показа/скрытия пароля
Остальные стили просто демонстративные, и могут быть другими

## ♿ Доступность
- `aria-label` - дополнительное описание полей для скринридеров
- `aria-describedby` - связываем элемент ошибки с полем ввода
- `aria-live` - озвучиваем статус видимости пароля
- `aria-invalid` - добавляем и убираем динамически в зависимости от того является ли валидным поле
- Визуальный порядок фокуса соблюден.
- Звездочкой обозначены обязательные поля для ввода

## ⚙️ Cкрипты
### Принцип работы
Пользователь вводит значение в любое из полей, или отмечает чекбокс/radio кнопку и на его взаимодействие срабатывает функция с валидацией этого поля спустя фиксированное время, если поле не валидное то выводиться соответствующее  сообщение о том что же не так с конкретным полем. Валидация срабатывает как при введении значения так и при нажатии кнопки `submit`

### Структура
- `main.js` - главный файл где в зависимости от того валидно ли эмейл поля можно добавить логику отправки формы. Также содержит вызов функции debounce

- `validationUtils` - файл в котором находится функции на проверку является ли переданный элемент инпутом нужного типа, а также функция для переключения видимости пароля при нажатии на специальную кнопку

- `validators.js` - файл в котором хранятся функции для валидации.
Эти функции условно можно разделить на 2 типа:
1. Непосредственно сами валидирующие функции, т.е функции которые проверяют поле ввода и выводят ошибки
1. Функции предикаты, которые начинаются со слов has/is, используются для проверки значений на соответствие заданным критериям

- `validationErrors.js` - файл в котором хранятся функции для показа и скрытия сообщений об ошибках.

- `validationReducer.js` - файл в котором хранятся константы имен полей ввода а также функция редьюсер которая в зависимости от имени поля ввода вызывает необходимую функцию валидации

### main.js
- `noValidate` - свойство с помощью которого можно отключить нативную браузерную валидацию

### validationUtils.js
- `isInputField(input)` - функция которая проверяет имеет ли инпут один из следующих типов: `text`, `password`, `email`, `url`
- `changePasswordVisibillity(passwordInput)` - меняет тип поля с паролем на `text` или наоборот на `password` если было текстовое поле

### validationErrors.js
- `showError(input,message)` - показывает ошибку с определенным сообщением для переданного поля ввода
- `hideError(input)` - скрывает ошибку которая показывалась для поля ввода

### validators.js
- `validationRules` - объект в котором в качестве ключей хранятся поля к которому будут применены функции валидаций, а в качестве значений сами функции для валидации
- `validateUsername`, `validateEmail`, `validatePassword`,`validateConfirmPassword`, `validatePrivacyPolicy`,`validateCommunicationMethod`, `validateForm`, `validateRulesForInput` - функции для валидации полей формы, самой формы и объекта правил, все в качестве результата возвращают boolean значение, которое свидетельствует о том валидно ли поле ввода/форма или нет

### validationReducer.js
- `ValidationFields` - объект содержащий имена полей ввода
- `validationReducer(input)` - функция которая вызывает необходимую функцию валидации в зависимости от имени инпута

## ✨ Особенности
- Полностью кастомная валидация формы, без использования нативной браузерной
- Имеет возможность кастомизации правил для валидации