import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback, memo } from 'react';
import axios from 'axios';
import { 
  User, 
  Code, 
  Disc, 
  Shield, 
  Instagram, 
  Music2, 
  Link2, 
  Copy, 
  Check, 
  ExternalLink, 
  Terminal, 
  Zap,
  Layers,
  Cpu
} from 'lucide-react';

// Static Data
const SOCIALS = [
  { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, url: 'https://www.instagram.com/not_.maaz/', color: 'hover:text-pink-500' },
  { name: 'TikTok', icon: <Music2 className="w-5 h-5" />, url: 'https://www.tiktok.com/@not_.maaz', color: 'hover:text-cyan-400' },
  { name: 'Feds.lol', icon: <Link2 className="w-5 h-5" />, url: 'https://feds.lol/notmaaz', color: 'hover:text-purple-400' },
];

const SKILLS = [
  { name: 'Python', percentage: 100, color: 'from-blue-500 to-yellow-500' },
  { name: 'Node.js', percentage: 95, color: 'from-green-500 to-emerald-700' },
  { name: 'JavaScript', percentage: 98, color: 'from-yellow-400 to-yellow-600' },
  { name: 'React', percentage: 92, color: 'from-cyan-400 to-blue-600' },
];

const PROJECTS = [
  { name: 'VOXA MUSIC', id: '1492774650541899786', desc: 'Advanced Audio System', status: 'Active' },
  { name: 'MONIX', id: 'ID Pending', desc: 'Universal Utility Bot', status: 'Active' },
  { name: 'HITMAN', id: 'ID Pending', desc: 'Next-gen Security Bot', status: 'Active' },
];

const USER_ID = "1386327941494997093";
const CODING_AVATAR = "https://i.pinimg.com/736x/7c/1e/09/7c1e09248cc8fbdfc14144f3a8739c7c.jpg";

// Optimized Sub-components
const SkillBar = memo(({ skill, index }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-[10px] md:text-xs font-black text-gray-300 uppercase tracking-widest">{skill.name}</span>
      <span className="text-[9px] md:text-[10px] font-black text-primary">{skill.percentage}%</span>
    </div>
    <div className="h-1 md:h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: "circOut" }}
        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
      />
    </div>
  </div>
));

const SocialLink = memo(({ social }) => (
  <a 
    href={social.url}
    target="_blank"
    rel="noreferrer"
    className={`flex items-center justify-between p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] group transition-all duration-300 ${social.color}`}
  >
    <div className="flex items-center gap-3 md:gap-4">
      <div className="w-8 md:w-10 h-8 md:h-10 rounded-lg md:rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-inherit transition-colors">
        {social.icon}
      </div>
      <p className="text-[10px] md:text-xs font-black uppercase tracking-widest">{social.name}</p>
    </div>
    <ExternalLink className="w-3 md:w-4 h-3 md:h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
  </a>
));

const ProjectCard = memo(({ project, index, onCopy }) => (
  <div className="flex items-center justify-between p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/[0.03] border border-white/5 group hover:border-primary/30 transition-all">
    <div className="flex items-center gap-3 md:gap-4">
      <div className="w-8 md:w-10 h-8 md:h-10 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-[10px] md:text-xs">
        0{index + 1}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white truncate">{project.name}</p>
        <p className="text-[9px] md:text-[10px] font-bold text-gray-600 mt-0.5 truncate">{project.desc}</p>
      </div>
    </div>
    <button 
      onClick={() => onCopy(project.id)}
      className={`p-1.5 md:p-2 rounded-lg hover:bg-white/10 transition-all ${project.id === 'ID Pending' ? 'text-gray-800 cursor-not-allowed' : 'text-gray-600 hover:text-white'}`}
      disabled={project.id === 'ID Pending'}
    >
      <Copy className="w-3 md:w-4 h-3 md:h-4" />
    </button>
  </div>
));

