<template>
  <transition name="message-fade" @before-leave="onClose" @after-leave="$emit('destroy')">
    <div
      v-show="visible"
      :style="customStyle"
      :class="[
        'message',
        type ? `${type}` : '',
        customClass,
        center ? 'is-center' : '',
        showClose ? 'is-closetab': ''
      ]"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <slot>
        <p v-if="!dangerouslyUseHTMLString" class="message__content">{{ message }}</p>
        <p v-else class="message__content" v-html="message"></p>
      </slot>
      <div v-if="showClose" class="message__closeBtn" @click.stop="close">x</div>
    </div>
  </transition>
</template>

<script>
import {
  defineComponent,
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import { on, off } from "../utils/dom";

const typeMap = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error",
};

export default defineComponent({
  name: "message",
  props: {
    customClass: { type: String, default: "" },
    center: { type: Boolean, default: false },
    dangerouslyUseHTMLString: { type: Boolean, default: false },
    duration: { type: Number, default: 3000 },
    id: { type: String, default: "" },
    message: { type: [String, Object], default: "" },
    onClose: { type: Function, require: true },
    showClose: { tyep: Boolean, default: false },
    type: { type: String, default: "info" },
    offset: { type: Number, default: 20 },
    zIndex: { type: Number, default: 0 },
  },
  emits: ["destroy"],
  setup(props) {
    const typeClass = computed(() => {
      const type = props.type;
      return type && typeMap[type] ? `${typeMap[type]}` : "";
    });

    const customStyle = computed(() => {
      return {
        top: `${props.offset}px`,
        zIndex: props.zIndex,
      };
    });

    const visible = ref(false);
    let timer = null;
    function startTimer() {
      if (props.duration > 0) {
        timer = setTimeout(() => {
          if (visible.value) {
            close();
          }
        }, props.duration);
      }
    }
    function clearTimer() {
      clearTimeout(timer);
      timer = null;
    }
    function close() {
      visible.value = false;
    }
    function keydown({ code }) {
      if (code === "Escape") {
        if (visible.value) {
          close();
        }
      } else {
        startTimer();
      }
    }

    onMounted(() => {
      startTimer();
      visible.value = true;
      on(document, "keydown", keydown);
    });

    onBeforeUnmount(() => {
      off(document, "keydown", keydown);
    });

    return {
      customStyle,
      typeClass,
      visible,

      close,
      startTimer,
      clearTimer,
    };
  },
});
</script>

<style lang="scss">
.message {
  min-width: 380px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  background-color: #edf2fc;
  transition: opacity 0.3s, transform 0.4s, top 0.4s;
  overflow: hidden;
  padding: 15px 15px 15px 20px;
  display: flex;
  align-items: center;

  p {
    margin: 0;
  }
  &.is-center {
    justify-content: center;
  }
  &.closetab &__content {
    padding-right: 16px;
  }
  &.info &__content {
    color: #909399;
  }
  &.success {
    background-color: #f0f9eb;
    border-color: #e1f3d8;
  }
  &.success &__content {
    color: #67c23a;
  }
  &.warning {
    background-color: #fdf6ec;
    border-color: #faecd8;
  }
  &.warning &__content {
    color: #e6a23c;
  }
  &.error {
    background-color: #fef0f0;
    border-color: #fde2e2;
  }
  &.error &__content {
    color: #f56c6c;
  }
  &__content {
    padding: 0;
    font-size: 14px;
    line-height: 1;
    &:focus {
      outline-width: 0;
    }
  }
  &__closeBtn {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    cursor: pointer;
    color: #c0c4cc;
    font-size: 16px;
    &:focus {
      outline-width: 0;
    }
    &:hover {
      color: #909399;
    }
  }
  &__icon {
    margin-right: 10px;
  }
}

.message-fade-enter-active,
.message-fade-leave-active {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>
