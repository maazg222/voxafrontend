import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ExternalLink, Disc } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.jpeg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const inviteUrl = "https://discord.com/oauth2/authorize?client_id=1492774650541899786&permissions=8&integration_type=0&scope=bot";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Commands', path: '/commands' },
    { name: 'Nodes', path: '/nodes' },
    { name: 'About', path: '/about' },
    { name: 'Bug Report', path: '/feedback' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`glass rounded-2xl px-6 transition-all duration-500 ${scrolled ? 'py-2.5 shadow-2xl bg-[#0b1120]/80' : 'py-3 bg-transparent border-transparent shadow-none'}`}>
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-primary rounded-full blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
                <img 
                  src={logo} 
                  alt="VOXA" 
                  className="relative h-11 w-11 rounded-full border border-white/10 group-hover:scale-105 transition-transform duration-500 shadow-2xl" 
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent glow-text">
                  VOXA
                </span>
                <span className="text-[8px] font-black text-gray-500 uppercase tracking-[0.4em] ml-0.5">V4 ULTRA</span>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all relative group ${location.pathname === link.path ? 'text-primary' : 'text-gray-400 hover:text-white'}`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              ))}
              <a 
                href={inviteUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-primary !px-6 !py-2.5 !text-xs flex items-center gap-2 group"
              >
                <span>Invite</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-2 text-gray-400 hover:text-primary transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 w-full px-6 pt-2"
          >
            <div className="glass rounded-2xl p-6 space-y-4 shadow-2xl bg-[#0b1120]/95">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)} 
                  className={`block px-4 py-3 text-sm font-black uppercase tracking-widest rounded-xl transition-all ${location.pathname === link.path ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                >
                  {link.name}
                </Link>
              ))}
              <a 
                href={inviteUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-primary w-full flex items-center justify-center gap-2 mt-4"
              >
                <span>Invite VOXA</span>
                <Disc className="w-5 h-5 animate-spin-slow" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
