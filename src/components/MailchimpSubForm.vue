<template>
  <div id="mailchimp-sub-form">
    <router-link to="/">Home</router-link>
    <h1>Mailchimp Subscriber Form</h1>
    <div class="description">
      <p>
        Mailchimp subscribe form based on Fivestone. See
        <span class="highlight">'components/MailchimpSubForm'</span>
        for more information.
      </p>
    </div>

    <!-- form -->
    <div v-if="!formState.completed">
      <validation-observer v-slot="{ handleSubmit, invalid }" slim>
        <form @submit.prevent="handleSubmit(onSubmit)">
          <!-- first name -->
          <text-input
            v-model="formData.firstName"
            name="firstName"
            rules="required|alpha"
            label="First Name"
            className="field"
          />

          <!-- last name -->
          <text-input
            v-model="formData.lastName"
            name="lastName"
            rules="required|alpha"
            label="Last Name"
            className="field"
          />

          <!-- email -->
          <text-input
            v-model="formData.email"
            type="email"
            name="email"
            rules="required|email"
            label="Email"
            className="field"
          />

          <text-input
            type="input"
            name="honeypot"
            rules="honeypot"
            label="HoneyPot"
            className="field"
          />

          <!-- submit -->
          <input type="submit" value="Submit" :disabled="invalid" />
        </form>
      </validation-observer>
    </div>

    <!-- loading -->
    <div v-else-if="formState.loading">
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

    <!-- message -->
    <div v-else>
      <h1>{{ formState.message }}</h1>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import TextInput from './TextInput';
import * as rules from '../utils/validation';
import axios from 'axios';

export default {
  name: 'MailChimpSubscribeForm',
  components: {
    ValidationObserver,
    TextInput,
  },
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
      route: 'blah', // insert POST route.
    };
  },
  methods: {
    async onSubmit() {
      console.log(this.formData);
      this.formState.completed = !this.formState.completed;
      this.formState.loading = !this.formState.loading;
      setTimeout(() => {
        this.formState.loading = !this.formState.loading;
        // do some checking for whether it was successful or not.
        this.formState.message = 'Thank you!';
      }, 5000);
      // after validation the user will submit their data
      // this.formState.completed = !this.formState.completed;
      // this will trigger the loading animation
      // this.formState.loading = !this.formState.loading;
      // call
      // const resp = await axios.post(this.route, this.formData);
      // depending on resp, do if statement
    },
    capitalize(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
  },
};
</script>

<style>
.field {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
}

.off {
  display: none;
}

.field input {
  height: 30px;
  width: 50%;
}

span.error {
  color: red;
}

/* spinner */
.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: ' ';
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: salmon;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
