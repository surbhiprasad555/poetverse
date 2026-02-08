import React from "react";

/**
 * Simplified SpotlightCard
 * Serves as a premium container for cards.
 * The ambient cursor glow is now handled globally in CursorGlow.jsx
 */
const SpotlightCard = ({ children, className = "" }) => {
    return (
        <div
            className={`relative overflow-hidden rounded-2xl bg-white/10 ${className}`}
        >
            {children}
        </div>
    );
};

export default SpotlightCard;
