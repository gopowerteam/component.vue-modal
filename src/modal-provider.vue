<template lang="pug">
slot

teleport(
    to="body"
)
    transition-group(name="modal-fade")
        modal-container(
            v-for="(modal,index) in modals"
            :key="modal.id"
            :id="modal.id"
            :component="modal.component"
            :params="modal.props"
            :title="modal.config.title"
            :closable="modal.config.closable"
            :maskClosable="modal.config.maskClosable"
            :width="modal.config.width || minWidth"
        )
</template>

<script setup lang="ts">
//#region Import
import {
  defineAsyncComponent,
  triggerRef,
  provide,
  shallowRef,
  defineProps,
} from "vue";
import ModalContainer from "./modal-container.vue";
import type { IModal, IModalOption } from "./interfaces";
//#endregion

//#region Variable
// modal列表
const modals = shallowRef<IModal[]>([]);
// #endregion

//#region Function
/**
 * 打开Modal
 */
async function openModal(option: IModalOption) {
  const component = defineAsyncComponent(() =>
    Promise.resolve(option.component)
  );

  return new Promise((resolve) => {
    modals.value.push({
      id: Math.random().toString(32).slice(2),
      component,
      props: option.props,
      resolve,
      config: option,
    });
    triggerRef(modals);
  });
}

/**
 * 关闭Modal
 */
async function closeModal(id: string, data: any) {
  const index = modals.value.findIndex((x) => x.id === id);

  if (index < 0) return;

  const modal = modals.value[index];
  modal?.resolve(data);
  modals.value.splice(index, 1);

  triggerRef(modals);
}

async function closeAllModal() {
  modals.value.forEach((modal) => {
    modal.resolve();
  });

  modals.value = [];
  triggerRef(modals);
}
//#endregion

provide("modal", {
  open: openModal,
  close: closeModal,
  closeAll: closeAllModal,
});

defineProps({
  minWidth: {
    type: Number,
    default: 500,
  },
});
</script>

<style lang="stylus" scoped>
.modal-fade-enter-active,
.modal-fade-leave-active
  transition all 0.5s ease

.modal-fade-enter-from,
.modal-fade-leave-to
  opacity 0
</style>
