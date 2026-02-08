import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, TrendingUp, Heart } from 'lucide-react';
import PoemCard from './PoemCard';

const FeaturedSection = () => {
    const FEATURED_DATA = [
        {
            subtitle: "Today",
            title: "Poem of the Day",
            icon: Sparkles,
            color: "bg-dusty-rose",
            poem: {
                content: "The brush strokes land\nUpon the canvas of the sky\nColors blending, soft and grand,\nA masterpiece identifying why\nWe look up when the world gets cold,\nSeeking stories expertly told\nIn hues of violet, pink, and gold.",
                author: { display_name: "Elara Moon", username: "elara_moon" },
                tags: ["Featured"]
            }
        },
        {
            subtitle: "Editor",
            title: "Editor's Pick",
            icon: Award,
            color: "bg-sage-green",
            poem: {
                content: "In the quiet of the night\nEchoes of the past remain\nHaunting and sweet, a flickering light\nReviewing love through lens of pain.\nYet morning comes with softest ray,\nTo wash the shadows far away.",
                author: { display_name: "Jaxon Reed", username: "jaxon_reed" },
                tags: ["Choice"]
            }
        },
        {
            subtitle: "Focus",
            title: "Trending Now",
            icon: TrendingUp,
            color: "bg-pale-lavender",
            poem: {
                content: "Waves crash upon the shore\nA rhythm old as time\nSinging to the soul's deep core\nWith every salty, liquid rhyme.\nThe ocean keeps its secrets deep,\nIn trenches where the lost things sleep.",
                author: { display_name: "Marina Blue", username: "marina_blue" },
                tags: ["Trending"]
            }
        },
        {
            subtitle: "Beloved",
            title: "Most Liked",
            icon: Heart,
            color: "bg-muted-sand",
            poem: {
                content: "Stars like diamond dust\nScattered on a velvet cloak\nWatching over us with trust\nBefore the morning sun awoke.\nThey whisper tales of ancient kings,\nAnd other bright, celestial things.",
                author: { display_name: "Sophie Star", username: "sophie_star" },
                tags: ["Popular"]
            }
        }
    ];

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
            >
                <div>
                    <h2 className="text-4xl md:text-5xl font-serif font-black text-foreground mb-3 tracking-tight">Curated Collections</h2>
                    <p className="text-muted-foreground font-serif italic text-lg opacity-80">Handpicked verses for your soul.</p>
                </div>
                <div className="hidden md:block h-px bg-border flex-grow ml-8 mb-4 opacity-30"></div>
            </motion.div>

            {/* Grid uses the exact same layout as the main grid to ensure structural identity */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
                {FEATURED_DATA.map((item, index) => (
                    <PoemCard
                        key={index}
                        poem={{ ...item.poem, title: item.title }}
                        index={index}
                        colorClass={item.color}
                        badgeOverride={item.subtitle}
                    />
                ))}
            </div>
        </section>
    );
};

export default FeaturedSection;
