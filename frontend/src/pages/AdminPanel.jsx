import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      navigate('/login');
      return;
    }

    try {
      const parts = accessToken.split('.');
      if (parts.length !== 3) throw new Error('Token inválido');

      const payload = JSON.parse(atob(parts[1]));
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
    <div className="flex h-screen bg-zinc-900">
      <aside className="w-64 bg-zinc-900/90 backdrop-blur-md border-r border-zinc-700 flex flex-col">
        <div className="p-6 border-b border-zinc-700">
          <p className="text-lg font-light tracking-[6px] text-cyan-300/90">NEFTIK</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveSection('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeSection === 'dashboard'
                ? 'bg-white/5 text-cyan-300 border-l-4 border-cyan-300'
                : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
            </svg>
            <span className="font-medium">Dashboard</span>
          </button>

          <button
            onClick={() => setActiveSection('clientes')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeSection === 'clientes'
                ? 'bg-white/5 text-cyan-300 border-l-4 border-cyan-300'
                : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium">Clientes</span>
          </button>

          <button
            onClick={() => setActiveSection('agregar-cliente')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeSection === 'agregar-cliente'
                ? 'bg-white/5 text-cyan-300 border-l-4 border-cyan-300'
                : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span className="font-medium">Agregar Cliente</span>
          </button>

          <button
            onClick={() => setActiveSection('cotizaciones')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeSection === 'cotizaciones'
                ? 'bg-white/5 text-cyan-300 border-l-4 border-cyan-300'
                : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-medium">Cotizaciones</span>
          </button>
        </nav>

        <div className="p-4 border-t border-zinc-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg transition-all duration-200 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-zinc-900/90 backdrop-blur border-b border-zinc-700 px-8 py-4">
          <p className="text-gray-300">
            Bienvenido, <span className="font-semibold text-white">{username}</span>
          </p>
        </div>

        <div className="flex-1 overflow-auto p-8 animate-fade-in-up">
          {activeSection === 'dashboard' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Clientes</p>
                      <p className="text-3xl font-bold text-white mt-2">0</p>
                    </div>
                    <svg className="w-10 h-10 text-cyan-300 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                  </div>
                </div>

                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Cotizaciones Enviadas</p>
                      <p className="text-3xl font-bold text-white mt-2">0</p>
                    </div>
                    <svg className="w-10 h-10 text-cyan-300 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-8-6z" />
                    </svg>
                  </div>
                </div>

                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Pendientes</p>
                      <p className="text-3xl font-bold text-white mt-2">0</p>
                    </div>
                    <svg className="w-10 h-10 text-cyan-300 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.99 5C6.47 5 2 9.48 2 15s4.47 10 9.99 10C17.52 25 22 20.52 22 15S17.52 5 11.99 5zM15.5 15.5h-4v-4h1.5v2.5h2.5v1.5z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-8 text-center hover:border-white/20 transition-all duration-300">
                <p className="text-gray-400 text-lg">
                  Selecciona una sección para comenzar
                </p>
              </div>
            </div>
          )}

          {activeSection === 'clientes' && (
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-8 text-center hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-2">Clientes</h2>
              <p className="text-gray-400 text-lg">Próximamente</p>
            </div>
          )}

          {activeSection === 'agregar-cliente' && (
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-8 text-center hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-2">Agregar Cliente</h2>
              <p className="text-gray-400 text-lg">Próximamente</p>
            </div>
          )}

          {activeSection === 'cotizaciones' && (
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-8 text-center hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-2">Cotizaciones</h2>
              <p className="text-gray-400 text-lg">Próximamente</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
