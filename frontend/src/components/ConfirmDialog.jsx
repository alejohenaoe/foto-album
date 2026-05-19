export default function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  danger = false,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onCancel}
    >
      <div
        className="bg-zinc-800 border border-zinc-700 rounded-2xl p-8 max-w-sm w-full space-y-5 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          {message && <p className="text-gray-400 text-sm mt-1">{message}</p>}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className={`flex-1 font-medium py-3 rounded-xl transition-all duration-300 ${
              danger
                ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
                : 'bg-cyan-300 hover:bg-cyan-200 text-gray-900'
            }`}
          >
            {confirmLabel}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 font-medium py-3 rounded-xl transition-all duration-300"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
