<template>
  <div>
    基础用法：
    <button @click="$message('打开消息通知')">打开消息通知</button>
    <button @click="vnode">VNode</button>
  </div>
  <div>
    不同状态
    <button @click="$message({message:'恭喜你，这是一条成功消息', type: 'success'})">成功</button>
    <button @click="$message({message:'警告哦，这是一条警告消息', type: 'warning'})">警告</button>
    <button @click="$message('这是一条消息提示')">消息</button>
    <button @click="$message({message:'错了哦，这是一条错误消息', type: 'error'})">错误</button>
  </div>
  <div>
    可关闭
    <button @click="$message({message:'恭喜你，这是一条成功消息', type: 'success', showClose: true})">成功</button>
    <button @click="$message({message:'警告哦，这是一条警告消息', type: 'warning', showClose: true})">警告</button>
    <button @click="$message({message:'这是一条消息提示', showClose: true})">消息</button>
    <button @click="$message({message:'错了哦，这是一条错误消息', type: 'error', showClose: true})">错误</button>
  </div>
  <div>
    文字居中
    <button @click="$message({message:'这是一条消息提示', showClose: true, center: true})">居中</button>
  </div>
  <div>
    使用 HTML 片段
    <button
      @click="$message({
            dangerouslyUseHTMLString: true,
            message: '<strong>这是 <i>HTML</i> 片段</strong>'
          })"
    >使用 HTML 片段</button>
  </div>
</template>

<script>
import { h } from "vue";
export default {
  methods: {
    vnode() {
      this.$message({
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
div {
  margin: 20px 0;
}
button {
  margin: 0 5px;
}
</style>
