function NavBar() {
    return (
        <nav className='w-full bg-zinc-900/50 h-16 text-white flex items-center justify-between px-8 sticky top-0 z-50 border-b border-zinc-700 backdrop-blur-md'>
            <div className='text-2xl font-light tracking-widest'>neftik photo</div>
            <div className='flex space-x-10'>
                <a href="#" className='font-light text-sm hover:text-cyan-300 transition-colors duration-200'>INICIO</a>
                <a href="#" className='font-light text-sm hover:text-cyan-300 transition-colors duration-200'>ALBUMS</a>
            </div>
            <div>
                <button className='bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-white font-semibold px-8 py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-400/50 text-sm uppercase tracking-wide'>
                    Contáctame
                </button>
            </div>
        </nav>
    )
}

export default NavBar