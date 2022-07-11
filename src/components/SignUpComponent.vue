<template>
  <div class="form-container">
    <form class="ui form" @submit="submitHandler">
      <div class="field">
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          @change="setUsername"
          v-model="getUsername"
        />
      </div>
      <div class="field">
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          @change="setEmail"
          v-model="getEmail"
        />
      </div>
      <div class="field">
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          @change="setPassword"
          v-model="getPassword"
        />
      </div>
      <div class="field">
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          @change="setConfirmPassword"
          v-model="getConfirmPassword"
        />
      </div>
      <vue-recaptcha
        sitekey="6Ld8nNQgAAAAAOOyGDpKeW6iWsz8KAN4zAIuVCrB"
        @render="recaptchaLoaded"
        @verify="verifyRecaptcha"
      ></vue-recaptcha>
      <button
        class="ui button"
        type="submit"
        style="margin-top: 10px; margin-bottom: 10px"
      >
        Submit
      </button>
    </form>

    <p v-if="showError">Please verify that you are not a robot...</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { router } from "./../router/router.js";
import { VueRecaptcha } from "vue-recaptcha";
export default {
  name: "SignUpcomponent",
  data: function () {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      verifiedRecaptcha: false,
      showError: false,
    };
  },
  components: {
    VueRecaptcha,
  },
  methods: {
    ...mapActions(["registerUser"]),
    submitHandler(event) {
      event.preventDefault();
      console.log(
        this.username,
        this.email,
        this.password,
        this.confirmPassword
      );
      if (this.verifiedRecaptcha) {
        this.registerUser({
          name: this.username,
          email: this.email,
          password: this.password,
        });
        router.push("/login");
        this.username = "";
        this.email = "";
        this.password = "";
        this.confirmPassword = "";
      } else {
        this.showError = true;
      }
    },
    setUsername(event) {
      this.username = event.target.value;
    },
    setEmail(event) {
      this.email = event.target.value;
    },
    setPassword(event) {
      this.password = event.target.value;
    },
    setConfirmPassword(event) {
      this.confirmPassword = event.target.value;
    },
    recaptchaLoaded() {
      console.log("captcha loaded");
    },
    verifyRecaptcha(response) {
      this.verifiedRecaptcha = true;
    },
  },
  computed: {
    getUsername() {
      return this.username;
    },
    getEmail() {
      return this.email;
    },
    getPassword() {
      return this.password;
    },
    getConfirmPassword() {
      return this.confirmPassword;
    },
  },
};
</script>

<style>
.form-container {
  padding: 5px;
  margin: 10px;
}
</style>
