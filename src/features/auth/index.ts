import { createAuthUseCase } from './application/use-cases/useAuth';
import { AuthHttpAdapter } from './infrastructure/adapters/AuthHttpAdapter';

const authAdapter = new AuthHttpAdapter();

export function useAuth() {
  return createAuthUseCase(authAdapter);
}
