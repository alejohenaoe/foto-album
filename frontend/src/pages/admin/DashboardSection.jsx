export default function DashboardSection({ usersTotal }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Clientes</p>
              <p className="text-3xl font-bold text-white mt-2">{usersTotal}</p>
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
        <p className="text-gray-400 text-lg">Selecciona una sección para comenzar</p>
      </div>
    </div>
  );
}
