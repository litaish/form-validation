export default class FormValidator {
  // Params: selector - form element
  constructor(selector) {
    this.form = document.querySelector(selector);
    // Set of every single input field that has errors
    this.inputsWithErrors = new Set();
    this.form.addEventListener('submit', (e) => {
      // Prevent the form from submitting
      e.preventDefault();
      if (!this.hasErrors) {
        this.form.submit();
      }
    });
  }

  get hasErrors() {
    return this.inputsWithErrors.size > 0;
  }

  // Register a new form validation rule
  // Params: selector - input field selector
  // check - function that checks if a specific input field is valid
  register(selector, check) {
    // Get the selector on form element ONLY
    const inputField = this.form.querySelector(selector);
    const errorElement = inputField
      .closest('.form-row')
      .querySelector('.error');

    // Check if a field is valid
    const execute = (hideErrors) => {
      const { pass, error } = check(inputField.value, inputField);

      if (!hideErrors) {
        errorElement.textContent = error || '';
      }

      if (!pass) {
        this.inputsWithErrors.add(inputField);
      } else {
        this.inputsWithErrors.delete(inputField);
      }
    };

    // On each change on input field, call execute function
    inputField.addEventListener('change', () => execute());
    // On page load, hide errors (true)
    execute(true);
  }
}
