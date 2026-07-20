import { ref } from 'vue';

// Global singleton state for auth
export const token = ref<string | null>(null);

export const setToken = (newToken: string | null) => {
  token.value = newToken;
};
