import { createMatrixProcessorUseCase } from './application/use-cases/useMatrixProcessor';
import { MatrixCoreHttpAdapter } from './infrastructure/adapters/MatrixCoreHttpAdapter';

const matrixCoreAdapter = new MatrixCoreHttpAdapter();

export function useMatrixProcessor() {
  return createMatrixProcessorUseCase(matrixCoreAdapter);
}
