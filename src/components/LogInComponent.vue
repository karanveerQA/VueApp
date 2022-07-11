<template>
  <div class="form-container">
    <form class="ui form" @submit="submitHandler">
      <div class="field">
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          @change="setEmail"
          v-model="email"
        />
      </div>
      <div class="field">
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          @change="setPassword"
          v-model="password"
        />
      </div>

      <button class="ui button" type="submit">LogIn</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LogInComponent",
  data: function () {
    return { email: "", password: "" };
  },
  methods: {
    ...mapActions(["logInUser"]),
    submitHandler(event) {
      event.preventDefault();
      console.log(this.email, this.password);
      this.logInUser({
        email: this.email,
        password: this.password,
      });

      this.email = "";
      this.password = "";
    },
    setEmail(event) {
      this.email = event.target.value;
    },
    setPassword(event) {
      this.password = event.target.value;
    },
  },
};
</script>
