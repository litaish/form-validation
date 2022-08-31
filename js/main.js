import FormValidator from './validator.js';

const fv = new FormValidator('#test_form');

fv.register('#email', (value, inputField) => {
  const REGEX_EMAIL_HTML = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!value.match(REGEX_EMAIL_HTML)) {
    return {
      pass: false,
      error: 'E-mail is not in valid format',
    };
  }

  return {
    pass: true,
  };
});

fv.register('#country', (value, inputField) => {
  if (value.length > 56 || value.length < 3) {
    return {
      pass: false,
      error: 'Country name must be between 3 and 56 characters long',
    };
  }

  return {
    pass: true,
  };
});

fv.register('#zip', (value, inputField) => {
  const REGEX_LV_POSTAL_CODE = /^(LV-)[0-9]{4}$/; // Pattern matches lv-1010 LV-1013, no match LV1010 LV 1010 lv819

  if (!value.match(REGEX_LV_POSTAL_CODE)) {
    return {
      pass: false,
      error: 'Zip code is not in valid format. Use LV-XXXX',
    };
  }

  return {
    pass: true,
  };
});

fv.register('#password', (value, inputField) => {
  const REGEX_PASSWORD = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/; // Password uppercase, lowercase, number or special char and minimum 8 numbers

  if (!value.match(REGEX_PASSWORD)) {
    return {
      pass: false,
      error: 'Password must contain uppercase, lowercase characters, a number or special character and be minimum of 8 characters long',
    };
  }

  return {
    pass: true,
  };
});

fv.register('#password_confirm', (value, inputField) => {
  const pswd = document.getElementById('password');

  if (value !== pswd.value) {
    return {
      pass: false,
      error: 'Passwords must be the same',
    };
  }

  return {
    pass: true,
  };
});

window.fv = fv;
