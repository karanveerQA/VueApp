<template>
  <div class="grid_container" v-if="isLoggedIn">
    <div class="card" v-for="image in allImages">
      <p>{{ image.name }}</p>
      <img v-bind:src="image.img" height="259" width="250" />
      <div>
        <button class="green_btn" @click="updateLikeCount(image)">like</button>
        <button class="red_btn" @click="updateDislikeCount(image)">
          dislike
        </button>
      </div>
      <div>
        <button class="btn">{{ image.likeCount }}</button>
        <button class="btn">{{ image.dislikeCount }}</button>
      </div>
      <div>
        <button
          class="ui inverted blue button"
          @click="updateTechnology(image.id)"
        >
          Update
        </button>
      </div>
    </div>
  </div>
  <div class="ui message" v-else>
    <div class="header"></div>
    <p>You are not logged in ...</p>
  </div>
</template>

<script>
import { router } from "@/router/router";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ImageListComponent",
  methods: {
    ...mapActions(["fetchImages", "updateLike", "updateDislike"]),
    updateLikeCount(image) {
      console.log(image);
      this.updateLike(image);
    },
    updateDislikeCount(image) {
      this.updateDislike(image);
    },
    updateTechnology(id) {
      router.push("/home/update/" + id);
    },
  },
  computed: {
    ...mapGetters(["allImages", "isLoggedIn"]),
  },
  created() {
    this.fetchImages();
  },
};
</script>

<style scoped>
.grid_container {
  margin-top: 10px;
  margin-left: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  column-gap: 10px;
  row-gap: 10px;
}

.card {
  height: 500px;
  width: 300px;
  padding: 5px;
}

.green_btn,
.red_btn,
.btn {
  height: 50px;
  width: 100px;
  border: none;
  border-radius: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
}

.green_btn {
  background-color: green;
}

.red_btn {
  background-color: red;
}
</style>
