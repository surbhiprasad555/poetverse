import React from 'react';
import { Sparkles, MessageCircle, Share2, Heart } from 'lucide-react';

/**
 * Global Component: AuthorBar
 * Standardized footer for all poem cards across the platform.
 * 
 * Requirements:
 * - Author avatar
 * - Author name
 * - Source/account (e.g., @robert_frost or Poet Verse)
 * - Interaction controls (Like, Comment, Share)
 */
const AuthorBar = ({ author, tagline, likesCount, isAI }) => {
    // Robust data handling
    const displayName = isAI ? 'Poet AI' : (author?.display_name || (typeof author === 'string' ? author : 'The Muse'));
    const username = author?.username || (typeof author === 'string' ? author : 'muse');

    // Generate avatar source
    const avatarSource = author?.profile_picture ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

    return (
        <div className="flex items-center justify-between w-full group/author-bar">
            {/* Author Profile Information */}
            <div className="flex items-center space-x-3 group/author-info cursor-pointer overflow-hidden">
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center overflow-hidden border border-white/10 shadow-inner transform group-hover/author-info:rotate-6 transition-all duration-300">
                    {isAI ? (
                        <Sparkles className="w-5 h-5 text-white" />
                    ) : (
                        <img
                            src={avatarSource}
                            alt={`${displayName}'s avatar`}
                            className="w-full h-full object-cover rounded-xl"
                            onError={(e) => {
                                e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${displayName}`;
                            }}
                        />
                    )}
                </div>
                <div className="text-left overflow-hidden">
                    <p className="text-sm font-bold text-white truncate leading-tight mb-0.5">
                        {displayName}
                    </p>
                    <p className="text-[10px] text-white/60 italic font-serif leading-tight truncate">
                        @{username}
                    </p>
                </div>
            </div>

            {/* Global Interaction Icons */}
            <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                <button className="p-2 text-white/50 hover:text-white transition-all hover:scale-110 active:scale-95" title="Comment">
                    <MessageCircle className="w-4 h-4" />
                </button>
                <button className="p-2 text-white/50 hover:text-white transition-all hover:scale-110 active:scale-95" title="Share">
                    <Share2 className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-1.5 p-2 px-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all transform hover:scale-105 active:scale-95 group/like shadow-sm border border-white/5">
                    <Heart className="w-4 h-4 group-hover/like:fill-white transition-all" />
                    <span className="text-[10px] font-bold">{likesCount || 0}</span>
                </button>
            </div>
        </div>
    );
};

export default AuthorBar;
