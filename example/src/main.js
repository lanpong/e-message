import { createApp } from "vue";
import App from "./App.vue";
import hMessage from "./components/hmessage/index";

const app = createApp(App);

app.use(hMessage);

app.mount("#app");
