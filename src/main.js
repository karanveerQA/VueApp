import { createApp } from "vue";

import App from "./App";

import { router } from "./router/router.js";

import { store } from "./store/index";

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