const About = () => {
  const [discordData, setDiscordData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(false);

  // Performance-optimized mouse movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }, [mouseX, mouseY]);

  useEffect(() => {
    let isMounted = true;
    const fetchDiscordStatus = async () => {
      try {
        const response = await axios.get(`https://api.lanyard.rest/v1/users/${USER_ID}`, {
          timeout: 5000
        });
        if (isMounted && response.data.success) {
          setDiscordData(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching Discord status:', error);
          setLoading(false);
        }
      }
    };

    fetchDiscordStatus();
    const interval = setInterval(fetchDiscordStatus, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const copyToClipboard = useCallback((text) => {
    if (text === 'ID Pending') return;
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  }, []);

  const user = discordData?.discord_user;
  const spotify = discordData?.listening_to_spotify ? discordData.spotify : null;
  const bio = "I'm Maaz, the developer of VOXA and HITMAN.";

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-6 max-w-7xl mx-auto selection:bg-primary/30 relative overflow-hidden">
      {/* Background Glows - Optimized with lower blur and opacity */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/5 blur-[80px] md:blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-600/5 blur-[80px] md:blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="text-center mb-12 md:mb-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] mb-4 md:mb-6 backdrop-blur-md"
        >
          <User className="w-3 h-3" />
          <span>The Mastermind Behind VOXA</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 tracking-tighter glow-text leading-none"
        >
          MEET THE <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">DEVELOPER</span>
        </motion.h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-medium px-4">
          The creative mind behind VOXA's advanced audio ecosystem and seamless Discord integration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 relative z-10 items-start">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-12 xl:col-span-4">
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onMouseMove={handleMouseMove}
            className="glass rounded-2xl md:rounded-[2rem] border-white/5 relative overflow-hidden group flex flex-col bg-[#0b1120]/40 shadow-2xl shadow-indigo-500/10"
          >
            {/* Dynamic Hover Glow */}
            <motion.div
              className="pointer-events-none absolute -inset-px rounded-2xl md:rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
              style={{
                background: `radial-gradient(400px circle at ${springX}px ${springY}px, rgba(59, 130, 246, 0.08), transparent 80%)`,
              }}
            />

            <div className="relative">
              <div className="h-24 sm:h-28 md:h-36 relative overflow-hidden">
                <img 
                  src="https://i.pinimg.com/originals/0c/d4/84/0cd48407f26c66a293a9d3c91974bfc2.gif" 
                  alt="Banner" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-black/30"></div>
              </div>
              
              <div className="absolute top-16 sm:top-20 md:top-24 left-1/2 -translate-x-1/2">
                <div className="relative">
                  <div className="absolute -inset-3 rounded-full blur-xl opacity-30 bg-blue-500/30"></div>
                  <img 
                    src={user ? `https://cdn.discordapp.com/avatars/${USER_ID}/${user.avatar}.png?size=256` : 'https://cdn.discordapp.com/embed/avatars/0.png'} 
                    alt="Maaz" 
                    className="w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 rounded-full border-4 border-[#0b1120] shadow-2xl relative z-10 transition-all duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
            
            <div className="px-4 sm:px-6 md:px-8 pb-6 md:pb-8 pt-0 relative flex-grow">
              <div className="text-center mt-16 sm:mt-20 md:mt-24 mb-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                    {loading ? 'Loading...' : (user?.global_name || user?.username || 'Maaz')}
                  </h4>
                </div>
                <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary text-[9px] md:text-[10px] font-black rounded-md border border-primary/20 uppercase tracking-wider">
                  DEVELOPER
                </span>
                <p className="text-gray-500 font-bold text-[10px] md:text-[11px] uppercase tracking-widest mt-2">
                  @{user?.username || 'notmaaz'}
                </p>
              </div>

              <div className="bg-black/20 rounded-xl md:rounded-2xl p-3 md:p-4 border border-white/5 mb-4 hover:border-white/10 transition-colors">
                <p className="text-[9px] md:text-[10px] font-black uppercase text-gray-500 tracking-widest mb-2 flex items-center justify-center gap-2">
                  <Cpu className="w-3 h-3" />
                  ABOUT
                </p>
                <p className="text-[11px] md:text-xs text-gray-300 leading-relaxed font-medium text-center">
                  {bio}
                </p>
              </div>

              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div 
                    key="skeleton"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    <div className="h-20 bg-white/5 rounded-xl animate-pulse"></div>
                    <div className="h-16 bg-white/5 rounded-xl animate-pulse"></div>
                  </motion.div>
                ) : discordData && (
                  <motion.div 
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                  >
                    {/* Status Card */}
                    <div className="glass p-3 md:p-4 rounded-xl md:rounded-2xl border-blue-500/10 bg-blue-500/[0.02] relative overflow-hidden group/card hover:bg-blue-500/[0.04] transition-colors">
                      <p className="text-[9px] md:text-[10px] font-black uppercase text-blue-400 tracking-widest mb-2 md:mb-3 flex items-center gap-2">
                        <Code className="w-3 h-3" />
                        Currently Coding
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="relative overflow-hidden rounded-xl">
                          <img 
                            src={CODING_AVATAR} 
                            className="w-12 md:w-14 h-12 md:h-14 rounded-xl shadow-lg" 
                            alt="Coding"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs md:text-sm font-black text-white truncate">Creating what matters.</p>
                          <p className="text-[10px] md:text-[11px] text-gray-500 font-medium truncate">Turning ideas into reality</p>
                        </div>
                      </div>
                    </div>

                    {spotify && (
                      <div className="glass p-3 md:p-4 rounded-xl md:rounded-2xl border-green-500/10 bg-green-500/[0.02] hover:bg-green-500/[0.04] transition-colors">
                        <p className="text-[9px] md:text-[10px] font-black uppercase text-green-500 tracking-widest mb-2 md:mb-3 flex items-center gap-2">
                          <Music2 className="w-3 h-3" />
                          Listening to Spotify
                        </p>
                        <div className="flex gap-3">
                          <img src={spotify.album_art_url} className="w-10 md:w-12 h-10 md:h-12 rounded-lg shadow-lg" alt="" loading="lazy" />
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] md:text-xs font-black text-white truncate">{spotify.track}</p>
                            <p className="text-[10px] md:text-[11px] text-gray-500 truncate">{spotify.artist}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <button 
                      onClick={() => copyToClipboard(USER_ID)}
                      className="w-full flex items-center justify-between px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-[9px] md:text-[10px] font-black text-gray-400 hover:text-white uppercase tracking-widest group/copy"
                    >
                      <span className="flex items-center gap-2">
                        <Terminal className="w-3 h-3" />
                        ID: {USER_ID}
                      </span>
                      {copiedId ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 group-hover/copy:scale-110 transition-transform" />}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-12 xl:col-span-8 space-y-6 md:space-y-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="glass p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-[2rem] border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
              <div className="flex-grow">
                <h3 className="text-lg md:text-xl font-black uppercase tracking-widest mb-4 md:mb-6 flex items-center gap-3 text-white">
                  <Layers className="w-5 h-5 text-blue-400" />
                  The Developer
                </h3>
                <p className="text-gray-400 font-medium text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-8">
                  Building the future one commit at a time. From high-performance Discord applications to full-stack web solutions and custom Minecraft server architectures — I turn complex ideas into powerful, scalable systems.
                </p>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {[
                    { label: 'Specialization', value: 'Discord, Web & MC' },
                    { label: 'Experience', value: '3+ Years' },
                    { label: 'Location', value: 'Pakistan/Islamabad' },
                    { label: 'Status', value: 'Active' },
                  ].map((info, i) => (
                    <div key={i} className="bg-white/5 rounded-xl md:rounded-2xl p-3 md:p-4 border border-white/5 hover:border-primary/20 transition-colors">
                      <p className="text-[9px] md:text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">{info.label}</p>
                      <p className="text-xs md:text-sm font-black text-white">{info.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:w-64 xl:w-72 shrink-0">
                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest mb-4 md:mb-6 flex items-center gap-3 text-gray-500">
                  <Terminal className="w-4 h-4" />
                  Tech Stack
                </h3>
                <div className="space-y-4 md:space-y-6">
                  {SKILLS.map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 w-full">
            {/* Socials Section */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="glass p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-[2rem] border-white/5 flex flex-col w-full"
            >
              <h3 className="text-base md:text-lg lg:text-xl font-black uppercase tracking-widest mb-5 md:mb-6 lg:mb-8 flex items-center gap-3 text-white">
                <Link2 className="w-4 md:w-5 h-4 md:h-5 text-yellow-400" />
                Network
              </h3>
              <div className="space-y-3 md:space-y-4 flex-grow">
                {SOCIALS.map((social) => (
                  <SocialLink key={social.name} social={social} />
                ))}
              </div>
            </motion.div>

            {/* Portfolio Section */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="glass p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-[2rem] border-white/5 flex flex-col w-full"
            >
              <h3 className="text-base md:text-lg lg:text-xl font-black uppercase tracking-widest mb-5 md:mb-6 lg:mb-8 flex items-center gap-3 text-white">
                <Shield className="w-4 md:w-5 h-4 md:h-5 text-primary" />
                Portfolio
              </h3>
              <div className="space-y-3 md:space-y-4 flex-grow">
                {PROJECTS.map((project, index) => (
                  <ProjectCard 
                    key={project.name} 
                    project={project} 
                    index={index} 
                    onCopy={copyToClipboard} 
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
