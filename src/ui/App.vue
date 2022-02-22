<template>
  <div id="app">
    <nav-bar />
    <side-bar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "@/ui/components/NavBar.vue";
import SideBar from "@/ui/components/SideBar.vue";

@Component({
  components: {
    NavBar,
    SideBar,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
html {
  background-color: #f0f0f0;
}

#app {
  font-family: "Nunito", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
