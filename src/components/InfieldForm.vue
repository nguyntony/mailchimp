<template>
  <div id="infield">
    <!-- boilerplate -->
    <router-link to="/">Home</router-link>
    <h1>Infield Style</h1>
    <div class="description">
      <p>
        Form that is inspired by StateBuilt. Has some UI validation elements.
        See
        <span class="highlight">'components/InfieldForm'</span> for more
        information.
      </p>
    </div>

    <!-- form -->
    <div>
      <validation-observer v-slot="{ handleSubmit, invalid }" slim>
        <form @submit.prevent="handleSubmit(onSubmit)">
          <!-- <h2>Hello</h2> -->
          <!-- name -->
          <infield-input
            v-model="formData.name"
            name="name"
            rules="required|alpha_spaces"
            label="Name"
          />

          <!-- company -->
          <infield-input
            v-model="formData.company"
            name="company"
            label="Company"
          />

          <!-- email -->
          <infield-input
            v-model="formData.email"
            name="email"
            rules="required|email"
            label="Email"
          />

          <!-- message -->
          <infield-text-area
            v-model="formData.message"
            name="message"
            rules="required"
            label="Message"
          />

          <!-- submit -->
          <input type="submit" value="submit" />
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import InfieldInput from './InfieldInput';
import InfieldTextArea from './InfieldTextArea';
import * as rules from '../utils/validation';

export default {
  name: 'InfieldForm',
  components: { ValidationObserver, InfieldInput, InfieldTextArea },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        company: '',
        message: '',
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.formData);
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  margin: auto;
}

.description {
  margin-bottom: 0px;
}

input[type='submit'] {
  padding: 15px 20px;
  align-self: flex-end;
  margin-right: 10px;
  cursor: pointer;
  background-color: cornflowerblue;
  outline: none;
  border: none;
  font-family: 'Noto Sans JP', sans-serif;
  text-transform: uppercase;
  color: #fcf8f4;
  font-weight: 500;
}

input[type='submit']:hover {
  background-color: #0b5a96;
}

h2 {
  margin: 0px;
  align-self: flex-start;
  text-transform: uppercase;
  font-weight: 900;
  font-size: 20px;
  margin-left: 13px;
}
</style>
