<template>
  <div id="basic-form">
    <!-- boilerplate -->
    <router-link to="/">Home</router-link>
    <h1>Basic Form</h1>
    <div class="description">
      <p>
        This is a standard form. See
        <span class="highlight">'components/BasicForm'</span> for more
        information.
      </p>
    </div>

    <!-- form -->
    <div v-if="!formState.completed">
      <validation-observer v-slot="{ handleSubmit, invalid }" slim>
        <form @submit.prevent="handleSubmit(onSubmit)">
          <!-- first name -->
          <validation-provider
            name="first-name"
            rules="required|alpha"
            v-slot="{ errors }"
            slim
          >
            <div class="field">
              <label>First Name</label>
              <input
                type="text"
                v-model="formData.firstName"
                :class="errors[0] ? 'invalid' : 'valid'"
              />
              <span class="error">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <!-- last name -->
          <validation-provider
            name="last-name"
            rules="required|alpha"
            v-slot="{ errors }"
            slim
          >
            <div class="field">
              <label>Last Name</label>
              <input
                type="text"
                v-model="formData.lastName"
                :class="errors[0] ? 'invalid' : 'valid'"
              />
              <span class="error">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <!-- age -->
          <validation-provider
            name="age"
            rules="required|min_value:1"
            v-slot="{ errors }"
            slim
          >
            <div class="field age">
              <label>Age</label>
              <input
                type="number"
                v-model="formData.age"
                :class="errors[0] ? 'invalid' : 'valid'"
              />
              <span class="error">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <!-- gender -->
          <validation-provider>
            <div class="field">
              <label>Gender</label>
              <select v-model="formData.gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-Binary</option>
              </select>
            </div>
          </validation-provider>

          <!-- terms -->
          <validation-provider
            name="terms"
            :rules="{ required: { allowFalse: false } }"
            v-slot="{ errors }"
            slim
          >
            <div class="terms">
              <input type="checkbox" v-model="formData.terms" id="terms" />
              <label for="terms">I agree to terms & conditions</label>
              <br />
              <span class="error">{{ errors[0] }}</span>
            </div>
          </validation-provider>

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
      <h2>{{ formState.message }}</h2>
      <p>We will never share your information with anyone else.</p>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import * as rules from '../utils/validation';

export default {
  name: 'BasicForm',
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        age: null,
        gender: null,
        terms: false,
      },
      formState: {
        completed: false,
        loading: false,
        message: '',
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.formData);
      this.formState.completed = !this.formState.completed;
      this.formState.loading = !this.formState.loading;
      setTimeout(() => {
        this.formState.loading = !this.formState.loading;
        // do some checking for whether it was successful or not.
        this.formState.message = 'Thank you!';
      }, 3000);
    },
  },
};
</script>

<style>
.terms {
  margin-bottom: 25px;
}

.age {
  width: 200px;
  margin: 0 auto;
}

input.invalid {
  border: 2px solid red;
  border-radius: 4px;
}
</style>
