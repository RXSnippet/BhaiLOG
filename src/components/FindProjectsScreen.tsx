/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ChevronUp, ChevronDown, Check, RefreshCw, Zap, Users2, Code2, Plus, AlertCircle } from 'lucide-react';
import { Idea, DeveloperProject } from '../types';
import { INITIAL_MY_PROJECTS, SKILL_SPOTLIGHT } from '../data';

interface FindProjectsScreenProps {
  ideas: Idea[];
  onCommitToBuild: (project: DeveloperProject) => void;
  myProjects: DeveloperProject[];
}

export default function FindProjectsScreen({
  ideas,
  onCommitToBuild,
  myProjects
}: FindProjectsScreenProps) {
  const [selectedStack, setSelectedStack] = useState<string>('All Tech');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('Any');
  const [localMyProjects, setLocalMyProjects] = useState<DeveloperProject[]>(myProjects);
  const [votedIdeas, setVotedIdeas] = useState<Record<string, { upvotes: number; state: 'up' | 'down' | null }>>({});

  // Filter ideas based on dropdown selects
  const developerReadyIdeas = ideas.filter(idea => {
    // Specifically show technical developer projects, filtering out non-tech if wanted, or filtering by selected tag
    if (selectedStack !== 'All Tech') {
      const matchStack = idea.tags.some(t => t.toLowerCase() === selectedStack.toLowerCase() || t.toLowerCase().includes(selectedStack.toLowerCase()));
      if (!matchStack) return false;
    }

    if (selectedComplexity !== 'Any') {
      const matchComplexity = idea.tags.some(t => t.toLowerCase().includes(selectedComplexity.toLowerCase()));
      if (!matchComplexity) return false;
    }

    return true;
  });

  const handleVote = (ideaId: string, direction: 'up' | 'down') => {
    const current = votedIdeas[ideaId] || { 
      upvotes: ideas.find(i => i.id === ideaId)?.upvotes || 0, 
      state: null 
    };

    let newUpvotes = current.upvotes;
    let newState: 'up' | 'down' | null = null;

    if (current.state === direction) {
      // Undo vote
      newUpvotes = direction === 'up' ? current.upvotes - 1 : current.upvotes + 1;
      newState = null;
    } else {
      // Apply vote
      if (current.state !== null) {
        // Reverse vote first
        newUpvotes = current.state === 'up' ? current.upvotes - 2 : current.upvotes + 2;
      } else {
        newUpvotes = direction === 'up' ? current.upvotes + 1 : current.upvotes - 1;
      }
      newState = direction;
    }

    setVotedIdeas({
      ...votedIdeas,
      [ideaId]: { upvotes: newUpvotes, state: newState }
    });
  };

  const handleCommitProject = (idea: Idea) => {
    // Check if already committed
    const exists = localMyProjects.some(p => p.id === idea.id);
    if (exists) {
      alert(`You have already committed to building "${idea.title}"!`);
      return;
    }

    const newProject: DeveloperProject = {
      id: idea.id,
      title: idea.title,
      status: 'PLANNING',
      progress: 5,
      milestone: 'Kickoff Soon'
    };

    const updated = [...localMyProjects, newProject];
    setLocalMyProjects(updated);
    onCommitToBuild(newProject);
  };

  const handleSpotlightSelect = (skill: string) => {
    setSelectedStack(skill);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in select-none">
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        
        {/* Main Ideas Stream Block (High Potential Ideas - Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#eceef0] pb-5">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 font-display">
                High Potential Ideas
              </h1>
              <p className="text-[#64748b] text-xs font-sans mt-0.5">
                Find your next challenge. We've curated projects with the highest community backing and clear technical roadmaps.
              </p>
            </div>

            {/* Filter selectors (Image 4 top right corner controls) */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">STACK</label>
                <select
                  value={selectedStack}
                  onChange={(e) => setSelectedStack(e.target.value)}
                  className="bg-white border border-slate-200 text-xs px-3 py-2 rounded-xl text-gray-700 outline-none focus:border-electric-indigo"
                  id="filter-stack-dropdown"
                >
                  <option value="All Tech">All Tech</option>
                  <option value="React">React</option>
                  <option value="Rust">Rust</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="Python">Python</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">COMPLEXITY</label>
                <select
                  value={selectedComplexity}
                  onChange={(e) => setSelectedComplexity(e.target.value)}
                  className="bg-white border border-slate-200 text-xs px-3 py-2 rounded-xl text-gray-700 outline-none focus:border-electric-indigo"
                  id="filter-complexity-dropdown"
                >
                  <option value="Any">Any</option>
                  <option value="Beginner">Beginner Friendly</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>
          </div>

          {/* Developer Ready List */}
          <div className="space-y-5">
            {developerReadyIdeas.map((idea) => {
              const voteState = votedIdeas[idea.id] || { upvotes: idea.upvotes, state: null };
              const isCommitted = localMyProjects.some(p => p.id === idea.id);

              return (
                <div
                  key={idea.id}
                  className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-start gap-4 transition-all hover:shadow-md hover:border-slate-300 animate-fade-in"
                >
                  {/* UPVOTE / DOWNVOTE SELECT WIDGET (Image 4 list display element) */}
                  <div className="flex flex-col items-center justify-center bg-[#f8fafc] border border-slate-200/60 rounded-xl p-2 min-w-[48px] shrink-0">
                    <button
                      onClick={() => handleVote(idea.id, 'up')}
                      className={`p-1 rounded-lg transition-all cursor-pointer ${
                        voteState.state === 'up'
                          ? 'bg-electric-indigo text-white shadow-xs scale-105'
                          : 'text-[#64748b] hover:bg-slate-100'
                      }`}
                      title="Vote Up"
                    >
                      <ChevronUp className="w-5 h-5" />
                    </button>
                    <span className="text-xs font-bold text-gray-900 my-1 font-display">
                      {voteState.upvotes}
                    </span>
                    <button
                      onClick={() => handleVote(idea.id, 'down')}
                      className={`p-1 rounded-lg transition-all cursor-pointer ${
                        voteState.state === 'down'
                          ? 'bg-pink-600 text-white shadow-xs scale-105'
                          : 'text-[#64748b] hover:bg-slate-100'
                      }`}
                      title="Vote Down"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Pitch description layout elements */}
                  <div className="flex-1 space-y-3.5">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="py-0.5 px-2 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-md">
                          High Potential
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          • Pitch {idea.createdAt}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 tracking-tight font-display leading-[1.2]">
                        {idea.title}
                      </h3>
                      <p className="text-[#64748b] text-[12px] font-sans leading-relaxed mt-2.5">
                        {idea.description}
                      </p>
                    </div>

                    {/* Meta tags skills needed */}
                    <div className="flex flex-wrap gap-1.5">
                      {idea.tags.map(t => (
                        <span key={t} className="px-2.5 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-[10px] font-semibold">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Contributors & Commit triggers (Image 4 horizontal bar) */}
                    <div className="flex items-center justify-between pt-3.5 border-t border-slate-100">
                      {idea.needsRoles && idea.needsRoles.length > 0 ? (
                        <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5 text-electric-indigo" />
                          Needs: {idea.needsRoles.slice(0, 2).join(', ')}
                        </span>
                      ) : idea.activeContributorsCount ? (
                        <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
                          <Users2 className="w-3.5 h-3.5 text-electric-indigo" />
                          {idea.activeContributorsCount} Active Contributors
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-slate-500">
                          Looking for first coder
                        </span>
                      )}

                      <button
                        onClick={() => handleCommitProject(idea)}
                        disabled={isCommitted}
                        className={`py-2 px-4 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                          isCommitted
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-not-allowed'
                            : 'bg-electric-indigo hover:bg-[#3525cd] text-white shadow-xs hover:-translate-y-0.5'
                        }`}
                      >
                        {isCommitted ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Committed
                          </>
                        ) : (
                          <>
                            Commit to Build
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Info Sidebar (My Projects & Skill Spotlight - Image 4 right columns) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Active Projects Tracker Panel (Image 4 first block on right) */}
          <div className="bg-white border border-[#eceef0] rounded-2xl shadow-sm p-5 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-gray-900 tracking-tight font-display">
                My Projects
              </h3>
              <span className="py-1 px-2.5 bg-electric-indigo-light text-electric-indigo text-[10px] font-bold rounded-full">
                {localMyProjects.length} Active
              </span>
            </div>

            {/* List of current projects progress bars */}
            <div className="space-y-4">
              {localMyProjects.map((p) => (
                <div key={p.id} className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="font-bold text-[#191c1e] truncate max-w-[150px]" title={p.title}>
                      {p.title}
                    </span>
                    <span className="text-[9px] font-bold uppercase py-0.5 px-2 bg-slate-100 text-slate-500 rounded border border-slate-200/50">
                      {p.status}
                    </span>
                  </div>
                  
                  {/* Dynamic Progress Indicator bar */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        p.status === 'PLANNING' ? 'bg-amber-500': 'bg-electric-indigo'
                      }`}
                      style={{ width: `${p.progress}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium">
                    <span>{p.progress}% Complete</span>
                    <span className="font-semibold">{p.milestone}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => alert("History list logged! Excellent simulation of your local commits.")}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-xl text-xs font-bold text-[#505f76] flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              + View History
            </button>
          </div>

          {/* Skill Spotlight Highlight panel (Image 4 bottom right purple box) */}
          <div className="bg-gradient-to-br from-[#4d44e3] to-[#3525cd] text-white rounded-2xl p-5 shadow-md flex flex-col justify-between relative overflow-hidden group">
            {/* Decors */}
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

            <div className="space-y-3.5 z-10 relative">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
                <h3 className="text-sm font-extrabold font-display">
                  Skill Spotlight
                </h3>
              </div>

              <p className="text-indigo-100 text-[11px] leading-relaxed font-sans">
                Builders with these skills are currently in highest demand by active dreamers on the platform.
              </p>

              {/* Skills chips */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {SKILL_SPOTLIGHT.slice(0, 5).map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleSpotlightSelect(skill)}
                    className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-indigo-50 hover:text-white rounded-full text-[10px] font-semibold tracking-wide transition-colors cursor-pointer"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
