/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThumbsUp, MapPin, Eye, Star, Grid, List, Check, ArrowRight, UserPlus, FileText, Info } from 'lucide-react';
import { Idea } from '../types';

interface IdeaBoardScreenProps {
  ideas: Idea[];
  onUpvote: (id: string) => void;
  onJoinIdea: (idea: Idea) => void;
  selectedFilter: 'trending' | 'newest' | 'upvoted';
  selectedCategory: string | null;
  searchQuery: string;
}

export default function IdeaBoardScreen({
  ideas,
  onUpvote,
  onJoinIdea,
  selectedFilter,
  selectedCategory,
  searchQuery
}: IdeaBoardScreenProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedIdeaForModal, setSelectedIdeaForModal] = useState<Idea | null>(null);
  const [showRoadmapDrawer, setShowRoadmapDrawer] = useState<boolean>(false);
  const [joinedProjects, setJoinedProjects] = useState<string[]>([]);

  // Filter ideas based on sidebar states, search query, etc.
  const filteredIdeas = ideas
    .filter((idea) => {
      // Category match
      if (selectedCategory && idea.category !== selectedCategory) return false;
      
      // Search query match (title, tags, description)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = idea.title.toLowerCase().includes(query);
        const matchesDesc = idea.description.toLowerCase().includes(query);
        const matchesTags = idea.tags.some(t => t.toLowerCase().includes(query));
        return matchesTitle || matchesDesc || matchesTags;
      }
      return true;
    })
    .sort((a, b) => {
      if (selectedFilter === 'newest') {
        // Mock sorting based on upvotes / mock index
        return b.title.localeCompare(a.title);
      }
      if (selectedFilter === 'upvoted') {
        return b.upvotes - a.upvotes;
      }
      // Trending (Default)
      return b.upvotes - a.upvotes;
    });

  const handleJoinClick = (e: React.MouseEvent, idea: Idea) => {
    e.stopPropagation();
    if (joinedProjects.includes(idea.id)) {
      alert("You are already signed up as an active collaborator on this project!");
      return;
    }
    setJoinedProjects([...joinedProjects, idea.id]);
    onJoinIdea(idea);
  };

  const featuredBci = ideas.find(i => i.id === 'neural-link-bci') || ideas[0];

  return (
    <div className="flex-1 p-6 space-y-8 overflow-y-auto h-[calc(100vh-64px)] animate-fade-in max-w-5xl mx-auto">
      
      {/* Featured Idea Banner Card (Image 1 purple hero card) */}
      <div className="relative bg-gradient-to-br from-[#4d44e3] to-[#3525cd] text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden group select-none">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-500"></div>
        <div className="absolute -bottom-10 left-10 w-60 h-60 bg-electric-indigo/20 rounded-full blur-2xl"></div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-[10px] font-bold py-1 px-2.5 rounded-full uppercase tracking-wider">
              <Star className="w-3 h-3 fill-amber-300 stroke-amber-300" />
              Featured Idea
            </span>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display leading-[1.1]">
              NeuralLink: Decentralized Brain-Computer Interface API
            </h1>
            <p className="text-[#dad7ff] text-sm sm:text-base leading-relaxed font-sans">
              Developing a secure, privacy-first protocol for BCI data sharing among research labs. Looking for 2 Rust engineers and a Neurobiologist advisor.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={(e) => handleJoinClick(e, featuredBci)}
              className="px-5 py-3 bg-white hover:bg-slate-50 text-electric-indigo font-bold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-black/10 active:scale-[0.98]"
              id="feature-join-builder"
            >
              {joinedProjects.includes(featuredBci.id) ? (
                <>
                  <Check className="w-4 h-4 text-mint-green stroke-[3px]" />
                  Joined Team
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Join as Builder
                </>
              )}
            </button>
            
            <button
              onClick={() => {
                setShowRoadmapDrawer(true);
                setSelectedIdeaForModal(featuredBci);
              }}
              className="px-5 py-3 border border-white/35 hover:bg-white/10 text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer"
              id="feature-view-roadmap"
            >
              <FileText className="w-4 h-4" />
              View Full Roadmap
            </button>

            {/* UPVOTING CTA WIDGET (Image 1 layout upvotes button) */}
            <button
              onClick={() => onUpvote(featuredBci.id)}
              className={`px-5 py-3 rounded-xl flex items-center justify-center gap-2.5 text-xs font-bold transition-all cursor-pointer border ${
                featuredBci.hasUpvoted
                  ? 'bg-mint-green border-mint-green text-white scale-[1.03]'
                  : 'bg-white/10 border-white/20 hover:bg-white/15 text-white'
              }`}
              id="feature-upvote-button"
            >
              <ThumbsUp className={`w-4 h-4 ${featuredBci.hasUpvoted ? 'fill-white animate-bounce' : ''}`} />
              <span>{featuredBci.upvotes >= 1000 ? `${(featuredBci.upvotes / 1000).toFixed(1)}k` : featuredBci.upvotes}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Discover Grid Section (Image 1 Middle Section) */}
      <div className="space-y-6">
        <div className="flex justify-between items-end border-b border-[#eceef0] pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 font-display">
              Discover Innovations
            </h2>
            <p className="text-[#64748b] text-xs font-medium font-sans mt-0.5">
              Fresh ideas ready for execution {selectedCategory && `in ${selectedCategory}`}
            </p>
          </div>

          {/* Toggle buttons Grid vs List (Image 1 Right element) */}
          <div className="bg-[#eceef0]/65 p-1 rounded-xl flex items-center gap-1 text-slate-500 border border-slate-200/40">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg cursor-pointer transition-all ${
                viewMode === 'grid' ? 'bg-white text-electric-indigo shadow-sm' : 'hover:text-[#191c1e]'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg cursor-pointer transition-all ${
                viewMode === 'list' ? 'bg-white text-electric-indigo shadow-sm' : 'hover:text-[#191c1e]'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {filteredIdeas.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-slate-200 rounded-3xl bg-white max-w-md mx-auto p-8">
            <Info className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <span className="font-bold text-gray-900 text-sm block">No Ideas Match Filters</span>
            <p className="text-xs text-slate-500 font-sans mt-2 leading-relaxed">
              Try choosing different categories, removing active search inputs, or pitching a sparkling solution today!
            </p>
          </div>
        ) : (
          /* Cards Display Layout (Support grid matching Image 1 cards) */
          <div className={
            viewMode === 'grid'
              ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {filteredIdeas.filter(i => i.id !== 'neural-link-bci').map((idea) => {
              // Custom design elements depending on project status
              const isClaimed = idea.status === 'CLAIMED';
              const isInDev = idea.status === 'IN DEVELOPMENT';
              const isHighPriority = idea.status === 'HIGH PRIORITY';

              // Single vertical block alignment matching "NextGen Education Portal" in Image 1 bottom row if it is high priority
              const isEducationPortal = idea.id === 'nextgen-education-portal';

              if (isEducationPortal && viewMode === 'grid') {
                return (
                  <div
                    key={idea.id}
                    onClick={() => setSelectedIdeaForModal(idea)}
                    className="col-span-1 sm:col-span-2 lg:col-span-3 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm cursor-pointer transition-all hover:shadow-xl hover:border-slate-300 flex flex-col md:flex-row justify-between gap-6"
                  >
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold py-1 px-2.5 rounded-full uppercase tracking-wider border border-emerald-100">
                          {idea.status}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="text-xl font-bold tracking-tight text-gray-900 font-display">
                          {idea.title}
                        </h3>
                        <p className="text-[#64748b] text-sm leading-relaxed max-w-2xl font-sans">
                          {idea.description}
                        </p>
                      </div>

                      {/* Display Tag Pills (Collaboration Chips) */}
                      <div className="flex flex-wrap gap-1.5 pt-1.5">
                        {idea.tags.map(t => (
                          <span key={t} className="px-2.5 py-1 bg-electric-indigo-light text-electric-indigo rounded-full text-xs font-semibold">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-2">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={(e) => handleJoinClick(e, idea)}
                            className="py-2.5 px-4 bg-electric-indigo hover:bg-[#3525cd] text-white text-[11px] font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md shadow-electric-indigo/10 transition-all"
                          >
                            {joinedProjects.includes(idea.id) ? 'Applied' : 'Apply to Collaborate'}
                          </button>
                          
                          {/* Avatars stacked list as in mockup */}
                          {idea.collaborators && (
                            <div className="flex items-center -space-x-2">
                              {idea.collaborators.map((c, i) => (
                                <img
                                  key={i}
                                  src={c.avatarUrl}
                                  alt={c.name}
                                  referrerPolicy="no-referrer"
                                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                                  title={c.name}
                                />
                              ))}
                              <div className="w-6 h-6 rounded-full border-2 border-white bg-[#eceef0] flex items-center justify-center text-[8px] font-extrabold text-slate-500">
                                +8
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[#64748b]">
                          <img
                            src={idea.author.avatarUrl}
                            alt={idea.author.name}
                            referrerPolicy="no-referrer"
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span className="text-[10px] font-bold">{idea.author.name}</span>
                        </div>
                      </div>
                    </div>

                    {/* VERTICAL UPVOTES BOX DISPLAYED ON RIGHT (Image 1 element) */}
                    <div className="w-full md:w-24 bg-[#f8fafc] border border-slate-200/60 rounded-xl p-4 flex flex-col justify-center items-center gap-1 text-center shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpvote(idea.id);
                        }}
                        className={`p-2.5 rounded-full transition-all cursor-pointer ${
                          idea.hasUpvoted
                            ? 'bg-electric-indigo text-white scale-110 shadow-md shadow-electric-indigo/20'
                            : 'bg-white hover:bg-slate-100 text-slate-400'
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4 fill-current" />
                      </button>
                      <span className="text-lg font-extrabold text-gray-900 font-display tracking-tight mt-1">
                        {idea.upvotes}
                      </span>
                      <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">
                        Upvotes
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={idea.id}
                  onClick={() => setSelectedIdeaForModal(idea)}
                  className={`bg-white border border-[#eceef0] p-6 shadow-sm cursor-pointer hover:border-slate-300 transition-all ${
                    viewMode === 'grid'
                      ? 'rounded-2xl flex flex-col justify-between space-y-4'
                      : 'rounded-xl flex flex-col sm:flex-row sm:items-center justify-between sm:gap-6'
                  }`}
                >
                  <div className="space-y-3.5 flex-1">
                    <div className="flex justify-between items-center">
                      <span className={`text-[9px] font-bold py-1 px-2.5 rounded-full uppercase tracking-wider border ${
                        isClaimed
                          ? 'bg-slate-100 text-slate-600 border-slate-200'
                          : isInDev
                          ? 'bg-[#eef2ff] text-electric-indigo border-indigo-100'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                      }`}>
                        {idea.status}
                      </span>

                      {viewMode === 'grid' && (
                        /* UPVOTE MINIMAL TRIGGER IN TOP RIGHT (Image 1 elements card layout) */
                        <div className="flex items-center gap-1.5 shrink-0 select-none">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpvote(idea.id);
                            }}
                            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                              idea.hasUpvoted ? 'text-electric-indigo' : 'text-slate-400 hover:text-slate-600'
                            }`}
                          >
                            <ThumbsUp className={`w-3.5 h-3.5 ${idea.hasUpvoted ? 'fill-current' : ''}`} />
                          </button>
                          <span className="text-xs font-bold text-gray-900">{idea.upvotes}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-gray-900 tracking-tight font-display line-clamp-2 leading-snug">
                        {idea.title}
                      </h3>
                      <p className="text-[#64748b] text-[12px] font-sans leading-relaxed line-clamp-3">
                        {idea.description}
                      </p>
                    </div>

                    {/* Chips tags row */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {idea.tags.slice(0, 3).map(t => (
                        <span key={t} className="px-2.5 py-0.5 bg-electric-indigo-light text-electric-indigo rounded-full text-[10px] font-semibold tracking-wide">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions Footer (Grid vs List Layout match) */}
                  <div className={`mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between ${
                    viewMode === 'list' ? 'sm:mt-0 sm:pt-0 sm:border-0 shrink-0 gap-4' : ''
                  }`}>
                    <div className="flex items-center gap-2 text-[#64748b]">
                      <img
                        src={idea.author.avatarUrl}
                        alt={idea.author.name}
                        referrerPolicy="no-referrer"
                        className="w-5.5 h-5.5 rounded-full object-cover ring-1 ring-slate-100"
                      />
                      <span className="text-[10px] font-semibold tracking-tight text-slate-600 truncate max-w-[80px]">
                        {idea.author.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Direct Click triggers check */}
                      {idea.status !== 'CLAIMED' ? (
                        <button
                          onClick={(e) => handleJoinClick(e, idea)}
                          className="py-1.5 px-3 bg-[#3525cd] text-[10px] font-extrabold text-white rounded-lg transition-all cursor-pointer shadow-indigo-15 active:scale-95"
                        >
                          {joinedProjects.includes(idea.id) ? 'Joined' : 'Join as Builder'}
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIdeaForModal(idea);
                          }}
                          className="py-1.5 px-3 text-[#505f76] text-[10px] font-semibold border border-slate-200 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
                        >
                          View Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* DETAIL MODAL OVERLAY: FULL CONTEXT DEEP DIVE (WCAG Accessible shadows & soft close) */}
      {selectedIdeaForModal && !showRoadmapDrawer && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto animate-fade-in"
          onClick={() => setSelectedIdeaForModal(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 modal-ambient border border-slate-100 relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start gap-4 mb-4">
              <div>
                <span className="text-[9px] font-bold py-1 px-3 bg-electric-indigo/10 text-electric-indigo rounded-full uppercase tracking-wider block w-fit mb-2">
                  {selectedIdeaForModal.category} • {selectedIdeaForModal.status}
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 font-display">
                  {selectedIdeaForModal.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedIdeaForModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
                id="close-idea-details"
              >
                ✕
              </button>
            </div>

            {/* Author Section */}
            <div className="flex items-center gap-3 py-3.5 border-y border-slate-100 my-4">
              <img
                src={selectedIdeaForModal.author.avatarUrl}
                alt={selectedIdeaForModal.author.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-electric-indigo/20"
              />
              <div>
                <span className="text-xs font-bold text-gray-900 block">{selectedIdeaForModal.author.name}</span>
                <span className="text-[10px] text-slate-500 font-medium block">{selectedIdeaForModal.author.role}</span>
              </div>
              <div className="ml-auto text-right text-[10px] text-[#64748b]">
                Pitched {selectedIdeaForModal.createdAt}
              </div>
            </div>

            {/* Main Details Body */}
            <div className="space-y-5 my-4 font-sans text-sm text-gray-700 leading-relaxed max-h-[300px] overflow-y-auto pr-2">
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1.5">Problem Statement</h4>
                <p className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 italic">
                  "{selectedIdeaForModal.problemStatement || selectedIdeaForModal.description}"
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1.5">Description details</h4>
                <p>{selectedIdeaForModal.description}</p>
              </div>

              {selectedIdeaForModal.needsRoles && (
                <div>
                  <h4 className="text-xs font-bold text-[#ba1a1a] uppercase tracking-widest mb-1.5">Looking for Roles</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedIdeaForModal.needsRoles.map((role, idx) => (
                      <span key={idx} className="bg-red-50 text-red-700 border border-red-100 py-1 px-2.5 rounded-lg text-xs font-bold">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions Footer */}
            <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-6">
              <button
                onClick={() => onUpvote(selectedIdeaForModal.id)}
                className={`py-3.5 px-5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  selectedIdeaForModal.hasUpvoted
                    ? 'bg-electric-indigo text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <ThumbsUp className="w-4 h-4 fill-current" />
                Upvote ({selectedIdeaForModal.upvotes})
              </button>

              <button
                onClick={(e) => {
                  handleJoinClick(e, selectedIdeaForModal);
                  setSelectedIdeaForModal(null);
                }}
                className={`py-3.5 px-6 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                  joinedProjects.includes(selectedIdeaForModal.id)
                    ? 'bg-mint-green text-white'
                    : 'bg-electric-indigo hover:bg-[#3525cd] text-white'
                }`}
              >
                {joinedProjects.includes(selectedIdeaForModal.id) ? 'Application Under Review' : 'Commit as Co-Founder'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ROADMAP DRAWER SIDE SHEET (For NeuralLink full view) */}
      {showRoadmapDrawer && selectedIdeaForModal && (
        <div 
          className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-xs flex justify-end z-50 animate-fade-in"
          onClick={() => setShowRoadmapDrawer(false)}
        >
          <div 
            className="bg-white w-full max-w-md h-full shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto animate-fade-in animate-duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-electric-indigo bg-indigo-50 px-2.5 py-1 rounded-full">
                  Architecture Roadmap
                </span>
                <button
                  onClick={() => setShowRoadmapDrawer(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 font-display">
                  {selectedIdeaForModal.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">Under investigation by Dr. Raymond Carver</p>
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase block">
                  Implementation steps
                </span>

                <div className="relative border-l border-slate-200/80 pl-6 ml-3 space-y-6 text-slate-600 text-xs font-sans">
                  {selectedIdeaForModal.roadmap ? (
                    selectedIdeaForModal.roadmap.map((step, idx) => (
                      <div key={idx} className="relative pb-1">
                        <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-electric-indigo text-[9px] font-bold text-white flex items-center justify-center shadow-md">
                          {idx + 1}
                        </span>
                        <h4 className="font-bold text-[#191c1e] text-xs mb-1">Phase {idx + 1}</h4>
                        <p className="leading-relaxed text-slate-500 font-medium">{step}</p>
                      </div>
                    ))
                  ) : (
                    <p>No implementation roadmap draft found for this idea. Click join to help format one!</p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3.5">
              <button
                onClick={(e) => {
                  handleJoinClick(e, selectedIdeaForModal);
                  setShowRoadmapDrawer(false);
                }}
                className="w-full py-4 px-4 bg-electric-indigo hover:bg-[#3525cd] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-15"
              >
                Join BCI Engineering Channel
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowRoadmapDrawer(false)}
                className="w-full py-3.5 px-4 bg-slate-50 text-slate-600 font-semibold text-xs rounded-xl hover:bg-slate-100 transition-all cursor-pointer"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
