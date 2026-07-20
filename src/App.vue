<template>
  <div class="container">
    <h1>Reto Técnico: Procesador de Matrices</h1>

    <LoginView v-if="!token" />
    <DashboardView v-else />
  </div>
</template>

<script setup lang="ts">
import { token } from './core/store/authStore';
import LoginView from './features/auth/ui/views/LoginView.vue';
import DashboardView from './features/matrix-processor/ui/views/DashboardView.vue';
</script>

<style scoped>
.container { max-width: 860px; margin: 0 auto; padding: 20px; font-family: sans-serif; }
</style>
