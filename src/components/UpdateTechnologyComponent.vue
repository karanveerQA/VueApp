<template>
  <div class="form-container">
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
        <input type="file" @change="setFile" />
      </div>
      <img class="ui medium rounded image" :src="display" />
      <button class="ui button" type="submit">Update</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { router } from "./../router/router";
import Axios from "axios";
export default {
  name: "UpdateListComonent",
  data: function () {
    return { name: "", file: "", id: "", image: "", display: "" };
  },
  computed: {
    ...mapGetters(["allImages"]),
  },
  methods: {
    ...mapActions(["updateTechnology"]),
    setName(event) {
      this.name = event.target.value;
    },

    setFile(event) {
      this.file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("upload_preset", "xk0ixixo");
      Axios.post(
        "https://api.cloudinary.com/v1_1/a12/image/upload",
        formData
      ).then((response) => {
        console.log(response);
        this.display = response.data.secure_url;
      });

      console.log(this.file);
    },

    submitHandler(event) {
      //  img: response.data.secure_url,
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
        this.updateTechnology({
          id: this.image.id,
          name: this.name,
          img: response.data.secure_url,
        });

        alert(" technology updated successfully");

        router.push("/home/images");
      });
    },
  },
  created() {
    this.id = this.$route.params.id;

    for (const image of this.allImages) {
      if (image.id == this.id) {
        this.image = image;
        this.name = image.name;
        this.display = image.img;
        return;
      }
    }
  },
};
</script>

<style>
/* .form-container {
  margin: 10px auto;
  background-color: #eee;
  display: flex;
  justify-content: center; */

img {
  margin-left: 15px;
  margin-bottom: 15px;
}
</style>
