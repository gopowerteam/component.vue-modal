<template>
  <modal-provider>
    <page1></page1>
  </modal-provider>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import { ModalProvider } from "../src/packages/modal";
import Page1 from './pages/page1.vue'
export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
    ModalProvider,
    Page1,
  },
  setup() {
   
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
