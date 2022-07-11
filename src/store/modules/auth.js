import { router } from "./../../router/router";
const state = {
  token: window.localStorage.getItem("access_token"),
};

const getters = {
  isLoggedIn: (state) => !!state.token,
};

const mutations = {
  setToken: (state, token) => {
    state.token = token;
  },
};

const actions = {
  registerUser({ state }, user) {
    console.log(state.token);
    fetch("http://localhost:8000/api/v1/signup", {
      headers: {
        "Content-type": "application/json",
      },
      method: "Post",
      body: JSON.stringify(user),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
      });
  },

  logInUser({ commit, state }, user) {
    fetch("http://localhost:8000/api/v1/login", {
      headers: {
        "Content-type": "application/json",
      },
      method: "Post",
      body: JSON.stringify(user),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        window.localStorage.setItem("access_token", data.accessToken);
        commit("setToken", data.accessToken);
        router.push("/home/images");
      });
  },

  logOutUser({ commit }) {
    console.log("logout");
    commit("setToken", null);
    window.localStorage.removeItem("access_token");
  },
};

export default { state, getters, mutations, actions };
