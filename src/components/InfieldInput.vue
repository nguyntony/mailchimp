<template>
  <validation-provider
    :class="className"
    :rules="rules"
    :name="name"
    :vid="vid"
    v-slot="{ errors }"
    slim
  >
    <div class="field">
      <input
        :type="type"
        v-model="currentValue"
        autocomplete="off"
        :id="name"
        class="form__input"
        placeholder=" "
      />
      <label :for="name" class="form__label">{{ label }}</label>
      <span>{{ errors[0] }}</span>
    </div>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

export default {
  name: 'TextInput',
  components: { ValidationProvider },
  props: {
    value: {
      type: String,
      default: '',
    },
    rules: {
      type: [String, Object],
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    vid: {
      type: String,
      default: undefined,
    },
    label: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      currentValue: '',
    };
  },
  watch: {
    currentValue(value) {
      this.$emit('input', value);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
label,
input {
  font-family: 'Noto Sans JP', sans-serif;
}
.field {
  position: relative;
  width: 375px;
}

.form__input {
  /* position: absolute; */
  /* top: 0; */
  /* left: 0; */
  width: 100%;
  /* height: 100%; */
  border: 2px solid lightgray;
  border-radius: 5px;
  font-family: inherit;
  /* color: white; */
  outline: none;
  padding: 15px;
  background: none;
}
.form__input:hover {
  border-color: blue;
}
.form__input:focus {
  border-color: red;
}
.form__label {
  position: absolute;
  /* left: 350px; */
  /* top: 5px; */
  left: 0;
  padding: 0 5px;
  color: black;
  cursor: text;
  transition: top 200ms ease-in, left 200ms ease-in, font-size 200ms ease-in;
  background-color: white;
}

.form__input:focus ~ .form__label,
.form__input:not(:placeholder-shown).form__input:not(:focus) ~ .form__label {
  top: -11px;
  font-size: 12px;
  left: 15px;
}
</style>
