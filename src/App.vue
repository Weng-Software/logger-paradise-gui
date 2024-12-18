<script setup>
import GameCanvas from './components/GameCanvas.vue';
</script>

<template>
  <div id="app">
    <GameCanvas />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    GameCanvas
  }
};
</script>

<style>
#app {
  text-align: center;
}
</style>