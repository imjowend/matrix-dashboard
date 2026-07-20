<template>
  <div class="matrix-grid">
    <div class="matrix-grid__scroll">
      <table class="matrix-grid__table">
        <tbody>
          <tr v-for="(row, r) in displayRows" :key="r">
            <td v-for="(cell, c) in row" :key="c" class="matrix-grid__td">
              <input
                v-if="editable"
                type="number"
                class="matrix-grid__cell"
                :class="{ 'matrix-grid__cell--invalid': !isCellValid(r, c) }"
                v-model="cells[r][c]"
                @input="handleChange"
                :aria-label="`Valor fila ${r + 1}, columna ${c + 1}`"
              />
              <span v-else class="matrix-grid__cell matrix-grid__cell--readonly">
                {{ formatNumber(cell) }}
              </span>
            </td>
            <td v-if="editable" class="matrix-grid__row-control">
              <button
                type="button"
                class="matrix-grid__control-btn"
                @click="removeRow(r)"
                :disabled="rowCount <= minRows"
                :aria-label="`Quitar fila ${r + 1}`"
              >−</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="editable" class="matrix-grid__controls">
      <div class="matrix-grid__control-group">
        <button type="button" class="matrix-grid__control-btn" @click="addRow" :disabled="rowCount >= maxRows">+ fila</button>
        <button type="button" class="matrix-grid__control-btn" @click="removeRow(rowCount - 1)" :disabled="rowCount <= minRows">− fila</button>
      </div>
      <div class="matrix-grid__control-group">
        <button type="button" class="matrix-grid__control-btn" @click="addCol" :disabled="colCount >= maxCols">+ columna</button>
        <button type="button" class="matrix-grid__control-btn" @click="removeCol" :disabled="colCount <= minCols">− columna</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { formatNumber } from '../shared/formatNumber';

const props = withDefaults(defineProps<{
  modelValue: number[][];
  editable?: boolean;
  minRows?: number;
  minCols?: number;
  maxRows?: number;
  maxCols?: number;
}>(), {
  editable: true,
  minRows: 1,
  minCols: 1,
  maxRows: 10,
  maxCols: 10,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number[][]): void;
  (e: 'update:valid', value: boolean): void;
}>();

const cells = ref<string[][]>(props.modelValue.map(row => row.map(v => String(v))));

const displayRows = computed(() => (props.editable ? cells.value : props.modelValue));
const rowCount = computed(() => displayRows.value.length);
const colCount = computed(() => displayRows.value[0]?.length ?? 0);

watch(() => props.modelValue, (value) => {
  if (props.editable) return;
  cells.value = value.map(row => row.map(v => String(v)));
}, { deep: true });

function isCellValid(r: number, c: number): boolean {
  const raw = cells.value[r]?.[c] ?? '';
  if (raw.trim() === '') return false;
  return Number.isFinite(Number(raw));
}

function isGridValid(): boolean {
  return cells.value.every((row, r) => row.every((_, c) => isCellValid(r, c)));
}

function emitState() {
  const numericMatrix = cells.value.map(row =>
    row.map(v => (Number.isFinite(Number(v)) ? Number(v) : 0))
  );
  emit('update:modelValue', numericMatrix);
  emit('update:valid', isGridValid());
}

function handleChange() {
  emitState();
}

function addRow() {
  if (rowCount.value >= props.maxRows) return;
  const width = cells.value[0]?.length ?? 1;
  cells.value.push(Array.from({ length: width }, () => '0'));
  emitState();
}

function removeRow(index: number) {
  if (rowCount.value <= props.minRows) return;
  cells.value.splice(index, 1);
  emitState();
}

function addCol() {
  if (colCount.value >= props.maxCols) return;
  cells.value.forEach(row => row.push('0'));
  emitState();
}

function removeCol() {
  if (colCount.value <= props.minCols) return;
  cells.value.forEach(row => row.pop());
  emitState();
}
</script>

<style scoped>
.matrix-grid { display: inline-flex; flex-direction: column; gap: 12px; max-width: 100%; }
.matrix-grid__scroll { overflow-x: auto; border: 1px solid var(--ins-gray-200); border-radius: var(--ins-radius-md); background: var(--ins-white); }
.matrix-grid__table { border-collapse: separate; border-spacing: 6px; padding: 6px; }
.matrix-grid__td { padding: 0; }
.matrix-grid__row-control { padding-left: 4px; }
.matrix-grid__cell {
  width: 72px;
  height: 40px;
  text-align: center;
  border: 1px solid var(--ins-gray-200);
  border-radius: var(--ins-radius-sm);
  font-size: 14px;
  font-family: var(--mono);
  color: var(--ins-gray-900);
  background: var(--ins-white);
  box-sizing: border-box;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.matrix-grid__cell::-webkit-inner-spin-button,
.matrix-grid__cell::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.matrix-grid__cell { -moz-appearance: textfield; }
.matrix-grid__cell:focus-visible {
  outline: none;
  border-color: var(--ins-blue-primary);
  box-shadow: 0 0 0 3px rgba(34, 84, 194, 0.15);
}
.matrix-grid__cell--invalid {
  border-color: var(--ins-error-border);
  background: var(--ins-error-bg);
}
.matrix-grid__cell--readonly {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ins-gray-50);
}
.matrix-grid__control-btn {
  min-width: 32px;
  height: 32px;
  padding: 0 10px;
  border: 1px solid var(--ins-gray-200);
  background: var(--ins-white);
  color: var(--ins-gray-900);
  border-radius: var(--ins-radius-sm);
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
}
.matrix-grid__control-btn:hover:not(:disabled) { border-color: var(--ins-blue-primary); color: var(--ins-blue-primary); }
.matrix-grid__control-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.matrix-grid__controls { display: flex; gap: 16px; flex-wrap: wrap; }
.matrix-grid__control-group { display: flex; gap: 8px; }
</style>
