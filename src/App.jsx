import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { Analytics } from "@vercel/analytics/react"
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loading from './components/Loading';
import Home from './pages/Home';
import Feedback from './pages/Feedback';
import Commands from './pages/Commands';
import Nodes from './pages/Nodes';
import About from './pages/About';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Track visit
    const trackVisit = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        // Using window.location.pathname to track which page they landed on
        await axios.post(`${apiUrl}/api/track-visit`, {
          path: window.location.pathname
        });
      } catch (error) {
        // Silently fail to not interrupt user experience
        console.error('Tracking failed');
      }
    };
    trackVisit();

    // 2-second delay as requested
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative selection:bg-primary/30 selection:text-white">
        {/* Particle Background */}
        <div className="particles-bg"></div>
        
        <Navbar />
        <main className="flex-grow relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/commands" element={<Commands />} />
            <Route path="/nodes" element={<Nodes />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
