import { motion } from 'framer-motion';
import { Play, Zap, Star, Layout, Radio, ExternalLink, Disc, ArrowRight, Music, ListMusic, Infinity, Volume2 } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import logo from '../assets/logo.jpeg';

const Home = () => {
  const [stats, setStats] = useState({
    servers: "20+",
    users: "25k+",
    songsPlayed: "15k+",
    uptime: "99.9%"
  });

  const inviteUrl = "https://discord.com/oauth2/authorize?client_id=1492774650541899786&permissions=8&integration_type=0&scope=bot";
  const supportUrl = "https://discord.gg/b8mdRcFCgr";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${apiUrl}/api/stats`);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  const features = useMemo(() => [
    { icon: <Music className="w-6 h-6 text-blue-400" />, title: "Crystal Clear", desc: "Studio-grade 24-bit audio engine for the best sound." },
    { icon: <ListMusic className="w-6 h-6 text-indigo-400" />, title: "Smart Playlists", desc: "Save and import your favorite Spotify & YouTube tracks." },
    { icon: <Infinity className="w-6 h-6 text-yellow-400" />, title: "24/7 Mode", desc: "Keep the music playing non-stop in your voice channel." },
    { icon: <Volume2 className="w-6 h-6 text-orange-400" />, title: "Precise Volume", desc: "Full control over your audio balance with high-precision volume." },
    { icon: <Star className="w-6 h-6 text-pink-400" />, title: "Audio Filters", desc: "BassBoost, Nightcore, Vaporwave and 20+ more." },
    { icon: <Zap className="w-6 h-6 text-blue-400" />, title: "Zero Lag", desc: "Global high-speed nodes for lag-free streaming." },
  ], []);

  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-16 text-center lg:text-left">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-3/5 space-y-8"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-primary font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/5"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            V4 ULTRA NOW STABLE
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter">
            The Best Discord <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600 bg-clip-text text-transparent glow-text">
              Music Bot.
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
            The ultimate Discord music experience. High-fidelity audio, global nodes, and a sleek modern dashboard for your community.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
            <a 
              href={inviteUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="btn-primary flex items-center gap-2 group"
            >
              <span>Get VOXA Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href={supportUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="glass px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-2 border-white/5"
            >
              Support Server
              <Disc className="w-4 h-4 text-indigo-400 animate-spin-slow" />
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="lg:w-2/5 relative"
        >
          <div className="relative group animate-float">
            <div className="absolute -inset-10 bg-gradient-to-r from-primary via-indigo-400 to-blue-600 rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative p-2 rounded-full border border-white/5 bg-black/20 backdrop-blur-3xl">
              <img 
                src={logo} 
                alt="VOXA" 
                className="h-64 w-64 md:h-80 md:w-80 rounded-full border-4 border-white/5 shadow-2xl transition-transform duration-700 hover:scale-105" 
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-24"
      >
        {Object.entries(stats).map(([key, value], idx) => (
          <div key={idx} className="glass p-6 rounded-3xl text-center group border-white/5 hover:border-primary/20 transition-all duration-500">
            <h3 className="text-3xl font-black text-primary mb-1 group-hover:scale-110 transition-transform tracking-tighter glow-text">{value}</h3>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
          </div>
        ))}
      </motion.div>

      {/* Features Section */}
      <div className="mt-40">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Everything You <span className="text-primary">Need.</span></h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">Engineered for the community, built for performance. VOXA provides a full suite of premium music features.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="glass p-8 rounded-[32px] group relative overflow-hidden border-white/5 hover:border-primary/20 transition-all duration-500"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 blur-2xl rounded-full group-hover:bg-primary/10 transition-colors"></div>
              <div className="mb-6 bg-primary/10 w-fit p-4 rounded-2xl group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-primary/5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black mb-3 group-hover:text-primary transition-colors tracking-tight">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mt-40 glass p-16 md:p-24 rounded-[60px] text-center space-y-10 relative overflow-hidden border-white/5 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-indigo-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none glow-text">Start The <span className="text-primary">Party.</span></h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">Join 100,000+ users who have already upgraded their server experience with VOXA.</p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <a 
            href={inviteUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="btn-primary !px-12 !py-4 !text-lg shadow-2xl"
          >
            Invite VOXA Now
          </a>
          <a 
            href={supportUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="glass px-12 py-4 rounded-xl font-black text-lg hover:bg-white/5 transition-all border-white/5 shadow-xl"
          >
            Join Discord
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
