import { extend } from 'vee-validate';
import { required, alpha, email } from 'vee-validate/dist/rules';

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
