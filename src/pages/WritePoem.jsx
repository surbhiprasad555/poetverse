import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Feather, Sparkles, Send, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

const WritePoem = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/auth');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsSubmitting(true);

        try {
            const { error } = await supabase
                .from('poems')
                .insert({
                    title,
                    content,
                    tags: tags.split(',').map(tag => tag.trim().replace('#', '')).filter(t => t),
                    author_id: user.id
                });

            if (error) throw error;
            navigate('/');
        } catch (error) {
            console.error('Error publishing poem:', error.message);
            alert('The ink spilled... ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) return null;

    return (
        <div className="pt-24 pb-20 min-h-screen bg-background transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                        Etch your Soul
                    </h1>
                    <p className="text-muted-foreground font-serif italic text-lg">
                        "Wait for the whisper, then let the ink flow."
                    </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="relative">
                    <div className="bg-card rounded-[3rem] shadow-2xl shadow-primary/5 p-8 md:p-12 border border-border transition-all">
                        <div className="space-y-8">
                            {/* Title Input */}
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-transparent border-b-2 border-border focus:border-primary py-4 text-3xl font-serif font-bold text-foreground outline-none transition-all placeholder:text-muted-foreground/30"
                                    placeholder="Title your Masterpiece..."
                                    required
                                />
                            </div>

                            {/* Content Textarea */}
                            <div className="relative">
                                <div className="absolute -left-6 top-0 opacity-10">
                                    <Sparkles className="w-12 h-12 text-primary" />
                                </div>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows="12"
                                    className="w-full bg-transparent text-xl font-serif leading-relaxed text-foreground/80 outline-none resize-none placeholder:text-muted-foreground/30"
                                    placeholder="Begin your journey here..."
                                    required
                                ></textarea>
                            </div>

                            {/* Tags Input */}
                            <div className="pt-8 border-t border-border">
                                <div className="flex flex-wrap items-center gap-4">
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Atmosphere:</span>
                                    <input
                                        type="text"
                                        value={tags}
                                        onChange={(e) => setTags(e.target.value)}
                                        className="flex-1 bg-muted/30 px-6 py-3 rounded-full border border-border text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-foreground"
                                        placeholder="#nature, #midnight, #solitude"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-12 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-card shadow-sm">
                                    <img src={user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} alt="Author" className="w-full h-full object-cover" />
                                </div>
                                <p className="text-sm font-bold text-muted-foreground">Writing as <span className="text-primary">{user.display_name}</span></p>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground rounded-full font-bold shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span>Publish Verse</span>
                                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WritePoem;
