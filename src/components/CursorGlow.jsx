import React, { useEffect, useState } from 'react';

/**
 * Global CursorGlow Component
 * Creates a soft, premium light follow effect that works across the entire page,
 * including blank spaces and interactive cards.
 */
const CursorGlow = () => {
    const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            if (opacity === 0) setOpacity(1);
        };

        const handleMouseLeave = () => setOpacity(0);
        const handleMouseEnter = () => setOpacity(1);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [opacity]);

    return (
        <div
            id="global-cursor-glow"
            className="fixed top-0 left-0 w-[600px] h-[600px] pointer-events-none z-[9999] transition-opacity duration-300 ease-out"
            style={{
                left: mousePos.x,
                top: mousePos.y,
                opacity: opacity,
                transform: 'translate(-50%, -50%)',
                background: `radial-gradient(
                    circle,
                    rgba(255, 230, 200, 0.08) 0%,
                    rgba(255, 230, 200, 0.04) 25%,
                    rgba(255, 230, 200, 0.01) 45%,
                    transparent 70%
                )`,
            }}
        />
    );
};

export default CursorGlow;
