/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { User, Idea, DeveloperProject } from './types';
import { INITIAL_IDEAS, INITIAL_MY_PROJECTS } from './data';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoginScreen from './components/LoginScreen';
import LandingScreen from './components/LandingScreen';
import IdeaBoardScreen from './components/IdeaBoardScreen';
import PitchFormScreen from './components/PitchFormScreen';
import FindProjectsScreen from './components/FindProjectsScreen';
import MessagesScreen from './components/MessagesScreen';
import AboutScreen from './components/AboutScreen';
import { Info, Sparkles, BookOpen, ExternalLink, X } from 'lucide-react';

export default function App() {
  // Session authentication state (Defaults to null to show Image 5 Login screen first)
  const [user, setUser] = useState<User | null>({
    name: 'Rupam Sen',
    email: 'snippetrupam@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    role: 'Dual'
  });

  // Current Screen / Tab Coordinator
  const [activeTab, setActiveTab] = useState<'welcome' | 'board' | 'finder' | 'pitch' | 'messages' | 'about'>('welcome');
  
  // Mobile Sidebar Drawer toggler
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Core Dynamic Dataset Stocks
  const [ideas, setIdeas] = useState<Idea[]>(INITIAL_IDEAS);
  const [myProjects, setMyProjects] = useState<DeveloperProject[]>(INITIAL_MY_PROJECTS);

  // Filter States (Unified Sidebar and Nav Controllers)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'trending' | 'newest' | 'upvoted'>('trending');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Settings Overlay Modal Toggle
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Callback: Handle user Login authorization
  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    setActiveTab('welcome'); // Launch onto Selection Slash Screen on login callback
  };

  // Callback: Logout session
  const handleLogout = () => {
    setUser(null);
  };

  // Callback: Upvote Idea incrementer state manager
  const handleUpvoteIdea = (id: string) => {
    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) => {
        if (idea.id === id) {
          const toggled = !idea.hasUpvoted;
          return {
            ...idea,
            upvotes: toggled ? idea.upvotes + 1 : idea.upvotes - 1,
            hasUpvoted: toggled
          };
        }
        return idea;
      })
    );
  };

  // Callback: Add newly published Idea pitch from Stepper to central stock
  const handleAddPitch = (newPitchData: Omit<Idea, 'id' | 'upvotes' | 'hasUpvoted' | 'createdAt' | 'author'>) => {
    const freshIdea: Idea = {
      ...newPitchData,
      id: `custom-idea-${Date.now()}`,
      upvotes: 1, // Start with self-upvote
      hasUpvoted: true,
      createdAt: 'Just now',
      author: {
        name: user?.name || 'Rupam Sen',
        avatarUrl: user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        role: user?.role === 'Dreamer' ? 'Product Visionary' : 'Lead Developer'
      }
    };

    setIdeas([freshIdea, ...ideas]);
    // Smooth transition back onto the main idea board dashboard to immediately see the result!
    setActiveTab('board');
  };

  // Callback: Append committed program challenge onto Sidebar tracker
  const handleCommitProject = (newProject: DeveloperProject) => {
    setMyProjects([newProject, ...myProjects]);
    alert(`Success! "${newProject.title}" has been added to your Active Projects workbook. Check "Find Projects" on the right sidebar.`);
  };

  // Switcher helper used in Landing Selection clicks
  const handleSelectLandingPath = (path: 'dreamer' | 'builder') => {
    if (path === 'dreamer') {
      setActiveTab('pitch'); // Direct into form wizard
    } else {
      setActiveTab('finder'); // Direct into Developer search lists
    }
  };

  // If session is logged out, render standard authentications screen (Image 5)
  if (!user) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f7f9fb] font-sans">
      
      {/* PERSISTENT TOP NAVIGATION BAR */}
      <Navbar
        user={user}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      {/* HORIZONTAL BLOCK SPLIT */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* PERSISTENT LEFT SIDEBAR FOR DESKTOP */}
        <div className="hidden md:block h-full">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onOpenSettings={() => setShowSettingsModal(true)}
          />
        </div>

        {/* MOBILE SIDE DECK OVERLAY DRAWER WITH BACKDROP */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Dark glass blur backdrop */}
            <div 
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
              onClick={() => setIsMobileSidebarOpen(false)}
            ></div>
            
            {/* Sliding Panel */}
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white h-full transform transition-transform shadow-2xl animate-fade-in">
              <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onOpenSettings={() => setShowSettingsModal(true)}
                onClose={() => setIsMobileSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        {/* CONTAINER WORKSPACE FOR SCREEN LOADER */}
        <main className="flex-grow overflow-hidden bg-[#f7f9fb]">
          {activeTab === 'welcome' && (
            <div className="h-full overflow-y-auto">
              <LandingScreen onSelectPath={handleSelectLandingPath} />
            </div>
          )}

          {activeTab === 'board' && (
            <IdeaBoardScreen
              ideas={ideas}
              onUpvote={handleUpvoteIdea}
              onJoinIdea={(idea) => {
                const mockProj: DeveloperProject = {
                  id: idea.id,
                  title: idea.title,
                  status: 'IN PROGRESS',
                  progress: 10,
                  milestone: 'Briefing Phase'
                };
                handleCommitProject(mockProj);
              }}
              selectedFilter={selectedFilter}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === 'finder' && (
            <div className="h-full overflow-y-auto">
              <FindProjectsScreen
                ideas={ideas}
                onCommitToBuild={handleCommitProject}
                myProjects={myProjects}
              />
            </div>
          )}

          {activeTab === 'pitch' && (
            <div className="h-full overflow-y-auto">
              <PitchFormScreen
                onAddIdea={handleAddPitch}
                onCancel={() => setActiveTab('board')}
              />
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="h-full overflow-y-auto">
              <MessagesScreen userName={user.name} />
            </div>
          )}

          {activeTab === 'about' && (
            <div className="h-full overflow-y-auto">
              <AboutScreen />
            </div>
          )}
        </main>
      </div>

      {/* METADATA SETTINGS MODAL DIALOG (Smooth sliding ambient detail) */}
      {showSettingsModal && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setShowSettingsModal(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-100 modal-ambient space-y-6 relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="flex items-center gap-1 bg-electric-indigo/10 text-electric-indigo text-[10px] font-bold py-1 px-3 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Technical Workspace
              </span>
              <button 
                onClick={() => setShowSettingsModal(false)} 
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 font-display">
                IdeaSpark Environment Specs
              </h2>
              
              <p className="text-xs text-[#64748b] leading-relaxed">
                Welcome! This client dashboard fully bridges the visual fidelity from screenshots 1, 2, 3, 4, and 5 into a unified, interactive workflow. Below are active system flags:
              </p>

              <div className="bg-[#f8fafc] border border-slate-200/60 p-4 rounded-xl text-xs space-y-2 text-[#191c1e] font-mono select-text">
                <div className="flex justify-between"><span className="text-slate-400">STATUS:</span> <strong className="text-emerald-600">● STABLE ONLINE</strong></div>
                <div className="flex justify-between"><span className="text-slate-400">DOCK PORT:</span> <strong>3000 (Ingress Active)</strong></div>
                <div className="flex justify-between"><span className="text-slate-400">FRAMEWORK:</span> <strong>React 19 & Vite 6</strong></div>
                <div className="flex justify-between"><span className="text-slate-400">TAILWIND:</span> <strong>CSS v4.0 Active</strong></div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => {
                  setShowSettingsModal(false);
                  setActiveTab('welcome');
                }}
                className="flex-1 py-3 bg-electric-indigo hover:bg-[#3525cd] text-white text-xs font-bold rounded-xl text-center active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                Launch Portal
              </button>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-xl text-center cursor-pointer"
              >
                Dismiss Info
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
