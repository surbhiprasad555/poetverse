import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus, LogIn, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login, signup } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password);
                navigate('/');
            } else {
                await signup(email, password, {
                    username,
                    display_name: displayName
                });
                // Supabase typically sends a confirmation email
                setError('Please check your email to confirm your registration.');
            }
        } catch (err) {
            setError(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-background p-4 transition-colors duration-300 overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.01 }}
                transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    scale: { duration: 0.4, ease: "easeOut" }
                }}
                className="relative mx-auto bg-card/90 backdrop-blur-xl rounded-[3rem] shadow-2xl w-full max-w-[480px] overflow-hidden border border-border hover:border-primary/40 hover:shadow-[0_0_60px_rgba(oklch(from_var(--primary)_l_c_h_/_0.2))] transition-all duration-500"
            >
                <div className="p-8 md:p-12 pb-10 relative flex flex-col items-center">
                    <motion.div
                        animate={{
                            rotate: [0, 10, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="mb-6 text-primary drop-shadow-[0_0_15px_rgba(oklch(from_var(--primary)_l_c_h_/_0.5))]"
                    >
                        <Sparkles className="w-12 h-12 opacity-50" />
                    </motion.div>

                    <div className="mb-10 text-center w-full">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 drop-shadow-[0_0_15px_rgba(oklch(from_var(--primary)_l_c_h_/_0.3))]">
                            {isLogin ? 'Ink your return' : 'Awaken your Muse'}
                        </h2>
                        <p className="font-serif italic text-muted-foreground text-sm md:text-base max-w-[280px] md:max-w-xs mx-auto leading-relaxed">
                            {isLogin
                                ? '"Every entry is a new breath on a waiting page."'
                                : '"Join the silent dance of words and light."'}
                        </p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-8 w-full max-w-sm p-4 bg-destructive/10 text-destructive text-sm rounded-2xl text-center border border-destructive/20"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm mx-auto">
                        {!isLogin && (
                            <div className="space-y-5">
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors w-5 h-5" />
                                    <input
                                        type="text"
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-muted/20 text-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 hover:border-primary/30 transition-all duration-300 font-sans shadow-inner"
                                        placeholder="Pick a unique username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="relative group">
                                    <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors w-5 h-5" />
                                    <input
                                        type="text"
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-muted/20 text-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 hover:border-primary/30 transition-all duration-300 font-sans shadow-inner"
                                        placeholder="Display Name (Your Pen Name)"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        )}
                        <div className="space-y-5">
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors w-5 h-5" />
                                <input
                                    type="email"
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-muted/20 text-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 hover:border-primary/30 transition-all duration-300 font-sans shadow-inner"
                                    placeholder="Your Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors w-5 h-5" />
                                <input
                                    type="password"
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-muted/20 text-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 hover:border-primary/30 transition-all duration-300 font-sans shadow-inner"
                                    placeholder="Secret Key"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-2xl shadow-[0_0_20px_rgba(oklch(from_var(--primary)_l_c_h_/_0.3))] hover:shadow-[0_0_30px_rgba(oklch(from_var(--primary)_l_c_h_/_0.5))] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:scale-100 group/btn"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                                    <span className="text-lg tracking-wide">{isLogin ? 'Begin Journey' : 'Join the Circle'}</span>
                                </div>
                            )}
                        </button>
                    </form>
                </div>

                <div className="bg-background/50 px-8 md:px-12 py-10 text-center border-t border-border/30">
                    <p className="text-muted-foreground text-sm font-sans tracking-wide">
                        {isLogin ? "New to the world of verse?" : "Already part of the narrative?"}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-primary font-bold ml-2 hover:text-primary/80 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
                        >
                            {isLogin ? 'Create Account' : 'Step Inside'}
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Auth;
