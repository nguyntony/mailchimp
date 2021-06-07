<template>
  <div id="app">
    <router-view></router-view>
    <!-- <mailchimp-sub-form /> -->
    <!-- <basic-form /> -->
  </div>
</template>

<script>
import MailchimpSubForm from './components/MailchimpSubForm';
import BasicForm from './components/BasicForm';

export default {
  name: 'App',
  components: { MailchimpSubForm, BasicForm },
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

.description {
  max-width: 575px;
  margin: 0 auto;
  margin-bottom: 50px;
}

.highlight {
  background-color: rgb(100, 149, 237, 0.4);
  font-style: italic;
}
</style>
