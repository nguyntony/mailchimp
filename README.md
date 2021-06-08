# MailChimp Vue Component

## Mailchimp Setup
This component assumes that the project already has an existing MailChimp account. We will need the `audience ID or list ID` and that can be found like [this](https://mailchimp.com/help/find-audience-id/). If the project does not have an audience, you will need to go through the steps of creating one, like [this](https://mailchimp.com/help/create-audience/).

The component will also need access to the MailChimp `API key`. It can be found or generated like [this](https://support.checkfront.com/hc/en-us/articles/115004180154-Mailchimp-Setup-API-Key).

1. Ensure that information is inside of your `.env` file
```
MAILCHIMP_API_KEY=
MAILCHIMP_LIST_ID=
```
2. We will also need to set up the `config/app.php`
```
'mailchimp_api_key' => env('MAILCHIMP_API_KEY'),
'mailchimp_list_id' => env('MAILCHIMP_LIST_ID')
```
Note: Inside of the `config/app.php` files you may place these lines at the very bottom. This file will include arrays and such, just comma after it and paste the lines in. 

## PHP Setup
This is needed because making requests on the client side may result in a CORS error. So this setup will bypass that issue since we are making the requests from the server side.

You will need this [package](https://github.com/drewm/mailchimp-api).

Note: This repo contains a `php/` directory that contains an example of the files that are needed but the files are not in their respective locations, meaning the files will be in a different folder structure that is pertinent to your project.

## Controllers
Inside of `app/Http/Controllers`, you will need to create another controller file there to handle the form submission. 

1. Inside of that file you will need this code: 
```php
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use \DrewM\MailChimp\MailChimp;

class MailchimpController extends Controller
{
  public function subscribe() 
  {
    // you will need the mailchimp api key
    $MailChimp = new MailChimp(config("app.mailchimp_api_key"));
    // you will need the mailchimp list_id
    $list_id = config("app.mailchimp_list_id");

    // grab user data
    $firstName = request()->input('firstName');
    $lastName = request()->input('lastName');
    $userEmail = request()->input('email');

    // create the subscription
    $result = $MailChimp->post("lists/$list_id/members", [
      'email_address' => $userEmail,
      'status' => 'subscribed',
      'merge_fields' => [
        'FNAME' => $firstName,
        'LNAME' => $lastName
      ]
    ]);

    return 'successful';
  }
}
```

### Routers
You will need to create POST routes for the calls that you are making. Go to the `routes/web.php` file. Import the controller that you created in the step before. `use App\Http\Controllers\MailchimpController`

1. Create a route like so: `Route::post('/mailchimpsub', [MailchimpController::class, 'subscribe']);`
2. `'/mailchimpsub'` this will be the POST route that you will give to your Vue component. It is where you are sending the data.
3. `MailchimpController::class` this corresponds with the controller file that you created in the step before.
4. `'subscribe'` this is the function that you created inside of your controller class.

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
  route: '',
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
  const resp = await axios.post(this.route, this.formData);
	
  // depending on resp, do if statement
  // stop the loading animation
  this.formState.loading = !this.formState.loading;
  // console.log(resp);
  if (resp.data === 'successful') {
    this.formState.message = "thank you for signing up."
  } else {
    this.formState.message = "please try again."
  }
},
```

## Statamic
Using the foundation and knowledge of what I’ve talked about so far. You are able to apply it to statamic forms, therefore submitting information to statamic and being able to integrate vue frameworks such as the `vee-validate`.

In order to use the component for Statamic, there a few things that you must gather:

- When creating a form in the statamic CP, you will have an option to assign the handle to the form. This handle is important because it will be the POST route that you will submit the data.

Above, I created a vue component with route as one of the properties, it is best to assign this statamic route to that property. You must prepend the route with:
`/!/forms/{form_name}`, just replace `{form_name}` with the form’s handle.

- From here you should recreate the form inside of Vue. In order to have a successful submission, ensure that you match the data properties with the corresponding form handle names. For example, if your statamic form requires the first name, last name and email. 

Then statamic may assign the handle for these fields such as…
	- First Name => first_name
	- Last Name => last_name
	- Email => email
	
The important thing here is that the slug/handle (whatever it is) should match the vue data properties…
```
data() {
	return {
		formData: {
			first_name: "",
			last_name: "",
			email: "",		
		}
  }
}
``` 
It is important to note that I’d like to store the user data inside of another object which makes it easier to send in the POST. 

Because of this naming convention you may need resort to using bracket notation for your v-model. 
```html
<input type="text" v-model="formData['first_name']"/>
```

## Resources for later
- [Cross Field Validation](https://vee-validate.logaretm.com/v3/advanced/cross-field-validation.html#targeting-other-fields) (Password and Confirmation)
- [Refactoring](https://vee-validate.logaretm.com/v3/advanced/refactoring-forms.html#extracting-input-fields)