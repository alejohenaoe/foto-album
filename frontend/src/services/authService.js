const API_URL = 'http://localhost:8000/api/v1';

// --- Login ---
export async function login(username, password) {
    const response = await fetch(`${API_URL}/users/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) throw new Error('Credenciales inválidas');

    const data = await response.json();

    // Guardar en localStorage (simple pero no ideal para producción)
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);

    return data;
}

// --- Logout ---
export async function logout() {
    const refresh = localStorage.getItem('refresh_token');

    await fetch(`${API_URL}/users/auth/logout/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({ refresh }),
    });

    // Limpiar tokens del cliente
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
}

// --- Renovar access token automáticamente ---
export async function refreshAccessToken() {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) throw new Error('No hay refresh token');

    const response = await fetch(`${API_URL}/users/auth/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
    });

    if (!response.ok) {
        // El refresh token expiró → forzar logout
        localStorage.clear();
        window.location.href = '/login';
        throw new Error('Sesión expirada');
    }

    const data = await response.json();
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);

    return data.access;
}