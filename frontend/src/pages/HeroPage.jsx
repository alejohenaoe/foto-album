import React, { useState } from 'react';

export default function HeroPage() {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted:', value);
        setValue('');
    };

    return (
        <div id='ingreso_galeria' className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-white">
           
            <div className="mb-6">
                <p className="text-xl font-light tracking-[14px]">NEFTIK PHOTO</p>
            </div>
            <div className="text-center mb-8 md:mb-16 max-w-4xl px-4">
                <p className="text-4xl md:text-6xl lg:text-7xl font-light  tracking-wider mb-1 font-serif ">
                    Doy vida a tu historia
                </p>
                <p className="text-3xl md:text-4xl lg:text-6xl font-light tracking-wider font-serif">
                    En <span className="text-cyan-300 font-semibold">imágenes</span>
                </p>
            </div>
            <form 
                onSubmit={handleSubmit} 
                className="w-[85%] max-w-md backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 md:p-10 space-y-6 shadow-2xl hover:bg-white/15 transition-all duration-300">
                <div className="mb-5">
                    <p className="text-lg font-extralight font-mono text-center">Accede a tu galería</p>
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(codigo) => setValue(codigo.target.value)}
                    placeholder="Código de acceso"
                    className="w-full bg-white/10 text-center border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:bg-white/20 transition-all"
                />
                <button 
                    type="submit"
                    className="w-full bg-cyan-300 hover:bg-cyan-200 text-gray-900 font-extralight font-mono py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-300/50">
                    Acceder
                </button>
            </form>
        </div>
    );
}