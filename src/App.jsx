
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import CursorGlow from './components/CursorGlow';
import Home from './pages/Home';
import Profile from './pages/Profile';
import WritePoem from './pages/WritePoem';
import Auth from './pages/Auth';

const AppContent = () => {
    const location = useLocation();

    // Check if we are on the auth page
    const isAuthPage = location.pathname === '/auth';

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-indigo-100 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100 transition-colors duration-300">
            <CursorGlow />
            {!isAuthPage && <Navbar />}
            <main className="">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tag/:tagName" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/:userId" element={<Profile />} />
                    <Route path="/write" element={<WritePoem />} />
                    <Route path="/auth" element={<Auth />} />

                    {/* Add more routes as needed */}
                </Routes>
            </main>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
