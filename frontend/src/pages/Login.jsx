import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Si ya hay token válido, redirigir a /admin
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/admin');
    } catch  {
      setError('Credenciales incorrectas. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(24,24,27,0.4)_60%,rgba(24,24,27,0.8)_100%)] pointer-events-none" />

      <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl hover:border-white/20 transition-all duration-500 animate-fade-in-up relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <p className="text-lg md:text-xl font-light tracking-[8px] text-cyan-300/90 mb-2">
            NEFTIK PHOTO
          </p>
          <h1 className="text-xl font-light tracking-wide text-white text-center">
            Acceso Administrativo
          </h1>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username input */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-light text-gray-300 mb-2"
            >
              Usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              placeholder="Ingresa tu usuario"
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-300/50 focus:bg-white/[0.08] focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            />
          </div>

          {/* Password input con toggle */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-light text-gray-300 mb-2"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="Ingresa tu contraseña"
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-300/50 focus:bg-white/[0.08] focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {showPassword ? (
                  /* Eye-off icon */
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  /* Eye icon */
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-300 hover:bg-cyan-200 text-gray-900 font-medium py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-300/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group"
          >
            <span className="relative z-10">{loading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Iniciando sesión...
              </>
            ) : (
              'Iniciar sesión'
            )}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </form>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-50">
        <div className="w-1 h-1 rounded-full bg-cyan-300 animate-pulse" />
        <div className="w-1 h-1 rounded-full bg-cyan-300 animate-pulse animation-delay-200" />
        <div className="w-1 h-1 rounded-full bg-cyan-300 animate-pulse animation-delay-400" />
      </div>
    </div>
  );
}
