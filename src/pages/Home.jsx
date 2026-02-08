import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Heart, Plus, Sparkles, MessageCircle, Share2, AtSign, Maximize2, Minimize2 } from 'lucide-react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import FeaturedSection from '../components/FeaturedSection';
import SpotlightCard from '../components/SpotlightCard';
import { supabase } from '../lib/supabase';
import { POEM_LIBRARY } from '../lib/poems';

import PoemCard from '../components/PoemCard';

const Home = () => {
    const { tagName } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [poems, setPoems] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [loading, setLoading] = useState(true);
    const [selectedTag, setSelectedTag] = useState(tagName || null);

    const EXPLORE_PHRASES = [
        "Follow the ink further...",
        "Unfold the next stanza",
        "Deeper into the verse",
        "Turn the page of dreams"
    ];

    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

    const handleExplore = () => {
        setVisibleCount(prev => Math.min(prev + 12, 50));
        setCurrentPhraseIndex(prev => (prev + 1) % EXPLORE_PHRASES.length);
    };

    useEffect(() => {
        if (tagName) {
            setSelectedTag(tagName);
        } else {
            setSelectedTag(null);
        }
    }, [tagName]);

    useEffect(() => {
        const fetchPoems = async () => {
            setLoading(true);
            try {
                let query = supabase
                    .from('poems')
                    .select('*, author:profiles(*) ')
                    .order('created_at', { ascending: false });

                if (selectedTag) {
                    // Filter by tag if selected
                    query = query.contains('tags', [selectedTag.toLowerCase()]);
                }

                const { data, error } = await query;

                if (error) console.error("Supabase error:", error);

                let userContent = data || [];

                // Also filter local library if needed
                let libraryContent = POEM_LIBRARY;
                if (selectedTag) {
                    libraryContent = POEM_LIBRARY.filter(p =>
                        p.tags?.some(t => t.toLowerCase() === selectedTag.toLowerCase())
                    );
                }

                const combined = [...userContent, ...libraryContent].slice(0, 50);
                setPoems(combined);
            } catch (e) {
                console.error("Fetch failed:", e.message);
                let fallback = POEM_LIBRARY;
                if (selectedTag) {
                    fallback = POEM_LIBRARY.filter(p =>
                        p.tags?.some(t => t.toLowerCase() === selectedTag.toLowerCase())
                    );
                }
                setPoems(fallback.slice(0, 50));
            } finally {
                setLoading(false);
            }
        };

        fetchPoems();
    }, [selectedTag]);

    const MOODS = [
        { mood: "All", color: "bg-muted/20" },
        { mood: "Classic", color: "bg-accent/10" },
        { mood: "Love", color: "bg-primary/5" },
        { mood: "Heartbreak", color: "bg-muted/50" },
        { mood: "Peace", color: "bg-accent/10" },
        { mood: "Nature", color: "bg-secondary/10" },
        { mood: "Dreams", color: "bg-primary/10" },
        { mood: "Melancholy", color: "bg-muted/30" },
        { mood: "Quotes", color: "bg-accent/5" },
        { mood: "Limericks", color: "bg-primary/5" },
        { mood: "Life", color: "bg-secondary/10" },
        { mood: "Hope", color: "bg-primary/5" },
        { mood: "Soul", color: "bg-accent/10" },
    ];

    const COLORS = [
        'bg-dusty-rose', 'bg-sage-green', 'bg-pale-lavender', 'bg-muted-sand'
    ];

    const handleTagClick = (tag) => {
        if (tag === 'All') {
            setSelectedTag(null);
            navigate('/');
        } else {
            const normalized = tag.toLowerCase();
            setSelectedTag(normalized);
            navigate(`/tag/${normalized}`);
        }
    };

    const navigate = useNavigate();

    return (
        <div className="pt-28 pb-20 min-h-screen bg-background text-foreground transition-colors duration-500">

            {/* Middle Section: Main Poem Grid & Content (Now First) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header / Moods Section */}
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12 space-y-4"
                    >
                        <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground tracking-tight">
                            {selectedTag ? `Verses of #${selectedTag}` : 'Explore the Verse'}
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto font-serif italic text-xl">
                            {selectedTag
                                ? "Discovering the whispers of a specific mood."
                                : '"Where every whisper finds a home and every thought finds a wing."'}
                        </p>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-3">
                        {MOODS.map((m, i) => {
                            const isActive = (m.mood === 'All' && !selectedTag) ||
                                (selectedTag && m.mood.toLowerCase() === selectedTag.toLowerCase());
                            return (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={m.mood}
                                    onClick={() => handleTagClick(m.mood)}
                                    className={`px-8 py-3 rounded-full text-xs font-bold tracking-widest text-foreground hover:scale-105 active:scale-95 transition-all shadow-sm border border-border/50 uppercase ${isActive ? 'ring-2 ring-primary bg-primary/20 scale-105' : m.color}`}
                                >
                                    #{m.mood.toLowerCase()}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {loading ? (
                    <div className="min-h-[400px] flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-muted border-t-primary rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        {/* Poem Grid */}
                        {poems.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-20">
                                {poems.slice(0, visibleCount).map((poem, i) => (
                                    <PoemCard key={poem.id || i} poem={poem} colorClass={COLORS[i % COLORS.length]} index={i} />
                                ))}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="min-h-[300px] flex flex-col items-center justify-center text-center space-y-6 bg-card/30 rounded-[3rem] border border-border p-12"
                            >
                                <Sparkles className="w-16 h-16 text-muted-foreground/30 animate-pulse" />
                                <div>
                                    <h3 className="text-2xl font-serif font-bold text-foreground mb-2">The ink remains silent...</h3>
                                    <p className="text-muted-foreground font-serif italic">No verses have been etched under this mood yet.</p>
                                </div>
                                <button
                                    onClick={() => handleTagClick('All')}
                                    className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:scale-105 transition-all"
                                >
                                    Return to All Verses
                                </button>
                            </motion.div>
                        )}

                        {/* Poetic Explore More Button */}
                        {visibleCount < poems.length && (
                            <div className="flex justify-center mb-24">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleExplore}
                                    className="group relative px-12 py-6 bg-card border border-border text-foreground font-serif italic text-lg rounded-full shadow-2xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-3 tracking-wide">
                                        {EXPLORE_PHRASES[currentPhraseIndex]}
                                        <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                                    </span>
                                </motion.button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Minimalist Divider Separation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <hr className="minimal-divider" />
            </div>

            {/* Final Highlight: Curated Collections (Moved to End) */}
            <FeaturedSection />

            {/* End of content delimiter */}
            {visibleCount >= 50 && (
                <div className="py-24 text-center relative border-t border-border/10">
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

            {/* Floating Write Button */}
            <motion.div
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-10 right-10 z-50"
            >
                <Link
                    to="/write"
                    className="group relative flex items-center justify-center w-20 h-20 bg-primary text-primary-foreground rounded-full bloom-glow shadow-2xl"
                >
                    <Plus className="w-10 h-10 group-hover:rotate-90 transition-transform duration-500 relative z-10 drop-shadow-sm" />
                </Link>
            </motion.div>
        </div>
    );
};

export default Home;
