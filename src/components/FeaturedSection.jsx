import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, Zap, Heart, Sparkles, MessageCircle, Share2, Award, TrendingUp, ChevronDown, Minimize2 } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const FeaturedCard = ({ title, subtitle, poem, icon: Icon, colorClass, delay, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay, duration: 0.5, layout: { duration: 0.3 } }}
            className={`h-full ${isExpanded ? "col-span-1 md:col-span-2 lg:col-span-2 row-span-2" : "col-span-1"}`}
        >
            <SpotlightCard
                className={`h-full rounded-[2rem] p-6 ${colorClass} bg-card relative overflow-hidden group hover:shadow-[0_0_40px_rgba(oklch(from_var(--primary)_l_c_h_/_0.2))] transition-all duration-500 border border-border/50 cursor-pointer`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="relative z-10 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-muted rounded-xl backdrop-blur-md shadow-sm group-hover:scale-110 transition-transform duration-300 ring-1 ring-border/20">
                                <Icon className="w-4 h-4 text-foreground/80" />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black tracking-widest text-primary/80 uppercase mb-0.5">{subtitle}</h4>
                                <h3 className="font-serif text-lg font-bold text-foreground leading-none">{title}</h3>
                            </div>
                        </div>
                        <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow relative">
                        <motion.div layout className="relative">
                            <Quote className="absolute -top-1 -left-1 w-6 h-6 text-foreground/5 rotate-180" />
                            <p className={`font-serif text-foreground/90 text-base leading-loose italic transition-all duration-300 ${!isExpanded ? "line-clamp-3" : ""}`}>
                                "{poem.content}"
                            </p>
                        </motion.div>
                        {!isExpanded && (
                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shadow-inner">
                                {poem.author.charAt(0)}
                            </div>
                            <div className="text-xs">
                                <p className="font-bold text-foreground/90">{poem.author}</p>
                            </div>
                        </div>
                        <div className="flex space-x-1">
                            <button className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-destructive">
                                <Heart className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-primary">
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </SpotlightCard>
        </motion.div>
    );
};

const FeaturedSection = () => {
    // Mock Data for the 4 sections
    const FEATURED_DATA = [
        {
            subtitle: "Featured Today",
            title: "Poem of the Day",
            icon: Sparkles,
            color: "bg-pastel-purple",
            poem: { content: "The brush strokes land\nUpon the canvas of the sky\nColors blending, soft and grand,\nA masterpiece identifying why\nWe look up when the world gets cold,\nSeeking stories expertly told\nIn hues of violet, pink, and gold.", author: "Elara Moon" }
        },
        {
            subtitle: "Selected by Us",
            title: "Editor's Pick",
            icon: Award,
            color: "bg-pastel-pink",
            poem: { content: "In the quiet of the night\nEchoes of the past remain\nHaunting and sweet, a flickering light\nReviewing love through lens of pain.\nYet morning comes with softest ray,\nTo wash the shadows far away.", author: "Jaxon Reed" }
        },
        {
            subtitle: "In Focus",
            title: "Trending Now",
            icon: TrendingUp,
            color: "bg-pastel-primary",
            poem: { content: "Waves crash upon the shore\nA rhythm old as time\nSinging to the soul's deep core\nWith every salty, liquid rhyme.\nThe ocean keeps its secrets deep,\nIn trenches where the lost things sleep.", author: "Marina Blue" }
        },
        {
            subtitle: "Beloved",
            title: "Most Liked",
            icon: Heart,
            color: "bg-pastel-secondary",
            poem: { content: "Stars like diamond dust\nScattered on a velvet cloak\nWatching over us with trust\nBefore the morning sun awoke.\nThey whisper tales of ancient kings,\nAnd other bright, celestial things.", author: "Sophie Star" }
        }
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-10 flex items-end justify-between"
            >
                <div>
                    <h2 className="text-3xl md:text-4xl font-serif font-black text-foreground mb-2">Curated Collections</h2>
                    <p className="text-muted-foreground font-serif italic">Handpicked verses for your soul.</p>
                </div>
                <div className="hidden md:block h-px bg-border flex-grow ml-8 mb-2"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(300px,auto)] grid-flow-dense">
                {FEATURED_DATA.map((item, index) => (
                    <FeaturedCard
                        key={index}
                        {...item}
                        index={index}
                        colorClass={item.colorClass || item.color}
                        delay={index * 0.1}
                    />
                ))}
            </div>
        </section>
    );
};

export default FeaturedSection;
