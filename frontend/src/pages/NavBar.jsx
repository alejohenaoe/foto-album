import { useState, useEffect } from 'react';

const WHATSAPP_NUMBER = '19736100707';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`w-full text-white sticky top-0 z-50 border-b border-zinc-700 backdrop-blur-md transition-all duration-300 ${scrolled ? 'bg-zinc-900/90 shadow-lg' : 'bg-zinc-900/50'}`}>
            <div className='flex items-center justify-between h-16 px-6 md:px-8'>
                <div className='text-2xl font-light tracking-widest hover:text-cyan-300 transition-colors duration-200 cursor-default'>
                    NEFTIK PHOTO
                </div>

                {/* Desktop nav */}
                <div className='hidden md:flex space-x-10'>
                    {['INICIO', 'ALBUMS'].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className='font-light text-sm uppercase tracking-wide relative group'
                        >
                            {item}
                            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-full' />
                        </a>
                    ))}
                </div>

                <div className='hidden md:block'>
                    <a
                        href={WHATSAPP_URL}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-white font-semibold px-8 py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-400/50 text-sm uppercase tracking-wide inline-block hover:scale-105'
                    >
                        Contáctame
                    </a>
                </div>

                {/* Mobile hamburger */}
                <button
                    className='md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5'
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label='Toggle menu'
                >
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </div>

            {/* Mobile menu with transition */}
            <div className={`md:hidden border-t border-zinc-700 transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-96 opacity-100 py-6' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className='px-6 flex flex-col gap-6'>
                    <div className='flex flex-col gap-4'>
                        {['INICIO', 'ALBUMS'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className='font-light text-sm uppercase tracking-wide hover:text-cyan-300 transition-colors duration-200'
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                    <div className='border-t border-zinc-700 pt-4'>
                        <a
                            href={WHATSAPP_URL}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold px-6 py-2.5 rounded-lg text-sm uppercase tracking-wide w-full block text-center hover:scale-105 transition-transform'
                        >
                            Contáctame
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;