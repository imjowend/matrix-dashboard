<template>
  <header class="app-header">
    <div class="app-header__inner">
      <img class="app-header__logo" src="../assets/interseguro-logo.webp" alt="Interseguro" />
      <div v-if="token" class="app-header__session">
        <span class="app-header__session-label">Sesión activa</span>
        <button type="button" class="app-header__logout" @click="logout">
          <svg class="app-header__logout-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M7.5 17.5H4.167A1.667 1.667 0 0 1 2.5 15.833V4.167A1.667 1.667 0 0 1 4.167 2.5H7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.333 14.167 17.5 10l-4.167-4.167" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17.5 10H7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { token } from '../core/store/authStore';
import { useAuth } from '../features/auth/index';

const { logout } = useAuth();
</script>

<style scoped>
.app-header {
  border-bottom: 1px solid var(--ins-gray-200);
  background: var(--ins-white);
  box-shadow: var(--ins-shadow-sm);
}
.app-header__inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.app-header__logo {
  height: 28px;
  width: auto;
  display: block;
}
.app-header__session {
  display: flex;
  align-items: center;
  gap: 12px;
}
.app-header__session-label {
  font-size: 13px;
  color: var(--ins-gray-500);
}
.app-header__logout {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border: none;
  background: transparent;
  color: var(--ins-gray-500);
  font-size: 13px;
  border-radius: var(--ins-radius-sm);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.app-header__logout:hover {
  background: var(--ins-gray-50);
  color: var(--ins-error-text);
}
.app-header__logout:focus-visible {
  outline: 2px solid var(--ins-blue-primary);
  outline-offset: 2px;
}
.app-header__logout-icon {
  width: 16px;
  height: 16px;
}
</style>
