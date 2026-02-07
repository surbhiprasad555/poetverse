import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Force dark theme as per user's latest request
    const [theme] = useState('dark');

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.add('dark');
        // Clean up any light mode leftovers
        root.classList.remove('light');
        localStorage.setItem('poetverse_theme', 'dark');
    }, []);

    const toggleTheme = () => {
        // No-op or notification that only dark theme is supported
        console.log("Only Dark Theme is supported.");
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
