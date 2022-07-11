<template>
  <NavMenuComponent></NavMenuComponent>
  <router-view></router-view>
</template>

<script>
import NavMenuComponent from "./components/NavMenuComponent.vue";
import { mapGetters } from "vuex";
import { router } from "./router/router";
export default {
  name: "App",
  components: {
    NavMenuComponent,
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  created() {
    console.log(this.isLoggedIn);
    if (this.isLoggedIn) {
      router.push("/home/images");
    }
  },
};
</script>
