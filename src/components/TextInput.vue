<template>
  <validation-provider
    :class="className"
    :rules="rules"
    :name="name"
    :vid="vid"
    v-slot="{ errors }"
    slim
  >
    <label>{{ label }}</label>
    <input :type="type" v-model="currentValue" />
    <span>{{ errors[0] }}</span>
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

<style></style>
