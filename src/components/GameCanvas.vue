<template>
    <div ref="gameContainer" class="game-container"></div>
  </template>
  
  <script>
  import { onMounted, onBeforeUnmount, ref } from 'vue';
  import { createGame } from '../game/game';
  
  export default {
    name: 'GameCanvas',
    setup() {
      const gameContainer = ref(null);
      let gameInstance = null;
  
      onMounted(() => {
        gameInstance = createGame(gameContainer.value);
      });
  
      onBeforeUnmount(() => {
        if (gameInstance) {
          gameInstance.destroy(true);
        }
      });
  
      return {
        gameContainer
      };
    }
  };
  </script>
  
  <style scoped>
  .game-container {
    width: 1280px;
    height: 720px;
    margin: auto;
  }
  </style>
  