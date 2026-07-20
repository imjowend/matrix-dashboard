import type { IAuthApi } from '../../domain/ports/IAuthApi';
import { API_URL } from '../../../../core/config/apiUrl';

export class AuthHttpAdapter implements IAuthApi {
  async login(username: string, password: string): Promise<string> {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Error al iniciar sesión');
    }
    return data.token;
  }
}
