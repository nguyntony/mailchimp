import { extend } from 'vee-validate';
import { required, alpha, email, min_value, is } from 'vee-validate/dist/rules';

//  custom messages for rules
extend('required', {
  ...required,
  message: 'This field is required',
});
extend('alpha', {
  ...alpha,
  message: 'Please enter a valid name',
});
extend('email', {
  ...email,
  message: 'Please enter a valid email',
});
extend('min_value', {
  ...min_value,
  message: 'Please enter a valid age',
});
extend('honeypot', {
  message: (field) => `This ${field} should NOT be filled out.`,
  validate: (value) => {
    return value.length === 0 ? true : false;
  },
});
