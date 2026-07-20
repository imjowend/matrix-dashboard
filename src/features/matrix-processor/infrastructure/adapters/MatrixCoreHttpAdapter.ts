import type { IMatrixCoreApi, RotateMatrixResult, ProcessMatrixResult } from '../../domain/ports/IMatrixCoreApi';
import { token } from '../../../../core/store/authStore';
import { API_URL } from '../../../../core/config/apiUrl';

export class MatrixCoreHttpAdapter implements IMatrixCoreApi {
  private async fetchWithAuth(endpoint: string, body: any) {
    if (!token.value) throw new Error('No autorizado (Token faltante)');

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`,
      },
      body: JSON.stringify(body),
    });

    if (res.status === 401) {
      throw new Error('Sesión expirada. Inicia sesión nuevamente.');
    }

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error(`Matrix API error (${res.status}):`, data);
      throw new Error(data.error || 'Ocurrió un error al procesar la matriz.');
    }

    return res.json();
  }

  async rotateMatrix(matrix: number[][]): Promise<RotateMatrixResult> {
    return this.fetchWithAuth('/rotate-matrix', { matriz: matrix });
  }

  async factorizeQR(matrix: number[][]): Promise<ProcessMatrixResult> {
    return this.fetchWithAuth('/process-matrix', { matriz: matrix });
  }
}
