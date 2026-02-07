import React from 'react';

const Logo = ({ className = "" }) => {
    return (
        <div className={`flex flex-col select-none ${className}`}>
            <div className="flex items-baseline space-x-2">
                <span className="font-serif text-3xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(oklch(from_var(--primary)_l_c_h_/_0.5))] tracking-tight">
                    PoetVerse
                </span>
                <span className="font-serif text-sm font-medium text-primary/80 tracking-[0.2em] uppercase">
                    by EMRYS
                </span>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-1 blur-[1px]" />
        </div>
    );
};

export default Logo;
