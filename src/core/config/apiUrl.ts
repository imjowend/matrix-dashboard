// En dev, VITE_API_URL queda vacío y los fetch usan paths relativos,
// resueltos por el proxy de vite.config.js hacia localhost:3000.
// En producción (Vercel), VITE_API_URL apunta al dominio real de matrix-core-api.
export const API_URL = import.meta.env.VITE_API_URL || '';
