import { motion } from 'framer-motion';
import { Search, Music, Settings, Star, ChevronRight, Zap, Play, ListMusic, Infinity, Filter, Heart, Disc } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const Commands = () => {
  const [commands, setCommands] = useState([
    { category: "General", list: ["bio", "help", "invite", "ping", "profile", "report", "stats", "support", "uptime", "vote", "votecheck"] },
    { category: "Music", list: ["247", "autoplay", "clearqueue", "connect", "disconnect", "forceskip", "forward", "grab", "loop", "move", "nowplaying", "pause", "play", "queue", "remove", "removedupes", "replay", "resume", "rewind", "search", "shuffle", "skip", "skipto", "stop", "volume"] },
    { category: "Filters", list: ["8d", "bass", "clearfilters", "dance", "darthvader", "earrape", "electronic", "lofi", "nightcore", "party", "pop", "radio", "rock", "slowreverb", "treblebass", "vaporwave"] },
    { category: "Playlist", list: ["pl-add", "pl-addnowplaying", "pl-addqueue", "pl-create", "pl-delete", "pl-dupes", "pl-info", "pl-list", "pl-load", "pl-remove"] },
    { category: "Settings", list: ["afk", "avatar", "banner", "ignorechannel", "moveme", "ownerinfo", "prefix"] },
    { category: "Favourite", list: ["clearlikes", "like", "playliked", "showliked"] }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${apiUrl}/api/commands`);
        if (response.data && response.data.length > 0) {
          setCommands(response.data);
        }
      } catch (error) {
        console.error('Error fetching commands:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCommands();
  }, []);

  const categories = useMemo(() => ['All', ...new Set(commands.map(c => c.category))], [commands]);

  const filteredCommands = useMemo(() => {
    return commands.filter(cat => 
      activeCategory === 'All' || cat.category === activeCategory
    ).map(cat => ({
      ...cat,
      list: cat.list.filter(cmd => cmd.toLowerCase().includes(searchTerm.toLowerCase()))
    })).filter(cat => cat.list.length > 0);
  }, [commands, activeCategory, searchTerm]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-32">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-primary font-black text-[10px] uppercase tracking-widest mb-4"
        >
          CONTROL CENTER
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black mb-6 tracking-tighter glow-text"
        >
          Bot <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Commands</span>
        </motion.h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          Master VOXA with our comprehensive command suite. Fast, simple, and powerful.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-16 items-center">
        <div className="relative flex-grow w-full group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search commands..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-base font-medium shadow-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar w-full lg:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-xl font-bold text-xs whitespace-nowrap transition-all uppercase tracking-widest ${
                activeCategory === cat ? 'bg-primary text-white shadow-xl shadow-primary/30' : 'bg-white/5 text-gray-500 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
           <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
           <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px]">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-12">
          {filteredCommands.map((cat, idx) => (
            <motion.div 
              key={cat.category}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass rounded-[40px] p-8 md:p-10 border-white/5 relative overflow-hidden group shadow-2xl gradient-border"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[80px] rounded-full group-hover:bg-primary/10 transition-colors"></div>
              
              <div className="flex items-center gap-5 mb-10">
                <div className="bg-primary/10 p-4 rounded-2xl group-hover:bg-primary/20 transition-all duration-500 shadow-md shadow-primary/5">
                  {cat.category === 'Music' && <Music className="text-primary w-7 h-7" />}
                  {cat.category === 'General' && <Zap className="text-primary w-7 h-7" />}
                  {cat.category === 'Filters' && <Filter className="text-primary w-7 h-7" />}
                  {cat.category === 'Playlist' && <ListMusic className="text-primary w-7 h-7" />}
                  {cat.category === 'Settings' && <Settings className="text-primary w-7 h-7" />}
                  {cat.category === 'Favourite' && <Heart className="text-pink-500 w-7 h-7" />}
                  {cat.category === 'Premium' && <Star className="text-yellow-500 w-7 h-7" />}
                </div>
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter glow-text">{cat.category}</h2>
                  <p className="text-gray-500 font-bold uppercase tracking-[0.1em] text-[10px]">{cat.list.length} Commands Available</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cat.list.map((cmd) => (
                  <div 
                    key={cmd} 
                    className="group/cmd bg-white/5 border border-white/5 hover:border-primary/30 rounded-2xl p-6 transition-all hover:-translate-y-1.5 hover:bg-white/10 cursor-pointer shadow-md"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-black text-gray-200 group-hover/cmd:text-primary transition-colors tracking-tight">!{cmd}</span>
                      <ChevronRight className="w-5 h-5 text-gray-700 group-hover/cmd:text-primary group-hover/cmd:translate-x-1.5 transition-all" />
                    </div>
                    <div className="flex gap-1.5">
                      <span className="text-[9px] font-black uppercase tracking-widest bg-white/10 px-1.5 py-0.5 rounded text-gray-500">Fast</span>
                      <span className="text-[9px] font-black uppercase tracking-widest bg-white/10 px-1.5 py-0.5 rounded text-gray-500">HQ</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Commands;
