<template>
  <div id="mailchimp-sub-form">
    <!-- form -->
    <div v-if="!formState.completed">
      <h1>Mailchimp Subscriber Form</h1>
      <validation-observer v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <!-- first name -->
          <validation-provider
            name="first-name"
            rules="required|alpha"
            v-slot="{ errors }"
          >
            <div class="field">
              <label>First Name</label>
              <input type="text" v-model="formData.firstName" />
              <span class="error">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <!-- last name -->
          <validation-provider
            name="last-name"
            rules="required|alpha"
            v-slot="{ errors }"
          >
            <div class="field">
              <label>Last Name</label>
              <input type="text" v-model="formData.lastName" />
              <span class="error">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <!-- email -->
          <validation-provider
            name="email"
            rules="required|email"
            v-slot="{ errors }"
          >
            <div class="field">
              <label>Email</label>
              <input type="email" v-model="formData.email" />
              <span class="error">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <!-- submit -->
          <input type="submit" value="Submit" />
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
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import * as rules from '../utils/validation';
import axios from 'axios';

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
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
    };
  },
  methods: {
    async onSubmit() {
      // console.log(this.formData);
      // this.formState.completed = !this.formState.completed;
      // this.formState.loading = !this.formState.loading;
      // setTimeout(() => {
      //   this.formState.loading = !this.formState.loading;
      //   // do some checking for whether it was successful or not.
      //   this.formState.message = 'Thank you!';
      // }, 5000);
      // after validation the user will submit their data
      this.formState.completed = !this.formState.completed;
      // this will trigger the loading animation
      this.formState.loading = !this.formState.loading;
      // call
      const resp = await axios.post('/route', this.formData);
      // depending on resp, do if statement
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
