<template>
  <img alt="Vue logo" src="../assets/logo.png" />
  <button @click="onClick">12312</button>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import HelloWorld from "../components/HelloWorld.vue";
import { ModalProvider, useModal } from "../../src/packages/modal";

export default defineComponent({
  components: {},
  setup() {
    const modal = useModal();

    function onClick() {
      modal
        .open({
          title:'aaa',
          component: HelloWorld,
          props: {
            msg: "123",
          },
          maskClosable:false
        })
        .then((a: any) => {
        });
    }
    return {
      onClick,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
