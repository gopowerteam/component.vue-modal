<template lang="pug">
.modal-container
  .modal-wrapper(:style="wrapperStyle" @click.self="maskClosable&&onCloseModal()" ref="wrapperRef")
      .modal-content(:style="contentStyle" ref="contentRef")
          .modal-header(v-if="header" ref="")
              .title {{title}}
              .action
                  img.close-button(
                    v-if="closable"
                    :src="closeSVG"
                    @click="onCloseModal"
                  )
          .modal-body
            component(:is="component" v-bind="params")
</template>

<script setup lang="ts">
import {
  computed,
  defineProps,
  inject,
  onMounted,
  ref,
  shallowRef,
  triggerRef,
} from "vue";
import closeSVG from "@/assets/icons/close.svg";
const modal = inject("modal") as any;

const wrapperRef = shallowRef<any>();
const contentRef = shallowRef<any>();

const wrapperStyle = computed(() => {
  const wrapper = wrapperRef.value;
  const content = contentRef.value;

  const oversize =
    wrapper && content && wrapper.clientHeight <= content.clientHeight;

  return oversize
    ? { padding: "10px 0" }
    : {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      };
});

const props = defineProps({
  component: {
    type: Object,
    require: true,
  },
  params: {
    type: Object,
    default: () => {},
  },
  width: {
    type: [Number, String],
  },
  minWidth: {
    type: [Number, String],
    required: false,
  },
  title: {
    type: String,
  },
  header: {
    type: Boolean,
    default: true,
  },
  id: {
    type: String,
    required: true,
  },
  closable: {
    type: Boolean,
    default: true,
  },
  keyboard: {
    type: Boolean,
    default: true,
  },
  maskClosable: {
    type: Boolean,
    default: true,
  },
});

function onCloseModal() {
  modal.close(props.id);
}

/**
 * 获取容器样式
 */
const contentStyle = computed(() => {
  const getValue = (value) =>
    ({
      string: value,
      number: `${value}px`,
    }[typeof value]);

  const style = [
    { key: "width", value: getValue(props.width) },
    { key: "minWidth", value: getValue(props.minWidth) },
  ]
    .filter(({ value }) => !!value)
    .reduce((result, { key, value }) => {
      result[key] = value;
      return result;
    }, {});
  return style;
});

function onResize() {
  if (window) {
    window.addEventListener("resize", () => {
      triggerRef(wrapperRef);
      triggerRef(contentRef);
      console.log("resize");
    });
  }
}

function onKeyboard() {
  if (props.closable && props.keyboard) {
    const handleEsc = ({ key }) => {
      if (key === "Escape") {
        modal.close(props.id);
        window.removeEventListener("keydown", handleEsc);
      }
    };

    window.addEventListener("keydown", handleEsc);
  }
}

onMounted(() => {
  onKeyboard();
  onResize();
});
</script>

<style lang="stylus" scoped>
.modal-wrapper
    z-index 10000
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background rgba(0,0,0,0.3)
    overflow auto


    .modal-content
        margin:auto;
        background rgb(255,255,255)
        padding 10px
        border-radius 5px

        .modal-header
            display flex
            justify-content space-between
            .title
                font-weight 600
                font-size 16px
            .close-button
                height 20px
                cursor pointer
</style>
