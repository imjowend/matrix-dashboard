<template>
  <div class="stat-card">
    <span class="stat-card__label">{{ label }}</span>
    <span class="stat-card__value">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; value: string }>();
</script>

<style scoped>
.stat-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px;
  background: var(--ins-gray-50);
  border: 1px solid var(--ins-gray-200);
  border-radius: var(--ins-radius-md);
  min-width: 120px;
}
.stat-card__label {
  font-size: 12px;
  color: var(--ins-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.stat-card__value {
  font-size: 22px;
  font-weight: 600;
  color: var(--ins-gray-900);
}
</style>
