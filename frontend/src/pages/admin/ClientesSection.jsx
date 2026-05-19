import { useState, useRef } from 'react';
import { deactivateUser, regenerateCode } from '../../services/userService';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function ClientesSection({
  users,
  usersLoading,
  usersPage,
  usersTotal,
  usersSearch,
  debouncedSearch,
  setUsersPage,
  setUsersSearch,
  onRefresh,
}) {
  const [actionLoading, setActionLoading] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [confirmDeactivate, setConfirmDeactivate] = useState(null);
  const searchInputRef = useRef(null);

  const totalPages = Math.max(1, Math.ceil(usersTotal / 10));

  const handleSearchChange = (e) => {
    setUsersSearch(e.target.value);
    setUsersPage(1);
  };

  const handleCopyCode = async (id, code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // silent
    }
  };

  const executeToggle = async (user) => {
    setActionLoading(user.id);
    try {
      if (user.is_active) {
        await deactivateUser(user.id);
      } else {
        await regenerateCode(user.id);
      }
      onRefresh();
    } catch {
      // silent
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleActive = (user) => {
    if (user.is_active) {
      setConfirmDeactivate(user);
    } else {
      executeToggle(user);
    }
  };

  const handleConfirmDeactivate = () => {
    const user = confirmDeactivate;
    setConfirmDeactivate(null);
    executeToggle(user);
  };

  const CopyIcon = ({ id }) =>
    copiedId === id ? (
      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ) : (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
      </svg>
    );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-4">Clientes</h2>

      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Buscar por email..."
          value={usersSearch}
          onChange={handleSearchChange}
          className="w-full md:w-80 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-300/50 transition-all duration-300"
        />
      </div>

      {usersLoading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-cyan-300 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : users.length === 0 ? (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-8 text-center">
          <p className="text-gray-400 text-lg">
            {debouncedSearch ? 'No se encontraron clientes con ese email.' : 'No hay clientes registrados.'}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider">
                  <th scope="col" className="text-left px-6 py-4 font-medium">Nombre</th>
                  <th scope="col" className="text-left px-6 py-4 font-medium">Email</th>
                  <th scope="col" className="text-left px-6 py-4 font-medium">Teléfono</th>
                  <th scope="col" className="text-left px-6 py-4 font-medium">Código</th>
                  <th scope="col" className="text-left px-6 py-4 font-medium">Estado</th>
                  <th scope="col" className="text-right px-6 py-4 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{u.name}</td>
                    <td className="px-6 py-4 text-gray-300">{u.email}</td>
                    <td className="px-6 py-4 text-gray-300">{u.phone}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <code className="bg-white/10 px-2 py-1 rounded text-cyan-300 font-mono text-sm tracking-widest">
                          {u.access_code}
                        </code>
                        <button
                          onClick={() => handleCopyCode(u.id, u.access_code)}
                          className="text-gray-400 hover:text-white transition-colors"
                          aria-label="Copiar código de acceso"
                        >
                          <CopyIcon id={u.id} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        u.is_active ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${u.is_active ? 'bg-green-400' : 'bg-red-400'}`} />
                        {u.is_active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleToggleActive(u)}
                        disabled={actionLoading === u.id}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                          u.is_active
                            ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                            : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                        } disabled:opacity-50`}
                      >
                        {actionLoading === u.id ? (
                          <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin inline-block" />
                        ) : u.is_active ? (
                          'Desactivar'
                        ) : (
                          'Activar'
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {users.map((u) => (
              <div key={u.id} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white font-medium">{u.name}</p>
                    <p className="text-gray-400 text-sm">{u.email}</p>
                    <p className="text-gray-400 text-sm">{u.phone}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    u.is_active ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                  }`}>
                    {u.is_active ? 'Activo' : 'Inactivo'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <code className="bg-white/10 px-2 py-1 rounded text-cyan-300 font-mono text-sm tracking-widest">
                    {u.access_code}
                  </code>
                  <button
                    onClick={() => handleCopyCode(u.id, u.access_code)}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Copiar código de acceso"
                  >
                    <CopyIcon id={u.id} />
                  </button>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => handleToggleActive(u)}
                    disabled={actionLoading === u.id}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                      u.is_active
                        ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                        : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                    } disabled:opacity-50`}
                  >
                    {actionLoading === u.id ? (
                      <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin inline-block mx-auto" />
                    ) : u.is_active ? (
                      'Desactivar'
                    ) : (
                      'Activar'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4">
            <p className="text-gray-400 text-sm">
              Página {usersPage} de {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setUsersPage((p) => Math.max(1, p - 1))}
                disabled={usersPage <= 1}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 text-gray-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                ← Anterior
              </button>
              <button
                onClick={() => setUsersPage((p) => Math.min(totalPages, p + 1))}
                disabled={usersPage >= totalPages}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 text-gray-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                Siguiente →
              </button>
            </div>
          </div>
        </>
      )}

      <ConfirmDialog
        open={confirmDeactivate !== null}
        title="¿Desactivar cliente?"
        message={`El código de acceso de ${confirmDeactivate?.name} será eliminado. Podrás reactivarlo más tarde.`}
        confirmLabel="Desactivar"
        cancelLabel="Cancelar"
        danger
        onConfirm={handleConfirmDeactivate}
        onCancel={() => setConfirmDeactivate(null)}
      />
    </div>
  );
}
