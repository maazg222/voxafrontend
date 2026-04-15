import { motion } from 'framer-motion';
import { Send, CheckCircle, Mail, User, MessageSquare, ExternalLink, Disc, Bug, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [formData, setFormData] = useState({ name: '', email: '', feedback: '', type: 'feedback' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [feedbacks, setFeedbacks] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [activeTab, setActiveTab] = useState('feedback'); // feedback, bugs
  const supportUrl = "https://discord.gg/b8mdRcFCgr";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const [feedbackRes, bugsRes] = await Promise.all([
        axios.get(`${apiUrl}/api/feedback`),
        axios.get(`${apiUrl}/api/bugs`)
      ]);
      setFeedbacks(feedbackRes.data);
      setBugs(bugsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const endpoint = formData.type === 'feedback' ? '/api/feedback' : '/api/bugs';
      const payload = formData.type === 'feedback' 
        ? { name: formData.name, email: formData.email, feedback: formData.feedback }
        : { name: formData.name, email: formData.email, bug_report: formData.feedback };
      
      await axios.post(`${apiUrl}${endpoint}`, payload);
      setStatus('success');
      setFormData({ ...formData, feedback: '' });
      
      // Update local state immediately for instant feedback
      if (formData.type === 'feedback') {
        const newFeedback = { name: formData.name, email: formData.email, feedback: formData.feedback, created_at: new Date().toISOString() };
        setFeedbacks(prev => [newFeedback, ...prev]);
        setActiveTab('feedback');
      } else {
        const newBug = { name: formData.name, email: formData.email, bug_report: formData.feedback, created_at: new Date().toISOString() };
        setBugs(prev => [newBug, ...prev]);
        setActiveTab('bugs');
      }

      fetchData(); // Sync with database in background
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-32">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-primary font-black text-[10px] uppercase tracking-widest mb-4"
        >
          COMMUNITY HUB
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black mb-6 tracking-tighter glow-text"
        >
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Bug Report</span> & Feedback
        </motion.h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          Help us engineer the future of music on Discord. We listen to every single piece of feedback and bug report.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass p-10 rounded-[40px] border-white/5 relative overflow-hidden group shadow-2xl gradient-border"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          <div className="flex gap-4 mb-8 relative z-10">
            <button 
              onClick={() => setFormData({...formData, type: 'feedback'})}
              className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${formData.type === 'feedback' ? 'bg-primary text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              Feedback
            </button>
            <button 
              onClick={() => setFormData({...formData, type: 'bug'})}
              className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${formData.type === 'bug' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              Bug Report
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Identity</label>
              <div className="relative group/input">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within/input:text-primary transition-colors" />
                <input 
                  type="text" 
                  required
                  placeholder="Full Name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:bg-white/10 outline-none transition-all text-base font-medium shadow-inner"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Contact</label>
              <div className="relative group/input">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within/input:text-primary transition-colors" />
                <input 
                  type="email" 
                  required
                  placeholder="Email Address"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:bg-white/10 outline-none transition-all text-base font-medium shadow-inner"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                {formData.type === 'feedback' ? 'Message' : 'Bug Description'}
              </label>
              <div className="relative group/input">
                {formData.type === 'feedback' ? (
                  <MessageSquare className="absolute left-5 top-6 w-5 h-5 text-gray-600 group-focus-within/input:text-primary transition-colors" />
                ) : (
                  <Bug className="absolute left-5 top-6 w-5 h-5 text-gray-600 group-focus-within/input:text-red-500 transition-colors" />
                )}
                <textarea 
                  required
                  rows="5"
                  placeholder={formData.type === 'feedback' ? "What's on your mind?" : "Describe the bug in detail..."}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 focus:bg-white/10 outline-none transition-all text-base font-medium resize-none shadow-inner"
                  value={formData.feedback}
                  onChange={(e) => setFormData({...formData, feedback: e.target.value})}
                ></textarea>
              </div>
            </div>

            <button 
              disabled={status === 'loading'}
              className={`w-full flex items-center justify-center gap-3 py-5 !text-base rounded-xl font-black transition-all ${
                formData.type === 'bug' 
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20' 
                  : 'btn-primary btn-glow'
              }`}
            >
              {status === 'loading' ? 'Dispatching...' : status === 'success' ? 'Sent!' : formData.type === 'feedback' ? 'Send Feedback' : 'Report Bug'}
              <Send className="w-5 h-5" />
            </button>

            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-green-400 text-center flex items-center justify-center gap-3 shadow-md shadow-green-500/5"
              >
                <CheckCircle className="w-6 h-6" />
                <span className="text-sm font-black uppercase tracking-tight text-glow">Transmission successful!</span>
              </motion.div>
            )}
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="glass p-8 rounded-[40px] border-l-[8px] border-primary glass-hover border-white/5 shadow-lg group gradient-border">
            <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-primary transition-colors">Feature Requests</h3>
            <p className="text-gray-400 text-base leading-relaxed font-medium">We build what you want. 80% of our V4 features came from user suggestions.</p>
          </div>
          
          <div className="glass p-8 rounded-[40px] border-l-[8px] border-indigo-500 glass-hover border-white/5 shadow-lg group gradient-border">
            <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-indigo-400 transition-colors">Bug Hunting</h3>
            <p className="text-gray-400 text-base leading-relaxed font-medium">Found a glitch? Help us keep VOXA perfect. Detailed reports earn roles!</p>
          </div>

          <div className="bg-gradient-to-br from-primary/20 to-indigo-600/20 p-10 rounded-[50px] border border-white/10 text-center space-y-6 shadow-2xl shadow-primary/10 group">
            <h3 className="text-2xl font-black tracking-tighter glow-text">Need Help?</h3>
            <p className="text-gray-300 text-base font-medium leading-relaxed">Our support team is available 24/7 on our official Discord server.</p>
            <a 
              href={supportUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-3 bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-xl font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              Join Support
              <Disc className="w-5 h-5 text-indigo-600 animate-spin-slow" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Community Feedbacks & Bugs Display */}
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-4xl font-black tracking-tighter glow-text">Recent Reports</h2>
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            <button 
              onClick={() => setActiveTab('feedback')}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'feedback' ? 'bg-primary text-black' : 'text-gray-400 hover:text-white'}`}
            >
              Feedbacks
            </button>
            <button 
              onClick={() => setActiveTab('bugs')}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'bugs' ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Bugs
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTab === 'feedback' ? feedbacks : bugs).length > 0 ? (
            (activeTab === 'feedback' ? feedbacks : bugs).map((item, idx) => (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-6 rounded-3xl border-white/5 flex flex-col gap-4 group hover:border-primary/20 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${activeTab === 'feedback' ? 'bg-primary/10 text-primary' : 'bg-red-500/10 text-red-500'}`}>
                      {activeTab === 'feedback' ? <MessageCircle className="w-4 h-4" /> : <Bug className="w-4 h-4" />}
                    </div>
                    <span className="font-black text-sm tracking-tight">{item.name}</span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-black uppercase">{new Date(item.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed font-medium line-clamp-4 italic">
                  "{activeTab === 'feedback' ? item.feedback : item.bug_report}"
                </p>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center glass rounded-[40px] border-white/5">
              <p className="text-gray-500 font-black uppercase tracking-widest text-xs">No reports found in this transmission.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
