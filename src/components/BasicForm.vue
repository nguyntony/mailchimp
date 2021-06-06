<template>
  <div id="basic-form">
    <h1>Basic Form</h1>
    <p>This is a standard form.</p>
    <validation-observer v-slot="{ handleSubmit, invalid }" slim>
      <form @submit.prevent="handleSubmit(onSubmit)">
        <!-- first name -->
        <validation-provider>
          <div class="field">
            <label>First Name</label>
            <input type="text" />
          </div>
        </validation-provider>
        <validation-provider>
          <div class="field">
            <label>Last Name</label>
            <input type="text" />
          </div>
        </validation-provider>
        <validation-provider>
          <div class="field">
            <label>Age</label>
            <input type="number" />
          </div>
        </validation-provider>
        <validation-provider>
          <div class="field">
            <label>Gender</label>
            <input type="number" />
          </div>
        </validation-provider>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import * as rules from '../utils/validation';

export default {
  components: { ValidationObserver, ValidationProvider },
};
</script>

<style></style>
