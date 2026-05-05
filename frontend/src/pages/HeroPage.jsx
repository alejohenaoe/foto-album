import React, { useState } from 'react';

export default function HeroPage() {
    const [value, setValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted:', value);
        setValue('');
    };

    return (
        <div id='ingreso_galeria' className="relative h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-white overflow-hidden">
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(24,24,27,0.4)_60%,rgba(24,24,27,0.8)_100%)] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center animate-fade-in-up">
                <div className="mb-8 md:mb-12">
                    <p className="text-lg md:text-xl font-light tracking-[8px] text-cyan-300/90">
                        NEFTIK PHOTO
                    </p>
                </div>

                <div className="text-center mb-10 md:mb-16 max-w-4xl px-4 animate-fade-in-up animation-delay-200">
                    <p className="text-4xl md:text-5xl lg:text-7xl font-light tracking-wide mb-2 font-serif">
                        Doy vida a tu historia
                    </p>
                    <p className="text-3xl md:text-4xl lg:text-6xl font-light tracking-wide font-serif">
                        En <span className="text-cyan-300 font-medium">imágenes</span>
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="w-[85%] max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 space-y-6 shadow-2xl hover:border-white/20 transition-all duration-500 animate-fade-in-up animation-delay-400"
                >
                    <div className="mb-4">
                        <p className="text-base md:text-lg font-light text-center text-gray-300">
                            Accede a tu galería
                        </p>
                    </div>

                    <div className={`relative transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="Código de acceso"
                            className="w-full bg-white/5 text-center border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-300/50 focus:bg-white/[0.08] focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-cyan-300 hover:bg-cyan-200 text-gray-900 font-medium py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-300/30 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                    >
                        <span className="relative z-10">Acceder</span>
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