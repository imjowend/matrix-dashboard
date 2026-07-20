<template>
  <div class="login">
    <div class="login__card">
      <h2 class="login__title">Iniciar sesión</h2>
      <p class="login__subtitle">Ingresá tus credenciales para acceder al procesador de matrices.</p>
      <form class="login__form" @submit.prevent="handleLogin">
        <label class="login__field">
          <span class="login__label">Usuario</span>
          <input v-model="username" type="text" autocomplete="username" />
        </label>
        <label class="login__field">
          <span class="login__label">Contraseña</span>
          <input v-model="password" type="password" autocomplete="current-password" />
        </label>
        <button type="submit" class="btn btn--primary" :disabled="loading">
          {{ loading ? 'Ingresando...' : 'Ingresar' }}
        </button>
      </form>
      <ErrorBanner v-if="error" :message="error" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '../../index';
import ErrorBanner from '../../../../components/ErrorBanner.vue';

const { loading, error, login } = useAuth();

const username = ref('');
const password = ref('');

const handleLogin = async () => {
  if (!username.value || !password.value) {
    error.value = 'Por favor ingresa usuario y contraseña';
    return;
  }
  await login(username.value, password.value);
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  padding-top: 48px;
}
.login__card {
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
  background: var(--ins-white);
  border: 1px solid var(--ins-gray-200);
  border-radius: var(--ins-radius-md);
  box-shadow: var(--ins-shadow-sm);
}
.login__title { font-size: 20px; }
.login__subtitle { font-size: 13px; color: var(--ins-gray-500); }
.login__form { display: flex; flex-direction: column; gap: 14px; }
.login__field { display: flex; flex-direction: column; gap: 6px; }
.login__label { font-size: 13px; color: var(--ins-gray-500); }
.login__field input {
  padding: 10px 12px;
  border: 1px solid var(--ins-gray-200);
  border-radius: var(--ins-radius-sm);
  font-size: 14px;
  box-sizing: border-box;
}
.login__field input:focus-visible {
  outline: none;
  border-color: var(--ins-blue-primary);
  box-shadow: 0 0 0 3px rgba(34, 84, 194, 0.15);
}
.btn {
  padding: 10px 16px;
  border-radius: var(--ins-radius-md);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
}
.btn--primary {
  background: var(--ins-blue-primary);
  color: var(--ins-white);
}
.btn--primary:hover:not(:disabled) { background: var(--ins-blue-primary-hover); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn:focus-visible { outline: 2px solid var(--ins-blue-primary); outline-offset: 2px; }
</style>
