import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import { getUsers } from '../services/userService';
import { useDebounce } from '../hooks/useDebounce';
import SidebarItem from '../components/SidebarItem';
import DashboardSection from './admin/DashboardSection';
import ClientesSection from './admin/ClientesSection';
import AgregarClienteSection from './admin/AgregarClienteSection';

const NAV_ITEMS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1',
  },
  {
    key: 'clientes',
    label: 'Clientes',
    iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    key: 'agregar-cliente',
    label: 'Agregar Cliente',
    mobileLabel: 'Agregar',
    iconPath: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
  },
  {
    key: 'cotizaciones',
    label: 'Cotizaciones',
    iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
];

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersPage, setUsersPage] = useState(1);
  const [usersTotal, setUsersTotal] = useState(0);
  const [usersSearch, setUsersSearch] = useState('');
  const debouncedSearch = useDebounce(usersSearch, 300);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      navigate('/login');
      return;
    }
    try {
      const parts = accessToken.split('.');
      if (parts.length !== 3) throw new Error('Token inválido');
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      setUsername(payload.username || payload.preferred_username || payload.sub || 'Usuario');
    } catch {
      navigate('/login');
    }
  }, [navigate]);

  // Initial total count for the dashboard card
  useEffect(() => {
    getUsers(1, '').then((d) => setUsersTotal(d.count || 0)).catch(() => {});
  }, []);

  useEffect(() => {
    if (activeSection === 'clientes') setUsersPage(1);
  }, [activeSection]);

  const fetchUsers = useCallback(async (page, search) => {
    setUsersLoading(true);
    try {
      const data = await getUsers(page, search);
      setUsers(data.results || []);
      setUsersTotal(data.count || 0);
    } catch {
      setUsers([]);
    } finally {
      setUsersLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeSection === 'clientes') fetchUsers(usersPage, debouncedSearch);
  }, [activeSection, usersPage, debouncedSearch, fetchUsers]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // silent
    } finally {
      navigate('/login');
    }
  };

  return (
    <div className="flex h-screen bg-zinc-900">
      <aside className="w-64 bg-zinc-900/90 backdrop-blur-md border-r border-zinc-700 flex-col hidden md:flex">
        <div className="p-6 border-b border-zinc-700">
          <p className="text-lg font-light tracking-[6px] text-cyan-300/90">NEFTIK</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {NAV_ITEMS.map(({ key, label, iconPath }) => (
            <SidebarItem
              key={key}
              sectionKey={key}
              label={label}
              iconPath={iconPath}
              activeSection={activeSection}
              onClick={setActiveSection}
            />
          ))}
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

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-md border-t border-zinc-700 z-50 flex justify-around py-2">
        {NAV_ITEMS.map(({ key, label, mobileLabel, iconPath }) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            aria-current={activeSection === key ? 'page' : undefined}
            className={`flex flex-col items-center gap-1 px-3 py-1 transition-colors ${
              activeSection === key ? 'text-cyan-300' : 'text-gray-400'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
            </svg>
            <span className="text-[10px] font-medium">{mobileLabel || label}</span>
          </button>
        ))}
      </nav>

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-zinc-900/90 backdrop-blur border-b border-zinc-700 px-8 py-4">
          <p className="text-gray-300">
            Bienvenido, <span className="font-semibold text-white">{username}</span>
          </p>
        </div>

        <div className="flex-1 overflow-auto p-4 md:p-8 animate-fade-in-up pb-20 md:pb-8">
          {activeSection === 'dashboard' && (
            <DashboardSection usersTotal={usersTotal} />
          )}

          {activeSection === 'clientes' && (
            <ClientesSection
              users={users}
              usersLoading={usersLoading}
              usersPage={usersPage}
              usersTotal={usersTotal}
              usersSearch={usersSearch}
              debouncedSearch={debouncedSearch}
              setUsersPage={setUsersPage}
              setUsersSearch={setUsersSearch}
              onRefresh={() => fetchUsers(usersPage, debouncedSearch)}
            />
          )}

          {activeSection === 'agregar-cliente' && (
            <AgregarClienteSection
              onUserCreated={() => getUsers(1, '').then((d) => setUsersTotal(d.count || 0)).catch(() => {})}
            />
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
