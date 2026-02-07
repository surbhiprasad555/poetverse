import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Home as HomeIcon, TrendingUp, PlusCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-card/80 backdrop-blur-md shadow-sm z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Brand */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <Logo className="transition-transform group-hover:scale-105 duration-300" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        <Link to="/" className="flex items-center text-muted-foreground hover:text-primary transition-colors" title="Home">
                            <HomeIcon className="w-4 h-4 mr-1" />
                            Home
                        </Link>
                        <Link to="/trending" className="flex items-center text-muted-foreground hover:text-primary transition-colors" title="Trending">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            Trending
                        </Link>
                        <Link to="/write" className="flex items-center text-primary font-medium hover:text-primary/80 transition-colors" title="Write a Poem">
                            <PlusCircle className="w-4 h-4 mr-1" />
                            Write
                        </Link>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-3 sm:space-x-5">

                        <button className="hidden sm:block text-muted-foreground hover:text-primary transition-colors" title="Search">
                            <Search className="w-5 h-5" />
                        </button>

                        {user ? (
                            <div className="flex items-center space-x-3">
                                <Link to="/profile" className="flex items-center space-x-2 p-1 pl-2 pr-4 rounded-full bg-primary/10 border border-primary/20 hover:shadow-md transition-all">
                                    <div className="w-8 h-8 rounded-full overflow-hidden shadow-sm bg-card">
                                        <img src={user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} alt={user.display_name} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="hidden sm:inline text-sm font-bold text-foreground">
                                        {user.display_name}
                                    </span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/auth"
                                className="px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                            >
                                Get Started
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
