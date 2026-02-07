import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Heart, Plus, Sparkles, Grid, MessageCircle, Share2, AtSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import FeaturedSection from '../components/FeaturedSection';
import SpotlightCard from '../components/SpotlightCard';
import { supabase } from '../lib/supabase';

const PoemCard = ({ poem, colorClass, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            className={isExpanded ? "col-span-1 md:col-span-2 lg:col-span-3" : ""}
        >
            <SpotlightCard
                className={`${isExpanded ? "min-h-[22rem]" : "h-[22rem]"} ${colorClass} bg-card dark:bg-card border border-border/50 hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(oklch(from_var(--primary)_l_c_h_/_0.2))] transition-all duration-500 rounded-[2.5rem] cursor-pointer group`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="p-8 h-full flex flex-col justify-between relative z-10">
                    <div className="space-y-5">
                        <div className="flex justify-between items-start">
                            <div className="bg-card/60 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold text-muted-foreground shadow-sm border border-border/20 uppercase tracking-widest">
                                #{poem.tags?.[0] || 'poetry'}
                            </div>
                            <div className="text-[10px] font-bold text-primary/60 uppercase tracking-widest bg-card/40 px-3 py-1 rounded-full border border-border/10">
                                {isExpanded ? 'Click to minimize' : 'Click to expand'}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-serif text-2xl font-bold text-foreground leading-tight transition-colors">
                                {poem.title}
                            </h3>
                        </div>

                        <div className="relative overflow-hidden transition-all duration-500">
                            <p
                                className={`font-serif text-foreground/80 whitespace-pre-line text-lg opacity-85 italic leading-relaxed transition-all duration-500 ${!isExpanded ? 'line-clamp-4' : ''}`}
                            >
                                "{poem.content}"
                            </p>
                            {!isExpanded && poem.content?.length > 150 && (
                                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background/10 to-transparent pointer-events-none" />
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
                        <Link
                            to={poem.author_id ? `/profile` : '#'}
                            className="flex items-center space-x-3 group/author"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-9 h-9 rounded-2xl bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground shadow-sm group-hover/author:shadow-md group-hover/author:rotate-3 transition-all overflow-hidden border border-border">
                                {poem.author?.username ? (
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${poem.author.username}`} alt="avatar" />
                                ) : (
                                    poem.author?.display_name?.charAt(0) || 'A'
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-foreground group-hover/author:text-primary transition-colors">
                                    {poem.author?.display_name || 'Anonymous'}
                                </span>
                                {poem.author?.username && (
                                    <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-0.5">
                                        <AtSign className="w-2 h-2" />{poem.author.username}
                                    </span>
                                )}
                            </div>
                        </Link>
                        <div className="flex items-center space-x-2 sm:space-x-3" onClick={(e) => e.stopPropagation()}>
                            <button className="p-2 text-muted-foreground hover:text-primary transition-all transform hover:scale-110">
                                <MessageCircle className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-muted-foreground hover:text-primary transition-all transform hover:scale-110">
                                <Share2 className="w-5 h-5" />
                            </button>
                            <button className="flex items-center gap-1.5 p-2 px-3 bg-muted/50 rounded-full text-muted-foreground hover:text-destructive transition-all transform hover:scale-105 group/like">
                                <Heart className="w-4 h-4 group-hover/like:fill-destructive transition-all" />
                                <span className="text-xs font-bold">{poem.likes_count || 0}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </SpotlightCard>
        </motion.div>
    );
};

const Home = () => {
    const [poems, setPoems] = useState([]);
    const [visibleCount, setVisibleCount] = useState(9);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPoems = async () => {
            try {
                const { data, error } = await supabase
                    .from('poems')
                    .select('*, author:profiles(*) ')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setPoems(data || []);
            } catch (e) {
                console.error("Fetch failed:", e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPoems();
    }, []);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 6);
    };

    const MOODS = [
        { mood: "Love", color: "bg-primary/5" },
        { mood: "Heartbreak", color: "bg-muted/50" },
        { mood: "Peace", color: "bg-accent/10" },
        { mood: "Nature", color: "bg-secondary/10" },
        { mood: "Dreams", color: "bg-primary/10" },
        { mood: "Melancholy", color: "bg-muted/30" },
    ];

    const COLORS = [
        'bg-pastel-purple', 'bg-pastel-pink', 'bg-pastel-primary', 'bg-pastel-secondary', 'bg-pastel-blue', 'bg-pastel-green'
    ];

    return (
        <div className="pt-28 pb-20 min-h-screen bg-background text-foreground transition-colors duration-500">
            {/* Header / Moods Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12 space-y-4"
                >
                    <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground tracking-tight dark:drop-shadow-[0_0_20px_rgba(oklch(from_var(--primary)_l_c_h_/_0.3))]">
                        Explore the Verse
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto font-serif italic text-xl">
                        "Where every whisper finds a home and every thought finds a wing."
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-3">
                    {MOODS.map((m, i) => (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            key={m.mood}
                            className={`px-8 py-3 rounded-full text-xs font-bold tracking-widest text-foreground hover:scale-105 active:scale-95 transition-all shadow-sm hover:shadow-primary/20 border border-border/50 ${m.color} uppercase`}
                        >
                            #{m.mood.toLowerCase()}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Main Bento Grid Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {loading ? (
                    <div className="min-h-[400px] flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-muted border-t-primary rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-20">
                            {poems.slice(0, visibleCount).map((poem, i) => (
                                <PoemCard key={poem.id || i} poem={poem} colorClass={COLORS[i % COLORS.length]} index={i} />
                            ))}
                        </div>

                        {/* Load More Button */}
                        {visibleCount < poems.length && (
                            <div className="flex justify-center mb-24">
                                <button
                                    onClick={handleLoadMore}
                                    className="group relative px-10 py-5 bg-card border border-border text-foreground font-bold rounded-full shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-3 tracking-widest uppercase text-xs">
                                        Discover More <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                                    </span>
                                </button>
                            </div>
                        )}

                        {/* End of content delimiter */}
                        {visibleCount >= poems.length && (
                            <div className="py-24 text-center relative">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="relative z-10 flex flex-col items-center justify-center"
                                >
                                    <h3 className="font-serif text-4xl md:text-6xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-8 pb-2">
                                        That's everything for now!
                                    </h3>

                                    <p className="font-serif text-muted-foreground text-base md:text-lg italic max-w-md mx-auto leading-relaxed opacity-60 font-light tracking-wide">
                                        "but the ink never truly dries...<br />
                                        awaiting your next breath."
                                    </p>
                                </motion.div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Featured Section */}
            <FeaturedSection />

            {/* Floating Write Button */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="fixed bottom-10 right-10 z-50"
            >
                <Link to="/write" className="group flex items-center justify-center w-20 h-20 bg-gray-900 dark:bg-indigo-600 text-white rounded-[2rem] shadow-2xl hover:bg-black dark:hover:bg-indigo-700 transition-all">
                    <Plus className="w-10 h-10 group-hover:rotate-90 transition-transform duration-500" />
                </Link>
            </motion.div>
        </div>
    );
};

export default Home;
