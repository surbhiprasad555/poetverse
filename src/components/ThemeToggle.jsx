import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="group relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-100/50 dark:bg-slate-800/50 backdrop-blur-md border border-gray-200/50 dark:border-slate-700/50 hover:border-indigo-500 transition-all duration-500 overflow-hidden"
            aria-label={theme === 'light' ? 'Switch to Night Mode' : 'Switch to Day Mode'}
        >
            <AnimatePresence mode="wait" initial={false}>
                {theme === 'light' ? (
                    <motion.div
                        key="sun"
                        initial={{ y: 20, opacity: 0, rotate: -90 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -20, opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.3, ease: 'backOut' }}
                    >
                        <Sun className="w-5 h-5 text-amber-500 fill-amber-500/10" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="moon"
                        initial={{ y: 20, opacity: 0, rotate: -90 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -20, opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.3, ease: 'backOut' }}
                    >
                        <Moon className="w-5 h-5 text-indigo-400 fill-indigo-400/10" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/0 via-indigo-500/0 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>
    );
};

export default ThemeToggle;
