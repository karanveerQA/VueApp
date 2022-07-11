<template>
  <div class="ui secondary pointing menu">
    <router-link to="/home/images" class="active item"> Home </router-link>
    <router-link to="/about" class="item"> AboutUs </router-link>

    <router-link to="/contactus" class="item"> ContactUs </router-link>
    <router-link to="/home/create" class="item"> Create </router-link>

    <div class="right menu">
      <router-link to="/signup" class="ui item"> SignUp </router-link>
      <router-link to="/login" class="ui item" v-if="!isLoggedIn">
        LogIn
      </router-link>
      <a class="ui item" v-else v-on:click="logOutUser"> LogOut </a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "NavMenuComponent",

  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  methods: {
    ...mapActions(["logOutUser"]),
  },
};
</script>
