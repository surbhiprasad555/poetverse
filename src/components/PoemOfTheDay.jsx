import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const PoemOfTheDay = () => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
            >
                <div className="text-center mb-8">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-2">
                        Featured Selection
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
                        Poem of the Day
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto rounded-full"></div>
                </div>

                <div className="bg-card rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl border border-border">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-50"></div>

                    <Quote className="absolute top-8 left-8 text-primary/10 w-12 h-12 -z-10 opacity-50" />

                    <div className="text-center max-w-2xl mx-auto relative z-10">
                        <h3 className="text-2xl font-serif font-bold text-foreground mb-6">
                            Canvas of Tomorrow
                        </h3>

                        <div className="font-serif text-lg md:text-xl text-foreground/80 leading-relaxed italic mb-8">
                            "The brush strokes land<br />
                            Upon the canvas of the sky<br />
                            Colors blending, soft and grand<br />
                            As clouds drift slowly by..."
                        </div>

                        <div className="flex flex-col items-center justify-center space-y-2">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 p-0.5">
                                <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-muted-foreground font-bold font-serif">
                                    EM
                                </div>
                            </div>
                            <div className="text-sm">
                                <p className="font-bold text-foreground">Elara Moon</p>
                                <p className="text-muted-foreground text-xs">September 24, 2024</p>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center space-x-4">
                            <button className="flex items-center space-x-2 px-6 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all shadow-sm">
                                <Star className="w-4 h-4" />
                                <span className="text-sm font-bold">Save for later</span>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default PoemOfTheDay;
