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
        :id="name"
        :class="['form__input', errors[0] ? 'invalid' : '']"
        placeholder=" "
        autocomplete="off"
      />
      <label :for="name" class="form__label">{{ label }}</label>
      <span class="error">{{ errors[0] }}</span>
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
  margin: 25px;
}

.form__input {
  width: 100%;
  height: 100%;
  outline: none;
  background: none;
  border: none;
  border-radius: 0px;
  border-bottom: 2px solid lightgray;
  font-family: inherit;
  font-size: 16px;
  padding: 15px 5px;
}

.form__input.invalid {
  border-bottom: 2px solid tomato;
}

.form__input:hover {
  border-color: darkgray;
}

.form__input:focus {
  border-color: cornflowerblue;
}

.form__input.invalid:hover,
.form__input.invalid:focus {
  border-color: tomato;
}

.form__label {
  position: absolute;
  top: 18px;
  left: 5px;
  padding: 0 5px;
  color: black;
  cursor: text;
  transition: top 200ms ease-in, left 200ms ease-in, font-size 200ms ease-in;
  text-transform: uppercase;
  font-size: 14px;
  color: gray;
}

.form__input:focus + .form__label {
  color: cornflowerblue;
}

.form__input.invalid ~ .form__label {
  color: tomato;
}

.form__input.invalid:focus + .form__label {
  color: tomato;
}
.form__input:focus ~ .form__label,
.form__input:not(:placeholder-shown).form__input:not(:focus) ~ .form__label {
  top: -11px;
  left: 0px;
  font-size: 10px;
  font-weight: 400;
}

/* error */
span.error {
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 500;
  font-size: 10px;
  color: tomato;
}

/* autocomplete */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  /* border: 1px solid green; */
  /* -webkit-text-fill-color: green; */
  /* -webkit-box-shadow: 0 0 0px 1000px #000 inset; */
  transition: background-color 5000s ease-in-out 0s;
}
</style>
