<template>
  <div>
    <div class="session-bar">
      <span>Sesión activa</span>
      <button class="btn-logout" @click="logout">Cerrar sesión</button>
    </div>

    <div class="input-section">
      <label>Ingresa tu matriz en formato JSON (Array de arrays):</label>
      <textarea v-model="matrixInputStr" rows="6"></textarea>
      <div class="btn-group">
        <button @click="handleQR" :disabled="loading">
          {{ loading && currentOperation === 'qr' ? 'Procesando...' : 'Factorización QR' }}
        </button>
        <button @click="handleRotation" :disabled="loading" class="btn-secondary">
          {{ loading && currentOperation === 'rotation' ? 'Rotando...' : 'Rotar 90° (horario)' }}
        </button>
      </div>
    </div>

    <div v-if="error" class="error">{{ error }}</div>

    <!-- Resultados -->
    <div v-if="computedMatrices && stats" class="results-section">
      <h2>Resultados</h2>
      <div class="grid">
        <div class="card" v-if="computedMatrices.matriz_original">
          <h3>Matriz Original</h3>
          <pre>{{ formatMatrix(computedMatrices.matriz_original) }}</pre>
        </div>
        <div class="card" v-if="computedMatrices.matriz_rotada">
          <h3>Matriz Rotada</h3>
          <pre>{{ formatMatrix(computedMatrices.matriz_rotada) }}</pre>
        </div>
        <div class="card" v-if="computedMatrices.matriz_Q">
          <h3>Matriz Q (ortogonal)</h3>
          <pre>{{ formatMatrix(computedMatrices.matriz_Q) }}</pre>
        </div>
        <div class="card" v-if="computedMatrices.matriz_R">
          <h3>Matriz R (triangular superior)</h3>
          <pre>{{ formatMatrix(computedMatrices.matriz_R) }}</pre>
        </div>
      </div>
      
      <div class="card stats-card">
        <h3>Estadísticas</h3>
        <ul>
          <li><strong>Máximo:</strong> {{ stats.valor_maximo }}</li>
          <li><strong>Mínimo:</strong> {{ stats.valor_minimo }}</li>
          <li><strong>Suma Total:</strong> {{ stats.suma_total }}</li>
          <li><strong>Promedio:</strong> {{ stats.promedio }}</li>
          <li><strong>¿Alguna matriz diagonal?:</strong> {{ stats.alguna_matriz_diagonal ? 'Sí' : 'No' }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMatrixProcessor } from '../../index';
import { useAuth } from '../../../auth/index';

const { logout } = useAuth();

const { 
  loading, 
  error, 
  computedMatrices, 
  stats, 
  setError, 
  processRotation,
  processQR
} = useMatrixProcessor();

const matrixInputStr = ref('[\n  [1, 2, 3],\n  [4, 5, 6],\n  [7, 8, 9]\n]');
const currentOperation = ref<string | null>(null);

const formatMatrix = (matrix: number[][]) =>
  matrix.map(row => row.map(v => Number(v).toFixed(4)).join('  ')).join('\n');

const handleRotation = async () => {
  currentOperation.value = 'rotation';
  try {
    const parsedMatrix = JSON.parse(matrixInputStr.value);
    await processRotation(parsedMatrix);
  } catch (e: any) {
    setError(`JSON inválido: Por favor verifica el formato. (${e.message})`);
  }
};

const handleQR = async () => {
  currentOperation.value = 'qr';
  try {
    const parsedMatrix = JSON.parse(matrixInputStr.value);
    await processQR(parsedMatrix);
  } catch (e: any) {
    setError(`JSON inválido: Por favor verifica el formato. (${e.message})`);
  }
};
</script>

<style scoped>
.session-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding: 8px 12px; background: #f0faf4; border-radius: 6px; font-size: 14px; color: #2d6a4f; }
.btn-logout { padding: 6px 12px; background-color: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; }
.input-section { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
textarea { font-family: monospace; padding: 10px; border: 1px solid #ccc; border-radius: 4px; }
.btn-group { display: flex; gap: 10px; }
button { padding: 10px 16px; background-color: #42b883; color: white; border: none; border-radius: 4px; cursor: pointer; }
button:disabled { background-color: #a0a0a0; }
.btn-secondary { background-color: #3a86ff; }
.error { color: red; margin: 10px 0; }
.results-section { margin-top: 20px; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.card { padding: 15px; border: 1px solid #eee; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.stats-card { margin-top: 20px; }
pre { background: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto; }
ul { padding-left: 18px; }
li { margin: 6px 0; }
</style>
