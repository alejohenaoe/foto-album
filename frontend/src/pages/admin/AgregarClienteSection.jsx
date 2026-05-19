import { useState } from 'react';
import { createUser } from '../../services/userService';

export default function AgregarClienteSection({ onUserCreated }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [createdUser, setCreatedUser] = useState(null);
  const [copiedModal, setCopiedModal] = useState(false);

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setFormError('Todos los campos son obligatorios.');
      return;
    }

    setFormSubmitting(true);
    try {
      const result = await createUser(formData);
      setCreatedUser(result);
      setFormData({ name: '', email: '', phone: '' });
      onUserCreated?.();
    } catch (err) {
      setFormError(err.message || 'Error al crear el cliente.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleCopyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedModal(true);
      setTimeout(() => setCopiedModal(false), 2000);
    } catch {
      // silent
    }
  };

  const handleCloseModal = () => {
    setCreatedUser(null);
    setCopiedModal(false);
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Agregar Cliente</h2>

      <form onSubmit={handleFormSubmit} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Nombre completo"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-300/50 transition-all duration-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            placeholder="correo@ejemplo.com"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-300/50 transition-all duration-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleFormChange}
            placeholder="300 000 0000"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-300/50 transition-all duration-300"
          />
        </div>

        {formError && (
          <p className="text-red-400 text-sm">{formError}</p>
        )}

        <button
          type="submit"
          disabled={formSubmitting}
          className="w-full bg-cyan-300 hover:bg-cyan-200 text-gray-900 font-medium py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-300/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formSubmitting ? 'Creando...' : 'Crear Cliente'}
        </button>
      </form>

      {/* Success modal */}
      {createdUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-zinc-800 border border-zinc-700 rounded-2xl p-8 max-w-sm w-full text-center space-y-5 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-1">Cliente creado</h3>
              <p className="text-gray-400 text-sm">{createdUser.name}</p>
            </div>

            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Código de acceso</p>
              <p className="text-3xl font-mono font-bold text-cyan-300 tracking-[8px]">{createdUser.access_code}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleCopyCode(createdUser.access_code)}
                className="flex-1 bg-cyan-300 hover:bg-cyan-200 text-gray-900 font-medium py-3 rounded-xl transition-all duration-300"
              >
                {copiedModal ? '¡Copiado!' : 'Copiar código'}
              </button>
              <button
                onClick={handleCloseModal}
                className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 font-medium py-3 rounded-xl transition-all duration-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
