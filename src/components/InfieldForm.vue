<template>
  <div id="infield">
    <!-- boilerplate -->
    <router-link to="/">Home</router-link>
    <h1>Infield Style</h1>
    <div class="description">
      <p>
        Form that is dressed up with some standard design elements. See
        <span class="highlight">'components/InfieldForm'</span> for more
        information.
      </p>
    </div>

    <!-- form -->
    <div>
      <validation-observer v-slot="{ handleSubmit, invalid }" slim>
        <form @submit.prevent="handleSubmit(onSubmit)">
          <!-- name -->
          <infield-input
            v-model="formData.name"
            name="name"
            rules="required|alpha"
            label="Name"
          />

          <!-- company -->
          <!-- <infield-input
            v-model="formData.company"
            name="company"
            label="Company"
          /> -->

          <!-- email -->
          <!-- <infield-input
            v-model="formData.email"
            name="email"
            rules="required|email"
            label="Email"
          /> -->

          <!-- message -->
          <!-- <infield-input
            v-model="formData.message"
            name="message"
            label="Message"
            type="textarea"
          /> -->
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import InfieldInput from './InfieldInput';
import * as rules from '../utils/validation';

export default {
  name: 'InfieldForm',
  components: { ValidationObserver, InfieldInput },
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
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-content: center;
  /* position: relative; */
}
</style>
