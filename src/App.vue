<template>
  <Header />
  <Map />
</template>

<script>
import Map from "./components/Map/Map.vue";
import Header from "./components/Header/Header.vue";
export default {
  name: "App",
  components: {
    Map,
    Header,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
