const API_URL = 'http://localhost:8000/api/v1';

export async function apiRequest(endpoint, options = {}) {
    // Agregar el token a cada request automáticamente
    const accessToken = localStorage.getItem('access_token');

    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
            ...options.headers,
        },
    };

    let response = await fetch(`${API_URL}${endpoint}`, config);

    // Si el access token expiró (401), intentar renovarlo una vez
    if (response.status === 401) {
        try {
            const newAccessToken = await refreshAccessToken();

            // Reintentar el request original con el nuevo token
            config.headers['Authorization'] = `Bearer ${newAccessToken}`;
            response = await fetch(`${API_URL}${endpoint}`, config);
        } catch {
            // No se pudo renovar → redirigir a login
            return;
        }
    }

    if (!response.ok) {
      let errorMessage = `Error ${response.status}`;
      try {
        const errorBody = await response.json();
        if (errorBody.detail) errorMessage = errorBody.detail;
        else if (typeof errorBody === 'object') {
          const firstKey = Object.keys(errorBody)[0];
          if (firstKey && Array.isArray(errorBody[firstKey])) {
            errorMessage = errorBody[firstKey][0];
          }
        }
      } catch {
        // ignore parse errors
      }
      throw new Error(errorMessage);
    }
    return response.json();
}

// Importar refreshAccessToken aquí también
import { refreshAccessToken } from './authService';