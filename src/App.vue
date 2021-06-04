<template>
  <div id="app">
    <mailchimp-sub-form />
  </div>
</template>

<script>
import MailchimpSubForm from './components/MailchimpSubForm';

export default {
  name: 'App',
  components: { MailchimpSubForm },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
