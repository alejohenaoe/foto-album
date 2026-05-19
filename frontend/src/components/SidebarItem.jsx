export default function SidebarItem({ sectionKey, label, iconPath, activeSection, onClick }) {
  return (
    <button
      onClick={() => onClick(sectionKey)}
      aria-current={activeSection === sectionKey ? 'page' : undefined}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        activeSection === sectionKey
          ? 'bg-white/5 text-cyan-300 border-l-4 border-cyan-300'
          : 'text-gray-300 hover:bg-white/5'
      }`}
    >
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
      </svg>
      <span className="font-medium">{label}</span>
    </button>
  );
}
