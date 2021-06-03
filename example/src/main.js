import { createApp } from "vue";
import App from "./App.vue";
import Message from "../../src/index";

const app = createApp(App);

app.use(Message);

app.mount("#app");
