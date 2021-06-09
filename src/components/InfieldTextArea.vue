<template>
  <validation-provider
    :class="className"
    :rules="rules"
    :name="name"
    v-slot="{ errors }"
    slim
  >
    <div class="field">
      <textarea
        :name="name"
        v-model="currentValue"
        :id="name"
        placeholder=" "
        :class="['form__textarea', errors[0] ? 'invalid' : '']"
      ></textarea>
      <label :for="name" class="form__label">{{ label }}</label>
      <span class="error">{{ errors[0] }}</span>
    </div>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

export default {
  name: 'TextArea',
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

.field {
  position: relative;
  width: 360px;
  margin: 25px;
}

.form__textarea {
  width: 100%;
  min-height: 125px;
  border: 2px solid lightgray;
  font-family: inherit;
  outline: none;
  background: none;
  font-size: 16px;
  resize: vertical;
  border-radius: 5px;
  padding: 10px 8px;
}

.form__textarea.invalid {
  border: 2px solid tomato;
}

.form__textarea:hover {
  border-color: darkgray;
}

.form__textarea:focus {
  border-color: cornflowerblue;
}

.form__textarea.invalid:hover,
.form__textarea.invalid:focus {
  border-color: tomato;
}

.form__label {
  position: absolute;
  top: 15px;
  left: -2px;
  padding: 0 5px;
  color: black;
  cursor: text;
  transition: top 200ms ease-in, left 200ms ease-in, font-size 200ms ease-in;
  text-transform: uppercase;
  font-size: 14px;
  color: gray;
  font-weight: 400;
}

.form__textarea:focus + .form__label {
  color: cornflowerblue;
}

.form__textarea.invalid ~ .form__label {
  color: tomato;
}

.form__textarea.invalid:focus + .form__label {
  color: tomato;
}

.form__textarea:focus + .form__label {
  color: cornflowerblue;
}

.form__textarea:focus ~ .form__label,
.form__textarea:not(:placeholder-shown).form__textarea:not(:focus)
  ~ .form__label {
  top: -18px;
  left: -7px;
  font-size: 10px;
  font-weight: 400;
  /* color: cornflowerblue; */
}

/* error */
span.error {
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 500;
  font-size: 10px;
  color: tomato;
}
</style>
