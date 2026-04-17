import { useState } from 'react';

const WHATSAPP_NUMBER = '19736100707'; // Reemplaza con tu número (código de país sin +)
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className='w-full bg-zinc-900/50 text-white sticky top-0 z-50 border-b border-zinc-700 backdrop-blur-md'>
            <div className='flex items-center justify-between h-16 px-6 md:px-8'>
                <div className='text-2xl font-light tracking-widest'>neftik photo</div>

                {/* Desktop nav */}
                <div className='hidden md:flex space-x-10'>
                    <a href="#" className='font-light text-sm hover:text-cyan-300 transition-colors duration-200'>INICIO</a>
                    <a href="#" className='font-light text-sm hover:text-cyan-300 transition-colors duration-200'>ALBUMS</a>
                </div>
                <div className='hidden md:block'>
                    <a
                        href={WHATSAPP_URL}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-white font-semibold px-8 py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-400/50 text-sm uppercase tracking-wide inline-block'
                    >
                        Contáctame
                    </a>
                </div>

                {/* Mobile hamburger */}
                <button
                    className='md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5'
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label='Abrir menú'
                >
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
                <div className='md:hidden border-t border-zinc-700 px-6 py-6 flex flex-col gap-6'>
                    <div className='flex flex-col gap-4'>
                        <a href="#" className='font-light text-sm tracking-widest hover:text-cyan-300 transition-colors duration-200 uppercase'>INICIO</a>
                        <a href="#" className='font-light text-sm tracking-widest hover:text-cyan-300 transition-colors duration-200 uppercase'>ALBUMS</a>
                    </div>
                    <div className='border-t border-zinc-700 pt-4'>
                        <a
                            href={WHATSAPP_URL}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 shadow-lg text-sm uppercase tracking-wide w-full block text-center'
                        >
                            Contáctame
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default NavBar;