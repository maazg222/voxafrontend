import { Instagram, Twitter, Disc } from 'lucide-react';
import logo from '../assets/logo.jpeg';

const Footer = () => {
  const instaUrl = "https://www.instagram.com/not_.maaz/";
  const supportUrl = "https://discord.gg/b8mdRcFCgr";

  return (
    <footer className="relative mt-20 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto py-12 px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
          <div className="md:col-span-2 space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <img src={logo} alt="VOXA" className="h-10 w-10 rounded-full border border-white/5 shadow-2xl" />
              <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent glow-text uppercase">VOXA</span>
            </div>
            <p className="text-gray-500 max-w-sm text-sm font-medium leading-relaxed mx-auto md:mx-0">
              The most advanced audio delivery system for Discord. Experience high-fidelity music with global nodes.
            </p>
          </div>
          
          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em]">Navigation</h4>
            <ul className="space-y-2 text-gray-500 text-xs font-bold uppercase tracking-widest">
              <li><a href="/" className="hover:text-primary transition-all">Home</a></li>
              <li><a href="/commands" className="hover:text-primary transition-all">Commands</a></li>
              <li><a href="/nodes" className="hover:text-primary transition-all">Status</a></li>
              <li><a href="/about" className="hover:text-primary transition-all">About</a></li>
            </ul>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em]">Socials</h4>
            <div className="flex justify-center md:justify-start space-x-5">
              <a href={instaUrl} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-pink-500 transition-all transform hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={supportUrl} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-indigo-500 transition-all transform hover:scale-110">
                <Disc className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
          <p>© 2026 VOXA MUSIC. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
