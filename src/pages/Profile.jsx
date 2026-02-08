import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, Folder, Github, Instagram, Youtube, MessageCircle, Heart, FolderPlus, Trash2, Edit3, Camera, Link as LinkIcon, AtSign, Share2, Users, Check, X, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SpotlightCard from '../components/SpotlightCard';
import { supabase } from '../lib/supabase';

const Profile = () => {
    const { user, updateUserData } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('poems'); // poems, followers, following
    const [myPoems, setMyPoems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Edit Form State
    const [editForm, setEditForm] = useState({
        displayName: '',
        username: '',
        bio: '',
        instagram: '',
        youtube: '',
        discord: '',
        profilePic: '',
        bannerPic: ''
    });

    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/auth');
            return;
        }

        setEditForm({
            displayName: user.displayName || '',
            username: user.username || '',
            bio: user.bio || '',
            instagram: user.socialLinks?.instagram || '',
            youtube: user.socialLinks?.youtube || '',
            discord: user.socialLinks?.discord || '',
            profilePic: user.profilePic || '',
            bannerPic: user.bannerPic || ''
        });

        const fetchMyPoems = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('poems')
                    .select('*')
                    .eq('author_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setMyPoems(data || []);
            } catch (error) {
                console.error("Error fetching my poems:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMyPoems();
    }, [user, navigate]);

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditForm(prev => ({ ...prev, [type]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = async () => {
        setError('');
        try {
            const { data, error } = await supabase
                .from('profiles')
                .update({
                    display_name: editForm.displayName,
                    username: editForm.username,
                    bio: editForm.bio,
                    profile_pic: editForm.profilePic,
                    banner_pic: editForm.bannerPic,
                    social_links: {
                        instagram: editForm.instagram,
                        youtube: editForm.youtube,
                        discord: editForm.discord
                    }
                })
                .eq('id', user.id)
                .select()
                .single();

            if (error) throw error;

            updateUserData(data);
            setIsEditing(false);
        } catch (err) {
            setError(err.message || 'Failed to update profile');
        }
    };

    const handleDeletePoem = async (poemId) => {
        if (window.confirm("Are you sure you want to erase this memory? (Delete poem)")) {
            try {
                const { error } = await supabase
                    .from('poems')
                    .delete()
                    .eq('id', poemId);

                if (error) throw error;
                setMyPoems(prev => prev.filter(p => p.id !== poemId));
            } catch (err) {
                console.error("Failed to delete poem:", err.message);
            }
        }
    };

    if (!user) return null;

    return (
        <div className="pt-24 pb-20 min-h-screen bg-background transition-colors duration-300">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Header Card */}
                <div className="bg-card rounded-[3rem] shadow-xl shadow-primary/5 dark:shadow-none overflow-hidden mb-10 border border-border transition-all">
                    {/* Banner */}
                    <div className="h-48 sm:h-64 relative group">
                        {editForm.bannerPic || user.bannerPic ? (
                            <img src={editForm.bannerPic || user.bannerPic} className="w-full h-full object-cover" alt="Banner" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20" />
                        )}

                        {isEditing && (
                            <label className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <span className="bg-card px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 text-foreground">
                                    <Camera className="w-4 h-4" /> Change Banner
                                </span>
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'bannerPic')} />
                            </label>
                        )}
                    </div>

                    {/* Profile Body */}
                    <div className="px-8 pb-8 relative">
                        {/* Avatar */}
                        <div className="relative -mt-16 sm:-mt-20 flex flex-col sm:flex-row items-center sm:items-end sm:justify-between">
                            <div className="relative group">
                                <div className="p-2 bg-card rounded-[2.5rem] shadow-xl">
                                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-[2rem] overflow-hidden bg-muted">
                                        <img src={editForm.profilePic || user.profilePic} className="w-full h-full object-cover" alt="Avatar" />
                                    </div>
                                </div>
                                {isEditing && (
                                    <label className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Camera className="w-6 h-6 text-white" />
                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'profilePic')} />
                                    </label>
                                )}
                            </div>

                            <div className="flex gap-3 mt-6 sm:mb-2">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={handleSaveProfile}
                                            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                                        >
                                            <Check className="w-4 h-4" /> Save
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="px-8 py-3 bg-muted text-muted-foreground rounded-full font-bold hover:bg-muted/80 transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all flex items-center gap-2"
                                    >
                                        <Edit3 className="w-4 h-4" /> Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="mt-6 flex flex-col sm:flex-row justify-between">
                            <div className="flex-1">
                                {isEditing ? (
                                    <div className="space-y-4 max-w-2xl mt-4">
                                        {error && <p className="text-destructive text-sm font-bold flex items-center gap-2"><ShieldAlert className="w-4 h-4" /> {error}</p>}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Pen Name</label>
                                                <input
                                                    type="text"
                                                    value={editForm.displayName}
                                                    onChange={e => setEditForm({ ...editForm, displayName: e.target.value })}
                                                    className="w-full p-4 rounded-2xl bg-muted/30 border border-border text-foreground transition-all focus:ring-4 focus:ring-primary/10"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Username</label>
                                                <input
                                                    type="text"
                                                    value={editForm.username}
                                                    onChange={e => setEditForm({ ...editForm, username: e.target.value })}
                                                    className="w-full p-4 rounded-2xl bg-muted/30 border border-border text-foreground transition-all focus:ring-4 focus:ring-primary/10"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Bio</label>
                                            <textarea
                                                value={editForm.bio}
                                                onChange={e => setEditForm({ ...editForm, bio: e.target.value })}
                                                className="w-full p-4 rounded-2xl bg-muted/30 border border-border text-foreground transition-all focus:ring-4 focus:ring-primary/10 min-h-[100px]"
                                            />
                                        </div>

                                        {/* Social Links Editing */}
                                        <div className="pt-4 space-y-3">
                                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Social Echoes</label>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                <div className="relative">
                                                    <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-400" />
                                                    <input
                                                        type="text"
                                                        placeholder="Instagram URL"
                                                        value={editForm.instagram}
                                                        onChange={e => setEditForm({ ...editForm, instagram: e.target.value })}
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/30 border border-border text-sm"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive" />
                                                    <input
                                                        type="text"
                                                        placeholder="YouTube URL"
                                                        value={editForm.youtube}
                                                        onChange={e => setEditForm({ ...editForm, youtube: e.target.value })}
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/30 border border-border text-sm"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                                                    <input
                                                        type="text"
                                                        placeholder="Discord Link"
                                                        value={editForm.discord}
                                                        onChange={e => setEditForm({ ...editForm, discord: e.target.value })}
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/30 border border-border text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4 text-center sm:text-left">
                                        <div>
                                            <h1 className="text-4xl font-serif font-bold text-foreground">{user.displayName}</h1>
                                            <p className="text-primary font-bold flex items-center justify-center sm:justify-start gap-1 mt-1">
                                                <AtSign className="w-4 h-4" /> {user.username}
                                            </p>
                                        </div>
                                        <p className="text-muted-foreground font-serif italic text-lg max-w-2xl whitespace-pre-line leading-relaxed">
                                            "{user.bio}"
                                        </p>

                                        {/* Social Links Display */}
                                        <div className="flex items-center justify-center sm:justify-start space-x-5 pt-2 font-medium">
                                            {user.socialLinks?.instagram && (
                                                <a href={user.socialLinks.instagram} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-pink-500 transition-all hover:scale-110 flex items-center gap-1.5">
                                                    <Instagram className="w-5 h-5" />
                                                </a>
                                            )}
                                            {user.socialLinks?.youtube && (
                                                <a href={user.socialLinks.youtube} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-destructive transition-all hover:scale-110 flex items-center gap-1.5">
                                                    <Youtube className="w-5 h-5" />
                                                </a>
                                            )}
                                            {user.socialLinks?.discord && (
                                                <a href={user.socialLinks.discord} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-110 flex items-center gap-1.5">
                                                    <MessageCircle className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 sm:mt-0 flex flex-row sm:flex-col items-center justify-around gap-10 sm:gap-6 px-10 border-l border-border">
                                <button
                                    onClick={() => setActiveTab('followers')}
                                    className="text-center group"
                                >
                                    <span className="block text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform">{user.followers?.length || 1240}</span>
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Followers</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('following')}
                                    className="text-center group"
                                >
                                    <span className="block text-3xl font-bold text-foreground group-hover:scale-110 transition-transform">{user.following?.length || 342}</span>
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Following</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs / Navigation */}
                <div className="flex items-center justify-center space-x-8 mb-10 border-b border-border">
                    <button
                        onClick={() => setActiveTab('poems')}
                        className={`pb-4 px-2 font-bold text-sm uppercase tracking-widest transition-all relative ${activeTab === 'poems' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        Memories ({myPoems.length})
                        {activeTab === 'poems' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('followers')}
                        className={`pb-4 px-2 font-bold text-sm uppercase tracking-widest transition-all relative ${activeTab === 'followers' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        Followers
                        {activeTab === 'followers' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('following')}
                        className={`pb-4 px-2 font-bold text-sm uppercase tracking-widest transition-all relative ${activeTab === 'following' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        Following
                        {activeTab === 'following' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
                    </button>
                </div>

                {/* Content Section */}
                <AnimatePresence mode="wait">
                    {activeTab === 'poems' && (
                        <motion.div
                            key="poems"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-6"
                        >
                            {loading ? (
                                <div className="text-center py-20 opacity-30">The ink is flowing...</div>
                            ) : myPoems.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {myPoems.map((poem, i) => (
                                        <motion.div
                                            key={poem.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <SpotlightCard className={`h-full ${poem.color || 'bg-pastel-purple'} bg-card border-border relative group`}>
                                                <div className="p-8 pb-16 flex flex-col h-full">
                                                    <div className="flex justify-between items-start mb-6">
                                                        <h3 className="font-serif text-2xl font-bold text-foreground">{poem.title}</h3>
                                                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-tighter opacity-60">
                                                            {new Date(poem.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <p className="font-serif text-foreground/80 whitespace-pre-line flex-grow text-lg mb-8 leading-relaxed">
                                                        {poem.content}
                                                    </p>
                                                    <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-center bg-gradient-to-t from-background/20 to-transparent">
                                                        <div className="flex space-x-4">
                                                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                                                <Heart className="w-4 h-4 text-destructive" />
                                                                <span className="text-xs font-bold">{poem.likes}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                                                <MessageCircle className="w-4 h-4 text-primary" />
                                                                <span className="text-xs font-bold">{poem.comments?.length || 0}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleDeletePoem(poem.id)}
                                                                className="p-3 bg-destructive/10 text-destructive rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive hover:text-destructive-foreground"
                                                                title="Delete Memory"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                            <button className="p-3 bg-card/50 text-muted-foreground rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-card">
                                                                <Share2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SpotlightCard>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-40 border-2 border-dashed border-border rounded-[3rem]">
                                    <p className="text-muted-foreground font-serif italic text-xl">"A quiet heart has many stories yet to be told..."</p>
                                    <button
                                        onClick={() => navigate('/write')}
                                        className="mt-6 px-10 py-3 bg-primary text-primary-foreground rounded-full font-bold shadow-lg shadow-primary/20 transition-all"
                                    >
                                        Write your first Verse
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {(activeTab === 'followers' || activeTab === 'following') && (
                        <motion.div
                            key="social"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                        >
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div key={item} className="flex items-center justify-between p-4 bg-card rounded-[2rem] border border-border shadow-sm hover:shadow-md transition-all group">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 overflow-hidden">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item}`} alt="Avatar" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-foreground text-sm">Fellow Poet {item}</p>
                                            <p className="text-xs text-muted-foreground tracking-wider">@poet_{item}</p>
                                        </div>
                                    </div>
                                    <button className="p-3 bg-primary/10 text-primary rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-primary-foreground">
                                        <Users className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Profile;
