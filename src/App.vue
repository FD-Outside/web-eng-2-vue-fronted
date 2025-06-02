<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import headerComponent from './components/headerComponent.vue';
</script>

<template>
  <div class="app">
    <headerComponent></headerComponent>
    <router-view/>
  </div>
</template>

<style scoped>
.app {
  width: 100%;
  min-height: 100vh;
  background-color: #f3f4f6;
  color: #1f2937;
  font-family: 'Helvetica Neue', sans-serif;
}
</style>