import type { MatrixStats } from '../models/MatrixStats';

export interface RotateMatrixResult {
  matriz_original: number[][];
  matriz_rotada: number[][];
  estadisticas_node: MatrixStats;
}

export interface ProcessMatrixResult {
  matriz_original: number[][];
  matriz_Q: number[][];
  matriz_R: number[][];
  estadisticas_node: MatrixStats;
}

export interface IMatrixCoreApi {
  rotateMatrix(matrix: number[][]): Promise<RotateMatrixResult>;
  factorizeQR(matrix: number[][]): Promise<ProcessMatrixResult>;
}
