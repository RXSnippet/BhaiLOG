/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { HelpCircle, Sparkles, AlertCircle, ArrowRight, ArrowLeft, Send, CheckCircle, Smartphone, Flame, ThumbsUp, MessageSquare } from 'lucide-react';
import { Idea } from '../types';

interface PitchFormScreenProps {
  onAddIdea: (idea: Omit<Idea, 'id' | 'upvotes' | 'hasUpvoted' | 'createdAt' | 'author'>) => void;
  onCancel: () => void;
}

export default function PitchFormScreen({ onAddIdea, onCancel }: PitchFormScreenProps) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('EcoTrack: Urban Reforestation');
  const [problem, setProblem] = useState(
    'Urban dwellers lack a simple, verified way to participate in local greenery projects and track the real ecological results of their micro-donations.'
  );
  const [solution, setSolution] = useState(
    'An interactive map matching regional planting approvals to local community leaders, tagging progress via QR identifiers.'
  );
  const [targetAudience, setTargetAudience] = useState('Eco-conscious city residents, home gardens, regional schools');
  const [category, setCategory] = useState<'Web' | 'App' | 'AI' | 'Social'>('App');
  const [rolesWanted, setRolesWanted] = useState<string>('React Native Wizard, GIS Geo Analyst');
  const [tagsInput, setTagsInput] = useState('Map, Sustainability, GeoData');

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    // Process input arrays
    const tagsArray = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const rolesArray = rolesWanted.split(',').map(r => r.trim()).filter(Boolean);

    onAddIdea({
      title: title || 'Untitled Epic Project',
      description: solution || 'A beautiful brand new custom build startup project.',
      problemStatement: problem,
      solution: solution,
      targetAudience: targetAudience,
      category: category,
      tags: tagsArray.length ? tagsArray : ['BetaLaunch', 'Spark'],
      needsRoles: rolesArray.length ? rolesArray : ['Lead Developer'],
      activeContributorsCount: 1,
      status: 'OPEN'
    });

    setStep(4); // Advance to confirmation success page
  };

  const getProgressPercentage = () => {
    return (step / 3) * 100;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in select-none">
      
      {/* Page Title & Back CTA */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 font-display">
          Ignite Your Idea
        </h1>
        <p className="text-[#64748b] text-xs font-sans mt-1">
          Turn your vision into a reality. Our step-by-step wizard helps you craft a pitch that attracts the perfect technical partners.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Form Container Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
            
            {/* Step info progress bar */}
            {step < 4 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  <span>Step {step} of 3</span>
                  <span className="text-electric-indigo">
                    {step === 1 ? 'Concept & Problem' : step === 2 ? 'Solution Details' : 'Tags & Seeking Talents'}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-electric-indigo h-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Stepper Wizard Content Blocks */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <span className="flex items-center gap-1.5 text-xs font-extrabold text-[#191c1e] uppercase tracking-wide">
                    Project Title 
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-help" title="Input a creative, non-branded literal name of what you are making." />
                  </span>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. EcoTrack: Urban Reforestation"
                    className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl focus:border-electric-indigo focus:ring-2 focus:ring-electric-indigo/10 outline-none text-sm transition-all font-sans"
                    id="step-title-input"
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="flex items-center gap-1.5 text-xs font-extrabold text-[#191c1e] uppercase tracking-wide">
                    Problem Statement
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-help" title="What deep developer issue, ecological bug, or marketplace shortage does your concept solve?" />
                  </span>
                  <textarea
                    rows={4}
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    placeholder="Urban dwellers lack a simple way to participate in local greenery projects..."
                    className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl focus:border-electric-indigo focus:ring-2 focus:ring-electric-indigo/10 outline-none text-sm transition-all font-sans resize-none"
                    id="step-problem-input"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <span className="flex items-center gap-1.5 text-xs font-extrabold text-[#191c1e] uppercase tracking-wide">
                    The Proposed Solution
                  </span>
                  <textarea
                    rows={3}
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="Describe how your custom app, web system or API solves the stated problem..."
                    className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl focus:border-electric-indigo focus:ring-2 focus:ring-electric-indigo/10 outline-none text-sm transition-all font-sans resize-none"
                    id="step-solution-input"
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="flex items-center gap-1.5 text-xs font-extrabold text-[#191c1e] uppercase tracking-wide">
                    Target User Base
                  </span>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g. Eco-conscious urban young professionals"
                    className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl focus:border-electric-indigo focus:ring-2 focus:ring-electric-indigo/10 outline-none text-sm transition-all font-sans"
                    id="step-target-input"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-gray-900 uppercase tracking-wide block">
                    Product Category Placement
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['Web', 'App', 'AI', 'Social'] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg text-center cursor-pointer transition-all border ${
                          category === cat
                            ? 'bg-electric-indigo-light text-electric-indigo border-electric-indigo'
                            : 'bg-[#f8fafc] text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                        id={`category-opt-${cat}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="flex items-center gap-1.5 text-xs font-extrabold text-[#191c1e] uppercase tracking-wide">
                    Skills / Roles Needed
                  </span>
                  <input
                    type="text"
                    value={rolesWanted}
                    onChange={(e) => setRolesWanted(e.target.value)}
                    placeholder="e.g. React Native Expert, UI/UX Designer, Solidity Dev"
                    className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl focus:border-electric-indigo focus:ring-2 focus:ring-electric-indigo/10 outline-none text-sm transition-all font-sans"
                    id="step-roles-input"
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="flex items-center gap-1.5 text-xs font-extrabold text-[#191c1e] uppercase tracking-wide">
                    Search Tags (comma separated)
                  </span>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="e.g. Mobile App, Sustainability, React Native"
                    className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl focus:border-electric-indigo focus:ring-2 focus:ring-electric-indigo/10 outline-none text-sm transition-all font-sans"
                    id="step-tags-input"
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 text-center py-6 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-gray-900 font-display">
                    Idea Successfully Ignited!
                  </h3>
                  <p className="text-[#64748b] text-sm font-sans max-w-md mx-auto">
                    Your dynamic pitch card has been successfully published to BhaiLOG's interactive global Discover innovations indexes. Co-founders can now upvote your roadmap and apply to join!
                  </p>
                </div>

                <div className="bg-[#f8fafc] p-4 rounded-xl border border-slate-100 max-w-sm mx-auto text-xs text-slate-500 font-mono flex flex-col space-y-1.5">
                  <span>Registered: <strong>{title}</strong></span>
                  <span>Category: <strong>{category}</strong></span>
                  <span>Upvoted State: <strong>★ Live (1 vote)</strong></span>
                </div>

                <div className="pt-4 flex justify-center gap-4">
                  <button
                    onClick={onCancel}
                    className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-xl text-xs transition-all cursor-pointer"
                  >
                    Go back to Idea Board
                  </button>
                  <button
                    onClick={() => {
                        setStep(1);
                        setTitle('EcoTrack: Urban Reforestation');
                        setProblem('Urban dwellers lack a simple way...');
                        setSolution('An interactive map...');
                        setTagsInput('Map, Sustainability, GeoData');
                        setRolesWanted('React Native Wizard, GIS Geo Analyst');
                    }}
                    className="py-3 px-6 bg-electric-indigo hover:bg-[#3525cd] text-white font-bold rounded-xl text-xs transition-all cursor-pointer"
                  >
                    Pitch Another Spark
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            {step < 4 && (
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <button
                  onClick={handleBack}
                  disabled={step === 1}
                  className={`py-3 px-5 border border-slate-200 hover:border-slate-300 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                    step === 1 ? 'opacity-30 cursor-not-allowed' : 'active:scale-95'
                  }`}
                  id="wizard-back-btn"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>

                {step < 3 ? (
                  <button
                    onClick={handleNext}
                    className="py-3 px-6 bg-electric-indigo hover:bg-[#3525cd] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer transform active:scale-95 shadow-md shadow-indigo-15"
                    id="wizard-next-btn"
                  >
                    Next Step
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer transform active:scale-95 shadow-md"
                    id="wizard-submit-btn"
                  >
                    Publish Pitch Card
                    <Send className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

          </div>

          {/* Stepper Pro-Tips indicator (Image 2 bottom box) */}
          {step < 4 && (
            <div className="bg-electric-indigo/5 border border-electric-indigo/10 rounded-2xl p-4 flex gap-3 text-[#54647a] text-xs font-sans leading-relaxed animate-fade-in animate-duration-500">
              <AlertCircle className="w-5 h-5 text-electric-indigo shrink-0" />
              <div>
                <strong className="text-gray-900 block font-bold">Pro Tip: Formulate a compelling Hook</strong>
                Ideas with a clear problem statement get <span className="text-electric-indigo font-bold bg-white px-1 py-0.5 rounded border border-slate-100 shadow-3xs">40% more interest</span> from active developers & co-founders. Focus on the "Why" before exploring the raw software code implementations.
              </div>
            </div>
          )}
        </div>

        {/* Dynamic LIVE PREVIEW Panel Widget (Image 2 right column!) */}
        <div className="lg:col-span-1 space-y-4">
          <div className="sticky top-20 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-500 tracking-wider uppercase font-display select-none">
                Live Preview
              </span>
              <span className="py-1 px-3 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase rounded-full tracking-wider border border-emerald-100/50">
                Dreamer Card
              </span>
            </div>

            {/* Mock Live Card (Updates dynamically based on stepper input values!) */}
            <div className="bg-white border text-left border-slate-200 rounded-2xl shadow-lg p-5 relative select-none animate-fade-in">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-electric-indigo/10 text-electric-indigo flex items-center justify-center font-bold shadow-xs">
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className="py-1 px-2.5 bg-slate-50 border border-slate-100 text-[#464555] text-[10px] font-bold rounded-lg uppercase tracking-wider">
                  New Pitch
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <h3 className="text-base font-extrabold text-gray-900 font-display line-clamp-1 leading-snug">
                  {title || 'Your Project Title'}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans line-clamp-4">
                  {problem || 'Define the problem statement to show the impact of your idea...'}
                </p>
              </div>

              {rolesWanted && (
                <div className="text-[10px] pb-3 border-b border-slate-100">
                  <span className="text-[#64748b] block font-bold text-[9px] uppercase tracking-wider mb-1">Looking for:</span>
                  <div className="flex flex-wrap gap-1">
                    {rolesWanted.split(',').slice(0, 2).map((role, idx) => (
                      <span key={idx} className="bg-slate-100 border border-slate-200/50 text-[#191c1e] font-semibold py-0.5 px-2 rounded-md truncate max-w-[120px]">
                        {role.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 mt-4 pt-3 text-[11px] font-bold text-slate-600">
                <div className="flex-1 py-2 px-3 bg-[#f8fafc] border border-slate-100 rounded-lg text-center flex items-center justify-center gap-1.5 focus:scale-95 transition-all">
                  <ThumbsUp className="w-3.5 h-3.5 text-slate-400" />
                  0
                </div>
                <div className="flex-1 py-2 px-3 bg-[#f8fafc] border border-slate-100 rounded-lg text-center flex items-center justify-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  Join Discuss
                </div>
              </div>
            </div>

            {/* Nice background illustration block included in Image 2 Live Preview */}
            <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-4 font-sans text-xs flex flex-col justify-between overflow-hidden relative group">
              <span className="flex items-center gap-2 text-[10px] font-semibold tracking-wide text-indigo-700 font-sans z-10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                4 Designers active in your niche right now
              </span>

              {/* Hotlinked Unsplash graphic at the bottom of dynamic preview (Image 2 card) */}
              <div className="mt-4 relative h-20 rounded-xl overflow-hidden shadow-xs border border-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=80" 
                  alt="Workspace teamwork design preview" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 duration-500 transition-transform"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
