import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Verificar token y decodificar username
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      navigate('/login');
      return;
    }

    // Decodificar JWT (formato: header.payload.signature)
    try {
      const parts = accessToken.split('.');
      if (parts.length !== 3) throw new Error('Token inválido');

      const payload = JSON.parse(atob(parts[1]));
      // Buscar el campo de username (podría ser username, preferred_username, o sub)
      const user = payload.username || payload.preferred_username || payload.sub || 'Usuario';
      setUsername(user);
    } catch (err) {
      console.error('Error decodificando token:', err);
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Error en logout:', err);
    } finally {
      navigate('/login');
    }
  };

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        {/* Logo y título */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            {/* Shield icon */}
            <svg
              className="w-8 h-8 text-indigo-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
            <h1 className="text-xl font-bold text-white">Panel Admin</h1>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 p-4 space-y-2">
          {/* Dashboard */}
          <button
            onClick={() => setActiveSection('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeSection === 'dashboard'
                ? 'bg-slate-700 text-indigo-500 border-l-4 border-indigo-500'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            {/* Home icon */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            <span className="font-medium">Dashboard</span>
          </button>

          {/* Clientes */}
          <button
            onClick={() => setActiveSection('clientes')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeSection === 'clientes'
                ? 'bg-slate-700 text-indigo-500 border-l-4 border-indigo-500'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            {/* Users icon */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
            <span className="font-medium">Clientes</span>
          </button>

          {/* Agregar Cliente */}
          <button
            onClick={() => setActiveSection('agregar-cliente')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeSection === 'agregar-cliente'
                ? 'bg-slate-700 text-indigo-500 border-l-4 border-indigo-500'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            {/* User-plus icon */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 4c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm9 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5zm7-5v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2z" />
            </svg>
            <span className="font-medium">Agregar Cliente</span>
          </button>

          {/* Cotizaciones */}
          <button
            onClick={() => setActiveSection('cotizaciones')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeSection === 'cotizaciones'
                ? 'bg-slate-700 text-indigo-500 border-l-4 border-indigo-500'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            {/* Document icon */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-8-6z" />
            </svg>
            <span className="font-medium">Cotizaciones</span>
          </button>
        </nav>

        {/* Logout button */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg transition font-medium"
          >
            {/* Logout icon */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
            </svg>
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="bg-slate-800 border-b border-slate-700 px-8 py-4">
          <p className="text-slate-300">
            Bienvenido, <span className="font-semibold text-white">{username}</span>
          </p>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-auto p-8">
          {/* Dashboard Section */}
          {activeSection === 'dashboard' && (
            <div className="space-y-8">
              {/* Stat cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Clientes */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Clientes</p>
                      <p className="text-3xl font-bold text-white mt-2">0</p>
                    </div>
                    {/* Users icon */}
                    <svg
                      className="w-10 h-10 text-indigo-500 opacity-20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                  </div>
                </div>

                {/* Cotizaciones Enviadas */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Cotizaciones Enviadas</p>
                      <p className="text-3xl font-bold text-white mt-2">0</p>
                    </div>
                    {/* Document icon */}
                    <svg
                      className="w-10 h-10 text-indigo-500 opacity-20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-8-6z" />
                    </svg>
                  </div>
                </div>

                {/* Pendientes */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Pendientes</p>
                      <p className="text-3xl font-bold text-white mt-2">0</p>
                    </div>
                    {/* Clock icon */}
                    <svg
                      className="w-10 h-10 text-indigo-500 opacity-20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11.99 5C6.47 5 2 9.48 2 15s4.47 10 9.99 10C17.52 25 22 20.52 22 15S17.52 5 11.99 5zM15.5 15.5h-4v-4h1.5v2.5h2.5v1.5z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Placeholder message */}
              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 text-center">
                <p className="text-slate-400 text-lg">
                  Selecciona una sección para comenzar
                </p>
              </div>
            </div>
          )}

          {/* Clientes Section */}
          {activeSection === 'clientes' && (
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Clientes</h2>
              <p className="text-slate-400 text-lg">Próximamente</p>
            </div>
          )}

          {/* Agregar Cliente Section */}
          {activeSection === 'agregar-cliente' && (
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Agregar Cliente</h2>
              <p className="text-slate-400 text-lg">Próximamente</p>
            </div>
          )}

          {/* Cotizaciones Section */}
          {activeSection === 'cotizaciones' && (
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Cotizaciones</h2>
              <p className="text-slate-400 text-lg">Próximamente</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
