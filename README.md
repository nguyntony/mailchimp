# MailChimp Vue Component
## PHP Setup
This is needed because making requests on the client side may result in a CORS error. So this setup will bypass that issue since we are making the requests from the server side.

You will need this [package](https://github.com/drewm/mailchimp-api).

### Controllers
You will need to create another file that will be the designated controller file. 

1. Import the existing `controller` file and the `mailchimp API` package that we installed above. 

``` php
use App\Http\Controllers\Controller;
use \DrewM\MailChimp\MailChimp;
``` 

2. Create the controller by extending the existing `controller` file that was imported in the step before. 

``` php 
class MailChimpController extends Controller {}
```

3. You will now create functions inside of this controller that will handle the subscriptions. 

4. After the functions are created, then declare these functions in the `routes/web.php` file. 

The routes here are the actual routes that is used in the Vue axios call. 

## Vee-Validate
To handle form validations in vue, we are going to be using [vee-validate](https://vee-validate.logaretm.com/v3/guide/basics.html)

### Rules 
When installing vee-validate, by default there are no rules included in the installation. It is recommended to create a file `utils/validation.js`.

- In the `validation.js` file, this is where you will import the necessary rules for your form. You may also edit the message for each rule. See [Rules](https://vee-validate.logaretm.com/v3/guide/rules.html#rules), for all available rules. 
- [Importing rules](https://vee-validate.logaretm.com/v3/guide/rules.html#importing-the-rules)

### General Usage
Create a form component 
1. `import {ValidationProvider, ValidationObserver} from 'vee-validate'`
2. `import * as rules from 'utils/validation.js'`
3. Wrap `ValidationObserver` component around your form. 
4. Wrap `ValidationProvider` component around each field.

### ValidationObserver
Visit [ValidationObserver](https://vee-validate.logaretm.com/v3/api/validation-observer.html#validation-observer), for more information. There is syntax that you have to watch out for, for the initial setup. This is important to ensure that the form submission will be handled correctly. 

It is crucial to validate before you submit and the `ValidationObserver` will allow you to do that. Visit [ValidationObserver Syntax](https://vee-validate.logaretm.com/v3/guide/forms.html#validate-before-submit) to see how to properly set up your form. 

### ValidationProvider
Visit [ValidationProvider](https://vee-validate.logaretm.com/v3/api/validation-provider.html#validation-provider), for more information. You will wrap each field with the `ValidationProvider` component. To assign rules for that particular field, include the `rules` attribute to the component and pass in the rules that you’d like from the `utils/validation.js`

You are able to chain on multiple rules to a field by using the `|`. For example, 
```js
<validation-provider
	name="first-name"
	rules="required|alpha"
	v-slot="{ errors }">
```
The first name field will be validated with the required and alpha rule.


### Vue Form Setup
Ensure that you are using two-way binding for the fields. You will need to create the appropriate data for the form. Here is an example:
```js
data() {
return {
  formData: {
    firstName: '',
    lastName: '',
    email: '',
  },
  formState: {
    completed: false,
    loading: false,
    message: '',
  },
};
},
```
We are creating an object, `formData`, which will possess all of the desired user information. This makes it so that when we are sending this data along with the request, you can simply send this property. 

Note that I am also creating a `formState` which describes the different phases that the form will undergo, this makes it so that we can include a loading animation for during the call and displaying the appropriate message based on the response.

## Axios
[Axios](https://www.npmjs.com/package/axios). The axios call will occur within the `onSubmit()` that we passed to the `handleSubmit()` that the `ValidationObserver` utilizes. 

Your `onSubmit()` may look something like this:
```js
async onSubmit() {
  // after validation the user will submit their data
  this.formState.completed = !this.formState.completed;

  // this will trigger the loading animation
  this.formState.loading = !this.formState.loading;

  // call
  const resp = await axios.post('/route', this.formData);

  // depending on resp, do if statement
},
```