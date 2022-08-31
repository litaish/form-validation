# form-validation
Form validation using JS

Usage:
1. Create FormValidator object `const fv = new FormValidator("#test_form")`
2. Register an input field and a validation rule check function

Two ways to do this:
1. Provide a function for the `register` function. Return object { pass: false, error: "..." } when input value doesn't meet the rules, example:

```js
fv.register('#email', (value, inputField) => {
  if (value.length > 5) {
    return {
      pass: false,
      error: 'Username must be no more than 5 characters',
    };
  }

  return {
    pass: true,
  };
});
```

2. Create an already declared function that can be used for multiple fields, pass in the declared function, example:

```js
function validateLength(value, inputField) {
  if (value.length > 5) {
    return {
      pass: false,
      error: 'Username must be no more than 5 characters',
    };
  }

  return {
    pass: true,
  };
}

fv.register('#username', validateLength)
```

**Note:** fields get validated out of focus. The on "change" event is used on the field.

