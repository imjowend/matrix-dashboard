<template>
  <div class="error-banner" role="alert">
    <svg class="error-banner__icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" stroke-width="1.5"/>
      <path d="M10 6.5v4.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="10" cy="13.5" r="0.9" fill="currentColor"/>
    </svg>
    <p class="error-banner__message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ message: string }>();
</script>

<style scoped>
.error-banner {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 16px;
  background: var(--ins-error-bg);
  border: 1px solid var(--ins-error-border);
  border-radius: var(--ins-radius-md);
  color: var(--ins-error-text);
}
.error-banner__icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin-top: 1px;
  color: var(--ins-error-icon);
}
.error-banner__message {
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
}
</style>
