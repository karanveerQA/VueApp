<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { router } from "@/router/router";
import { mapGetters } from "vuex";
export default {
  name: "HomeComponent",

  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  created() {
    if (this.isLoggedIn) {
      router.push("/home/images");
    }
  },
};
</script>
