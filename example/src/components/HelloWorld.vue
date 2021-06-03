<template>
  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Documentation</a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button @click="info">info</button>
  <button @click="success">success</button>
  <button @click="warning">warning</button>
  <button @click="error">error</button>
  <button @click="vnode">VNode</button>
</template>

<script>
import { h } from "vue";
export default {
  methods: {
    success() {
      this.$hmessage({ message: "success", type: "success", center: true });
    },
    warning() {
      this.$hmessage({ message: "warning", type: "warning" });
    },
    error() {
      this.$hmessage({ message: "error", type: "error" });
    },
    info() {
      this.$hmessage({ message: "info", type: "info" });
    },
    vnode() {
      this.$hmessage({
        message: h("p", null, [
          h("span", null, "内容可以是 "),
          h("i", { style: "color: teal" }, "VNode"),
        ]),
      });
    },
  },
  setup() {},
};
</script>


<style scoped>
a {
  color: #42b983;
}
</style>
