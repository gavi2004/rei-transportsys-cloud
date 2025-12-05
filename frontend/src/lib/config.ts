// Configuración de API basada en el entorno
export const API_HOST = 'pioneros.bitforges.com';
export const API_PORT = 3500;

// URL del API - se ajusta automáticamente según el entorno
export const API_URL = typeof window !== 'undefined' 
    ? (window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')
        ? `http://localhost:${API_PORT}`
        : 'https://api-pioneros.bitforges.com')
    : 'https://api-pioneros.bitforges.com';
