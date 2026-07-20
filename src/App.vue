<template>
  <AppHeader />
  <main class="app-main">
    <LoginView v-if="!token" />
    <DashboardView v-else />
  </main>
</template>

<script setup lang="ts">
import { token } from './core/store/authStore';
import AppHeader from './components/AppHeader.vue';
import LoginView from './features/auth/ui/views/LoginView.vue';
import DashboardView from './features/matrix-processor/ui/views/DashboardView.vue';
</script>

<style scoped>
.app-main {
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 24px 64px;
  box-sizing: border-box;
}
</style>
