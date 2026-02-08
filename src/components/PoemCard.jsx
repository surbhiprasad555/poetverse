import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2 } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import AuthorBar from './AuthorBar';

/**
 * Global Component: PoemCard
 * 
 * This is the SINGLE CANONICAL component for all poems across the platform.
 * It ensures visual and structural consistency for classic, AI, and user poems.
 * 
 * Structure:
 * 1. Top Section: Hashtag Badge + Expand Button
 * 2. Content Section: Title + Truncated Preview
 * 3. Footer Section (Mandatory): Author Info + Interaction Actions
 */
const PoemCard = ({ poem, colorClass, index, badgeOverride }) => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const isAI = poem.is_ai || poem.author?.username === 'poet_ai';

    // Determine the tag to display
    const displayTag = badgeOverride || poem.tags?.[0] || (isAI ? 'AI' : 'Poetry');

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                delay: (index % 6) * 0.1,
                duration: 0.5,
                layout: { duration: 0.4, ease: "easeInOut" }
            }}
            // Force cards to span multiple columns when expanded for a premium layout
            className={`${isExpanded ? "col-span-1 md:col-span-2 lg:col-span-3 row-span-2" : "col-span-1"}`}
        >
            <SpotlightCard
                className={`${isExpanded ? "min-h-[28rem]" : "h-[26rem]"} ${colorClass} bg-card dark:bg-card border border-border/50 rounded-[2.5rem] cursor-pointer group flex flex-col relative p-8 spotlight-card transition-all duration-500`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {/* Opaque Background Layer to prevent bleed and ensure contrast */}
                <div className="absolute inset-0 bg-inherit z-0 opacity-100" />

                {/* 1. TOP SECTION: Badge & Expand */}
                <div className="relative z-20 flex justify-between items-start mb-6">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/tag/${displayTag.toLowerCase().replace('#', '')}`);
                        }}
                        className="bg-white/30 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-white shadow-sm border border-white/20 uppercase tracking-[0.2em] hover:bg-white/50 transition-all active:scale-95 cursor-pointer"
                    >
                        #{displayTag}
                    </button>

                    <button
                        className="p-2.5 rounded-full bg-black/10 hover:bg-black/20 text-white border border-white/10 transition-all active:scale-95"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(!isExpanded);
                        }}
                    >
                        {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                </div>

                {/* 2. CONTENT SECTION: Title & Preview */}
                <div className="flex-grow flex flex-col relative z-20 overflow-hidden">
                    <h3 className="font-serif text-3xl font-bold text-white drop-shadow-md leading-tight mb-4 group-hover:text-white/90 transition-colors">
                        {poem.title}
                    </h3>

                    <div className={`relative ${isExpanded ? 'overflow-y-auto max-h-[20rem] pr-2 custom-scrollbar' : 'overflow-hidden'}`}>
                        <p
                            className={`font-serif text-white/90 whitespace-pre-line text-lg leading-relaxed transition-all duration-500 ${!isExpanded ? 'line-clamp-4' : ''}`}
                        >
                            {poem.content}
                        </p>

                        {!isExpanded && poem.content?.length > 120 && (
                            <div className="mt-4 flex items-center text-[10px] font-bold text-white/60 uppercase tracking-widest gap-2 group-hover:text-white transition-colors duration-300">
                                <span className="w-8 h-px bg-white/20 transition-all duration-300 group-hover:w-12 group-hover:bg-white/40"></span>
                                Read full verse
                            </div>
                        )}
                    </div>
                </div>

                {/* 3. FOOTER SECTION: Author & Actions (Mandatory) */}
                <div className="mt-auto pt-6 border-t border-white/10 relative z-20">
                    <AuthorBar
                        author={poem.author}
                        tagline={isAI ? (poem.tagline || 'Digital Intelligence') : `Featured in Verse`}
                        likesCount={poem.likes_count || 0}
                        isAI={isAI}
                    />
                </div>
            </SpotlightCard>
        </motion.div>
    );
};

export default PoemCard;
