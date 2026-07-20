<template>
  <div class="dashboard">
    <div class="dashboard__intro">
      <h1 class="dashboard__title">Procesador de Matrices</h1>
      <p class="dashboard__subtitle">Factorización QR y análisis estadístico de matrices</p>
    </div>

    <section class="dashboard__input">
      <h2 class="dashboard__section-title">Matriz de entrada</h2>
      <MatrixGrid
        v-model="matrixInput"
        editable
        @update:valid="isInputValid = $event"
      />
      <div class="dashboard__actions">
        <button
          type="button"
          class="btn btn--primary"
          :disabled="loading || !isInputValid"
          @click="handleQR"
        >
          {{ loading && currentOperation === 'qr' ? 'Procesando...' : 'Factorización QR' }}
        </button>
        <button
          type="button"
          class="btn btn--secondary"
          :disabled="loading || !isInputValid"
          @click="handleRotation"
        >
          {{ loading && currentOperation === 'rotation' ? 'Rotando...' : 'Rotar 90°' }}
        </button>
      </div>
    </section>

    <ErrorBanner v-if="error" :message="error" />

    <section v-if="computedMatrices && stats" class="dashboard__results">
      <h2 class="dashboard__section-title">Resultados</h2>

      <div class="dashboard__matrices">
        <div class="matrix-card" v-if="computedMatrices.matriz_original">
          <h3 class="matrix-card__title">Matriz Original</h3>
          <MatrixGrid :model-value="computedMatrices.matriz_original" :editable="false" />
        </div>
        <div class="matrix-card" v-if="computedMatrices.matriz_rotada">
          <h3 class="matrix-card__title">Matriz Rotada</h3>
          <MatrixGrid :model-value="computedMatrices.matriz_rotada" :editable="false" />
        </div>
        <div class="matrix-card" v-if="computedMatrices.matriz_Q">
          <h3 class="matrix-card__title">Matriz Q (ortogonal)</h3>
          <MatrixGrid :model-value="computedMatrices.matriz_Q" :editable="false" />
        </div>
        <div class="matrix-card" v-if="computedMatrices.matriz_R">
          <h3 class="matrix-card__title">Matriz R (triangular superior)</h3>
          <MatrixGrid :model-value="computedMatrices.matriz_R" :editable="false" />
        </div>
      </div>

      <div class="dashboard__stats">
        <StatCard label="Máximo" :value="formatNumber(stats.valor_maximo)" />
        <StatCard label="Mínimo" :value="formatNumber(stats.valor_minimo)" />
        <StatCard label="Suma total" :value="formatNumber(stats.suma_total)" />
        <StatCard label="Promedio" :value="formatNumber(stats.promedio)" />
        <div class="stat-card">
          <span class="stat-card__label">¿Matriz diagonal?</span>
          <span class="badge" :class="stats.alguna_matriz_diagonal ? 'badge--yes' : 'badge--no'">
            {{ stats.alguna_matriz_diagonal ? 'Sí' : 'No' }}
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMatrixProcessor } from '../../index';
import MatrixGrid from '../../../../components/MatrixGrid.vue';
import ErrorBanner from '../../../../components/ErrorBanner.vue';
import StatCard from '../../../../components/StatCard.vue';
import { formatNumber } from '../../../../shared/formatNumber';

const {
  loading,
  error,
  computedMatrices,
  stats,
  processRotation,
  processQR
} = useMatrixProcessor();

const matrixInput = ref<number[][]>([
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
]);
const isInputValid = ref(true);
const currentOperation = ref<string | null>(null);

const handleRotation = async () => {
  currentOperation.value = 'rotation';
  await processRotation(matrixInput.value);
};

const handleQR = async () => {
  currentOperation.value = 'qr';
  await processQR(matrixInput.value);
};
</script>

<style scoped>
.dashboard { display: flex; flex-direction: column; gap: 32px; }
.dashboard__intro { display: flex; flex-direction: column; gap: 4px; }
.dashboard__title { font-size: 28px; }
.dashboard__subtitle { font-size: 14px; color: var(--ins-gray-500); }
.dashboard__section-title { font-size: 16px; margin-bottom: 12px; color: var(--ins-gray-900); }
.dashboard__input { display: flex; flex-direction: column; gap: 16px; }
.dashboard__actions { display: flex; gap: 12px; flex-wrap: wrap; }

.btn {
  padding: 10px 20px;
  border-radius: var(--ins-radius-md);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.btn--primary {
  background: var(--ins-blue-primary);
  color: var(--ins-white);
}
.btn--primary:hover:not(:disabled) { background: var(--ins-blue-primary-hover); }
.btn--secondary {
  background: var(--ins-white);
  color: var(--ins-blue-primary);
  border-color: var(--ins-blue-primary);
}
.btn--secondary:hover:not(:disabled) { background: var(--accent-bg); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn:focus-visible { outline: 2px solid var(--ins-blue-primary); outline-offset: 2px; }

.dashboard__matrices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}
.matrix-card {
  padding: 16px;
  border: 1px solid var(--ins-gray-200);
  border-radius: var(--ins-radius-md);
  background: var(--ins-white);
  box-shadow: var(--ins-shadow-sm);
}
.matrix-card__title { font-size: 14px; margin-bottom: 12px; color: var(--ins-gray-900); }

.dashboard__stats {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  width: fit-content;
}
.badge--yes { background: rgba(34, 84, 194, 0.12); color: var(--ins-blue-primary); }
.badge--no { background: var(--ins-gray-200); color: var(--ins-gray-500); }
</style>
