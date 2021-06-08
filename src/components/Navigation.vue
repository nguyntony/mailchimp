<template>
  <div id="home">
    <h1>Timbergrove Forms</h1>
    <div class="description">
      <p>
        A collection for form examples/templates that can be used for various
        projects. The forms utilize vee-validate which handles form validation
        and allows for customization such as errors, styling, etc.
      </p>
      <p>
        These forms also use axios to make the calls wherever needed.
      </p>
    </div>

    <nav>
      <ul>
        <li><router-link to="/basic">Basic Form</router-link></li>
        <li>
          <router-link to="/mailchimp-subscribe"
            >Mailchimp Subscribe</router-link
          >
        </li>
        <li>
          <router-link to="/infield">Infield Style</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style>
nav ul {
  display: flex;
  flex-direction: column;
  list-style-type: none;
}
nav ul li {
  margin: 5px 0;
}
</style>
