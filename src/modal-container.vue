<template lang="pug">
.modal-container
  .modal-wrapper(@click.self="maskClosable&&onCloseModal()")
      .modal-content
          .modal-header(v-if="header")
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
import { defineProps, inject } from "vue";
import closeSVG from "@/assets/icons/close.svg";

const modal = inject("modal") as any;
const props = defineProps({
  component: {
    type: Object,
    require: true,
  },
  params: {
    type: Object,
    default: () => {},
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
  maskClosable: {
    type: Boolean,
    default: true,
  },
});

function onCloseModal() {
  modal.close(props.id);
}
</script>

<style lang="stylus" scoped>
.modal-wrapper
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background rgba(0,0,0,0.3)
    overflow auto
    display flex
    justify-content center
    align-items center

    .modal-content
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
