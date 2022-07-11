<template>
  <div class="form-container" v-if="isLoggedIn">
    <form class="ui form" @submit="submitHandler">
      <div class="field">
        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          @change="setName"
          v-model="name"
        />
      </div>
      <div class="field">
        <label></label>
        <input type="file" @change="setFile" />
      </div>

      <div class="image-container">
        <img v-if="image" v-bind:src="image" />
        <button class="ui button" type="submit">Create</button>
      </div>
    </form>
  </div>

  <div class="ui message" v-else>
    <div class="header"></div>
    <p>You are not logged in ...</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Axios from "axios";
import { router } from "./../router/router";
import { tsMethodSignature } from "@babel/types";
export default {
  name: "CreateTechnologyComponent",
  data: function () {
    return { name: "", file: "", image: null };
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  methods: {
    ...mapActions(["createTechnology"]),
    setName(event) {
      this.name = event.target.value;
    },

    setFile(event) {
      this.file = event.target.files[0];
      //window.localStorage.setItem("file", this.file);
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("upload_preset", "xk0ixixo");
      Axios.post(
        "https://api.cloudinary.com/v1_1/a12/image/upload",
        formData
      ).then((response) => {
        console.log(response);
        this.image = response.data.secure_url;
      });

      console.log(this.file);
    },

    submitHandler(event) {
      console.log(this.name);
      console.log(this.file);
      event.preventDefault();

      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("upload_preset", "xk0ixixo");
      Axios.post(
        "https://api.cloudinary.com/v1_1/a12/image/upload",
        formData
      ).then((response) => {
        console.log(response);
        this.createTechnology({
          name: this.name,
          img: response.data.secure_url,
          likeCount: 0,
          dislikeCount: 0,
        });

        alert(" technology created successfully");

        router.push("/home/images");
      });
    },
  },
};
</script>

<style>
.image-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
