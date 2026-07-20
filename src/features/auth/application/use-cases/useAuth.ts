import { ref } from 'vue';
import type { IAuthApi } from '../../domain/ports/IAuthApi';
import { setToken } from '../../../../core/store/authStore';

export function createAuthUseCase(authApi: IAuthApi) {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const login = async (username: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      const token = await authApi.login(username, password);
      setToken(token);
    } catch (err: any) {
      error.value = err.message || 'No se pudo conectar con la API';
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    setToken(null);
  };

  return {
    loading,
    error,
    login,
    logout
  };
}
