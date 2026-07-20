import { ref } from 'vue';
import type { IMatrixCoreApi } from '../../domain/ports/IMatrixCoreApi';
import type { MatrixStats } from '../../domain/models/MatrixStats';

export function createMatrixProcessorUseCase(matrixCoreApi: IMatrixCoreApi) {
  const loading = ref(false);
  const error = ref<string | null>(null);

  // UI State
  const computedMatrices = ref<Record<string, number[][]> | null>(null);
  const stats = ref<MatrixStats | null>(null);

  const setError = (msg: string) => {
    error.value = msg;
  };

  const processRotation = async (matrix: number[][]) => {
    loading.value = true;
    error.value = null;

    try {
      const result = await matrixCoreApi.rotateMatrix(matrix);

      computedMatrices.value = {
        matriz_original: result.matriz_original,
        matriz_rotada: result.matriz_rotada
      };
      stats.value = result.estadisticas_node;

    } catch (err: any) {
      error.value = err.message || 'Ocurrió un error en el procesamiento de matrices.';
      computedMatrices.value = null;
      stats.value = null;
    } finally {
      loading.value = false;
    }
  };

  const processQR = async (matrix: number[][]) => {
    loading.value = true;
    error.value = null;

    try {
      const result = await matrixCoreApi.factorizeQR(matrix);

      computedMatrices.value = {
        matriz_original: result.matriz_original,
        matriz_Q: result.matriz_Q,
        matriz_R: result.matriz_R
      };
      stats.value = result.estadisticas_node;

    } catch (err: any) {
      error.value = err.message || 'Ocurrió un error en el procesamiento de matrices.';
      computedMatrices.value = null;
      stats.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    computedMatrices,
    stats,
    setError,
    processRotation,
    processQR
  };
}
