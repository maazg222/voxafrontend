import { motion, AnimatePresence } from 'framer-motion';
import { Server, Globe, Users, Activity, CheckCircle2, AlertCircle, Cpu, HardDrive, Network, Zap, Shield, BarChart3, Database, Cloud } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const Nodes = () => {
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${apiUrl}/api/nodes`);
        // Filter out specific node by host/url
        const filteredNodes = response.data.filter(node => 
          !node.url?.includes('sg2-nodelink.ny') && 
          !node.host?.includes('sg2-nodelink.ny')
        );
        setNodes(filteredNodes);
      } catch (error) {
        console.error('Error fetching nodes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNodes();
    const interval = setInterval(fetchNodes, 15000);
    return () => clearInterval(interval);
  }, []);

  const stats = useMemo(() => {
    if (nodes.length === 0) return null;
    const totalPlayers = nodes.reduce((acc, node) => acc + node.players, 0);
    const avgLoad = nodes.reduce((acc, node) => acc + parseInt(node.load), 0) / nodes.length;
    const onlineNodes = nodes.filter(n => n.status === 'Online').length;
    return {
      total: nodes.length,
      online: onlineNodes,
      players: totalPlayers,
      avgLoad: Math.round(avgLoad)
    };
  }, [nodes]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const nodeCards = useMemo(() => {
    return nodes.map((node, idx) => (
      <motion.div 
        key={node.id}
        variants={itemVariants}
        className="node-card group gradient-border relative overflow-hidden"
      >
        <div className={`node-glow ${node.status === 'Online' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-2xl group-hover:bg-primary/20 transition-all duration-500 border border-primary/10">
              <Zap className="text-primary w-6 h-6 group-hover:animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter glow-text leading-none">VOXA NODE {idx + 1}</h3>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">{node.engine || 'LAVALINK V4'}</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] shadow-lg backdrop-blur-md border ${
            node.status === 'Online' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
          }`}>
            <div className={`w-2 h-2 rounded-full ${node.status === 'Online' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></div>
            {node.status}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="glass-sm p-3 rounded-2xl border-white/5 group-hover:border-primary/20 transition-all duration-500">
            <div className="flex items-center gap-2 text-gray-500 font-bold uppercase tracking-widest text-[9px] mb-1">
              <Globe className="w-3 h-3 text-primary" />
              <span>Location</span>
            </div>
            <span className="text-white font-black text-xs block">{node.region}</span>
          </div>
          <div className="glass-sm p-3 rounded-2xl border-white/5 group-hover:border-primary/20 transition-all duration-500">
            <div className="flex items-center gap-2 text-gray-500 font-bold uppercase tracking-widest text-[9px] mb-1">
              <Users className="w-3 h-3 text-primary" />
              <span>Listeners</span>
            </div>
            <span className="text-white font-black text-xs block">{node.players}</span>
          </div>
        </div>

        {/* Load Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-gray-400 font-bold uppercase tracking-widest text-[10px]">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-primary" />
              <span>System Load</span>
            </div>
            <span className={`font-black text-sm ${
              parseInt(node.load) > 80 ? 'text-red-400' : parseInt(node.load) > 50 ? 'text-yellow-400' : 'text-white'
            }`}>{node.load}</span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden p-[1px]">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: node.load }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className={`h-full rounded-full relative ${
                parseInt(node.load) > 80 ? 'bg-gradient-to-r from-red-600 to-red-400' : 
                parseInt(node.load) > 50 ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' : 
                'bg-gradient-to-r from-primary to-blue-400'
              }`}
            >
              {/* Removed white load animation */}
            </motion.div>
          </div>
        </div>

        {/* Hardware Footer */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex gap-4 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
            <Cpu className="w-4 h-4 hover:text-primary transition-colors cursor-help" title="High-Performance CPU" />
            <HardDrive className="w-4 h-4 hover:text-primary transition-colors cursor-help" title="NVMe Storage" />
            <Network className="w-4 h-4 hover:text-primary transition-colors cursor-help" title="10Gbps Network" />
          </div>
          <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest group-hover:text-primary/50 transition-colors">
            {/* Hidden Host Info */}
          </div>
        </div>
      </motion.div>
    ));
  }, [nodes]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-32">
      {/* Hero Section */}
      <div className="text-center mb-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] -z-10 rounded-full"></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-primary font-black text-[10px] uppercase tracking-widest mb-6 shadow-lg shadow-primary/5"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Global Infrastructure v4.2
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none"
        >
          Node <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600 bg-clip-text text-transparent glow-text">Network.</span>
        </motion.h1>
        
        <p className="text-gray-400 text-xl max-w-3xl mx-auto font-medium leading-relaxed">
          Monitor VOXA's high-performance audio delivery network. 
          Our nodes are distributed across the globe to ensure the lowest latency and highest fidelity for your music.
        </p>
      </div>

      {/* Stats Summary */}
      <AnimatePresence>
        {!loading && stats && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {[
              { label: 'Total Nodes', value: stats.total, icon: <Server className="w-5 h-5" />, color: 'text-blue-400' },
              { label: 'Online Nodes', value: stats.online, icon: <CheckCircle2 className="w-5 h-5" />, color: 'text-green-400' },
              { label: 'Live Listeners', value: stats.players, icon: <Users className="w-5 h-5" />, color: 'text-indigo-400' },
              { label: 'Avg System Load', value: `${stats.avgLoad}%`, icon: <BarChart3 className="w-5 h-5" />, color: 'text-pink-400' },
            ].map((stat, i) => (
              <div key={i} className="glass p-6 rounded-3xl border-white/5 hover:border-primary/20 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  {stat.icon}
                </div>
                <div className={`mb-3 bg-white/5 w-fit p-3 rounded-xl ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                  {stat.icon}
                </div>
                <h4 className="text-3xl font-black tracking-tighter mb-1 glow-text">{stat.value}</h4>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nodes Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-6">
           <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-indigo-500/30 rounded-full animate-spin-slow"></div>
           </div>
           <div className="text-center">
             <p className="text-white font-black uppercase tracking-[0.3em] text-xs mb-2">Establishing Secure Connection</p>
             <p className="text-gray-500 font-bold text-[10px] uppercase tracking-widest">Handshaking with global nodes...</p>
           </div>
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {nodeCards}
        </motion.div>
      )}

      {/* Tech Specs Section */}
      <div className="mt-40">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">The <span className="text-primary">Difference.</span></h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">Why VOXA provides the most stable music experience on Discord.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Database className="w-6 h-6" />,
              title: "Lavalink v4.0",
              desc: "The latest in audio streaming technology, optimized for low overhead and maximum throughput."
            },
            {
              icon: <Cloud className="w-6 h-6" />,
              title: "Global Distribution",
              desc: "Strategic node placement in NA, EU, and ASIA to ensure minimal latency regardless of your server location."
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: "Auto-Failover",
              desc: "If a node experiences issues, our smart load balancer automatically reroutes traffic to ensure zero downtime."
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-10 rounded-[40px] border-white/5 hover:border-primary/20 transition-all duration-500 group"
            >
              <div className="bg-primary/10 w-fit p-5 rounded-2xl mb-8 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500 shadow-xl shadow-primary/5 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mt-40 glass p-12 md:p-20 rounded-[60px] flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left border-white/5 relative overflow-hidden group shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter glow-text leading-tight">Lag-Free <span className="text-primary">Audio Engine.</span></h2>
          <p className="text-gray-400 text-lg font-medium max-w-xl leading-relaxed">Experience studio-quality sound with zero buffering. Our nodes are optimized for high-bitrate streaming.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto relative z-10">
          <a 
            href="https://discord.com/oauth2/authorize?client_id=1492774650541899786&permissions=8&integration_type=0&scope=bot" 
            target="_blank" 
            rel="noreferrer" 
            className="btn-primary btn-glow !px-12 !py-5 text-center"
          >
            Add to Discord
          </a>
          <a 
            href="https://discord.gg/b8mdRcFCgr" 
            target="_blank" 
            rel="noreferrer" 
            className="glass px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all text-center border-white/10 shadow-xl"
          >
            Get Support
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Nodes;

