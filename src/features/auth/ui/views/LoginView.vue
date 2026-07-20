<template>
  <div class="login-section">
    <h2>Iniciar sesión</h2>
    <div class="login-form">
      <input v-model="username" type="text" placeholder="Usuario" />
      <input v-model="password" type="password" placeholder="Contraseña" />
      <button @click="handleLogin" :disabled="loading">
        {{ loading ? 'Ingresando...' : 'Ingresar' }}
      </button>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '../../index';

const { loading, error, login } = useAuth();

const username = ref('');
const password = ref('');

const handleLogin = async () => {
  if (!username.value || !password.value) {
    error.value = "Por favor ingresa usuario y contraseña";
    return;
  }
  await login(username.value, password.value);
};
</script>

<style scoped>
.login-section { max-width: 360px; margin: 60px auto; }
.login-section h2 { margin-bottom: 16px; }
.login-form { display: flex; flex-direction: column; gap: 10px; }
.login-form input { padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; }
button { padding: 10px 16px; background-color: #42b883; color: white; border: none; border-radius: 4px; cursor: pointer; }
button:disabled { background-color: #a0a0a0; }
.error { color: red; margin: 10px 0; }
</style>
