export const Pattern = {
  EMAIL_PATTERN: /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-\]+)*(\.[A-Za-z]{2,})$/,
  USERNAME_PATTERN: /^[a-z0-9_-]{1,32}$/,
  NAME_PATTERN: /^((?![\~\!\@\#\$\%\^\&\*\(\)\\-\_\+\"\'\:\;\<\,\>\.\?\/\|\\`]).)*$/,
  PHONE_PATTERN: /^\+?\(?([0-9]{1,4})\)?(([ .-]?)(\(?)([0-9]{1,5})(\)?)){3,4}$/,
  PASSWORD_PATTERN: /^.{6,}$/,
  DEFAULT_DATE_FORMAT: 'MM/DD/YYYY HH:mm:ss',
  WEBSITE_PATTERN: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/,
  PRICE_PATTERN: /^(\d{1,26})(\.\d{1,5})?$/,
  DIGITS_PATTERN: /^\d*$/
};
