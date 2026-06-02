/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flame, Clock, Award, Globe, Smartphone, Brain, Users, Lightbulb, Settings, MessageSquare, BookOpen, Plus, Info } from 'lucide-react';

interface SidebarProps {
  activeTab: 'welcome' | 'board' | 'finder' | 'pitch' | 'messages' | 'about';
  setActiveTab: (tab: 'welcome' | 'board' | 'finder' | 'pitch' | 'messages' | 'about') => void;
  selectedFilter: 'trending' | 'newest' | 'upvoted';
  setSelectedFilter: (val: 'trending' | 'newest' | 'upvoted') => void;
  selectedCategory: string | null;
  setSelectedCategory: (val: string | null) => void;
  onOpenSettings: () => void;
  onClose?: () => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  selectedFilter,
  setSelectedFilter,
  selectedCategory,
  setSelectedCategory,
  onOpenSettings,
  onClose
}: SidebarProps) {
  const handleTabClick = (tab: 'welcome' | 'board' | 'finder' | 'pitch' | 'messages' | 'about') => {
    setActiveTab(tab);
    if (onClose) onClose();
  };

  return (
    <aside className="w-full md:w-64 bg-[#f8fafc] border-r border-[#eceef0] flex flex-col justify-between shrink-0 h-full overflow-y-auto p-4 select-none">
      <div className="space-y-6">
        {/* Workspace Title Indicator */}
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-electric-indigo/10 flex items-center justify-center text-electric-indigo font-bold text-sm">
              WS
            </div>
            <div>
              <h3 className="text-[13px] font-bold text-gray-900 leading-tight">Project Workspace</h3>
              <span className="text-[11px] font-medium text-electric-indigo">Active Collaborator</span>
            </div>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="md:hidden w-8 h-8 rounded-full bg-slate-200/60 text-slate-600 flex items-center justify-center font-bold text-xs"
              title="Close Sidebar"
            >
              ✕
            </button>
          )}
        </div>

        {/* Global Navigation Items */}
        <nav className="space-y-1">
          <button
            onClick={() => handleTabClick('welcome')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl cursor-pointer transition-all ${
              activeTab === 'welcome'
                ? 'bg-electric-indigo-light text-electric-indigo font-bold'
                : 'text-[#64748b] hover:bg-[#eceef0]/60 hover:text-[#191c1e]'
            }`}
          >
            <Users className="w-4 h-4" />
            Workspace Portal
          </button>

          <button
            onClick={() => handleTabClick('board')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl cursor-pointer transition-all ${
              activeTab === 'board'
                ? 'bg-electric-indigo-light text-electric-indigo font-bold'
                : 'text-[#64748b] hover:bg-[#eceef0]/60 hover:text-[#191c1e]'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            Idea Board
          </button>

          <button
            onClick={() => handleTabClick('finder')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl cursor-pointer transition-all ${
              activeTab === 'finder'
                ? 'bg-electric-indigo-light text-electric-indigo font-bold'
                : 'text-[#64748b] hover:bg-[#eceef0]/60 hover:text-[#191c1e]'
            }`}
          >
            <Award className="w-4 h-4" />
            Find Projects
          </button>

          <button
            onClick={() => handleTabClick('messages')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl cursor-pointer transition-all ${
              activeTab === 'messages'
                ? 'bg-electric-indigo-light text-electric-indigo font-bold'
                : 'text-[#64748b] hover:bg-[#eceef0]/60 hover:text-[#191c1e]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Messages
          </button>

          <button
            onClick={() => handleTabClick('about')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl cursor-pointer transition-all ${
              activeTab === 'about'
                ? 'bg-electric-indigo-light text-electric-indigo font-bold'
                : 'text-[#64748b] hover:bg-[#eceef0]/60 hover:text-[#191c1e]'
            }`}
          >
            <Info className="w-4 h-4" />
            About BhaiLOG
          </button>
        </nav>

        {/* Conditional Sidebar Filters - Only shown for Idea Board as in Image 1 */}
        {activeTab === 'board' && (
          <div className="space-y-5 pt-3 border-t border-[#eceef0]">
            {/* Filters Section */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase block px-3">
                FILTERS
              </span>
              
              <button
                onClick={() => setSelectedFilter('trending')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl cursor-pointer transition-all ${
                  selectedFilter === 'trending'
                    ? 'bg-electric-indigo/10 text-electric-indigo font-bold'
                    : 'text-[#64748b] hover:bg-[#eceef0]/60 hover:text-[#191c1e]'
                }`}
              >
                <Flame className="w-4 h-4" />
                Trending
              </button>

              <button
                onClick={() => setSelectedFilter('newest')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl cursor-pointer transition-all ${
                  selectedFilter === 'newest'
                    ? 'bg-electric-indigo/10 text-electric-indigo font-bold'
                    : 'text-[#64748b] hover:bg-[#eceef0]/60 hover:text-[#191c1e]'
                }`}
              >
                <Clock className="w-4 h-4" />
                Newest
              </button>

              <button
                onClick={() => setSelectedFilter('upvoted')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl cursor-pointer transition-all ${
                  selectedFilter === 'upvoted'
                    ? 'bg-electric-indigo/10 text-electric-indigo font-bold'
                    : 'text-[#64748b] hover:bg-[#eceef0]/60 hover:text-[#191c1e]'
                }`}
              >
                <Award className="w-4 h-4" />
                Most Upvoted
              </button>
            </div>

            {/* Categories Section */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase block px-3">
                CATEGORIES
              </span>

              {[
                { name: 'Web', icon: Globe },
                { name: 'App', icon: Smartphone },
                { name: 'AI', icon: Brain },
                { name: 'Social', icon: Users }
              ].map((cat) => {
                const IconComp = cat.icon;
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(isSelected ? null : cat.name)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-electric-indigo/10 text-electric-indigo font-extrabold'
                        : 'text-[#64748b] hover:bg-[#eceef0]/60 hover:text-[#191c1e]'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Sidebar Footer Component */}
      <div className="space-y-3 pt-4 border-t border-[#eceef0] shrink-0">
        {/* Pitch New Idea CTA Button (Image 1 and 2 bottom left) */}
        <button
          onClick={() => {
            setActiveTab('pitch');
            if (onClose) onClose();
          }}
          className="w-full py-3 px-4 bg-electric-indigo hover:bg-[#3525cd] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-electric-indigo/25 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
          id="sidebar-pitch-idea-button"
        >
          <Plus className="w-4 h-4" />
          Pitch New Idea
        </button>

        {/* Settings options */}
        <div className="space-y-1">
          <button
            onClick={() => {
              onOpenSettings();
              if (onClose) onClose();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-[11px] font-semibold text-[#64748b] hover:bg-[#eceef0]/60 hover:text-[#191c1e] rounded-xl cursor-pointer transition-all"
            id="sidebar-settings-button"
          >
            <Settings className="w-3.5 h-3.5" />
            Settings & Workspace
          </button>
        </div>

        {/* Creator Signature block */}
        <div className="pt-2 px-1 border-t border-slate-200/50 text-center space-y-0.5">
          <p className="text-[9px] font-mono font-bold tracking-tight text-slate-500 uppercase leading-snug">
            MADE BY RUPAM SADHUKHAN
          </p>
          <p className="text-[8px] font-semibold text-electric-indigo bg-electric-indigo/5 py-0.5 rounded uppercase tracking-wider">
            in Development Phase
          </p>
        </div>
      </div>
    </aside>
  );
}
