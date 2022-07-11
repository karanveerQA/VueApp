const state = {
  images: [],
};

const getters = {
  allImages(state) {
    return state.images;
  },
};

const mutations = {
  setImages(state, images) {
    state.images = images;
  },
  setLikeCount(state, imagePayload) {
    for (const image of state.images) {
      if (image.id === imagePayload.id) {
        image.likeCount = image.likeCount + 1;
        break;
      }
    }
  },
  setDislikeCount(state, imagePayload) {
    for (const image of state.images) {
      if (image.id === imagePayload.id) {
        image.dislikeCount = image.dislikeCount + 1;
        break;
      }
    }
  },
  setUpdatedTechnology(state, imagePayload) {
    for (const image of state.images) {
      if (image.id === imagePayload.id) {
        image.name = imagePayload.name;
        image.img = imagePayload.img;
        break;
      }
    }
  },

  setCreatedTechnology(state, imagePayload) {
    state.images.push(imagePayload);
  },
};

const actions = {
  fetchImages({ rootState, commit }) {
    fetch("http://localhost:8000/api/v1/getTechnologyData", {
      headers: {
        Authorization: `Bearer ${rootState.auth.token}`,
      },
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data.data);
        commit("setImages", data.data);
      });
  },

  updateLike({ commit }, image) {
    fetch("http://localhost:8000/api/v1/update/likeCount", {
      method: "put",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({ id: image.id, likeCount: image.likeCount }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.success) {
          console.log("likeCount updated");
          commit("setLikeCount", image);
        }
      });
  },
  updateDislike({ commit }, image) {
    fetch("http://localhost:8000/api/v1/update/dislikeCount", {
      method: "put",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({ id: image.id, dislikeCount: image.dislikeCount }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.success) {
          console.log("dislikeCount updated");
          commit("setDislikeCount", image);
        }
      });
  },

  updateTechnology({ commit, rootState }, image) {
    fetch("http://localhost:8000/api/v1/update", {
      method: "put",
      headers: {
        "Content-type": "Application/json",
        Authorization: "Bearer " + rootState.auth.token,
      },
      body: JSON.stringify(image),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.success) {
          console.log("technology updated");
          commit("setUpdatedTechnology", image);
        }
      });
  },

  createTechnology({ commit, rootState }, image) {
    fetch("http://localhost:8000/api/v1/create", {
      method: "post",
      headers: {
        "Content-type": "Application/json",
        Authorization: "Bearer " + rootState.auth.token,
      },
      body: JSON.stringify(image),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.success) {
          console.log("technology created");
          commit("setCreatedTechnology", image);
        }
      });
  },
};

export default { state, getters, mutations, actions };
