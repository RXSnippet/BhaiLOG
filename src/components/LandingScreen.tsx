/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Lightbulb, Code, Users, Award, Landmark, Play, ArrowRight, Terminal } from 'lucide-react';
import { APP_STATS } from '../data';

interface LandingScreenProps {
  onSelectPath: (path: 'dreamer' | 'builder') => void;
}

export default function LandingScreen({ onSelectPath }: LandingScreenProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
      {/* Visual Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 font-display leading-[1.1] md:leading-[1.15]">
          Where Ideas Meet <span className="text-electric-indigo">Implementation.</span>
        </h1>
        <p className="text-[#64748b] text-base md:text-lg mt-5 font-sans leading-relaxed">
          Bridging the gap between visionaries and builders. Whether you have the spark of an idea or the skills to forge it, your journey starts here.
        </p>
      </div>

      {/* Two Path Split Layout */}
      <div className="grid md:grid-cols-2 gap-8 mb-16 sm:mb-24">
        {/* Dreamer Card Path */}
        <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between transition-all group hover:shadow-xl hover:border-slate-300">
          <div>
            {/* Mock Image Representation for Visionary Path (Image 3 Left) */}
            <div className="relative h-44 bg-[#f1f5f9] overflow-hidden flex items-center justify-center p-6 border-b border-slate-100">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/50 to-pink-50/20"></div>
              {/* Visual mock with Post-its, note cards and drawing pad */}
              <div className="relative w-full max-w-[280px] bg-white rounded-xl shadow-md p-4 rotate-[-1deg] border border-slate-200/50 group-hover:scale-[1.03] transition-transform duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                  <div className="w-12 h-2 rounded-full bg-slate-100"></div>
                </div>
                <div className="space-y-1.5">
                  <div className="h-3 w-3/4 rounded bg-slate-100"></div>
                  <div className="h-2 w-1/2 rounded bg-slate-50"></div>
                </div>
                <div className="grid grid-cols-3 gap-1 mt-3">
                  <div className="h-6 rounded bg-indigo-50 flex items-center justify-center text-[8px] font-bold text-electric-indigo">Visionary</div>
                  <div className="h-6 rounded bg-pink-50 flex items-center justify-center text-[8px] font-bold text-pink-500">App</div>
                  <div className="h-6 rounded bg-slate-50"></div>
                </div>
              </div>
              
              {/* Path Accent Badge */}
              <span className="absolute top-4 left-4 flex items-center gap-1.5 py-1 px-3 bg-pink-50 text-pink-700 text-xs font-semibold rounded-full border border-pink-100/50 shadow-sm">
                <Lightbulb className="w-3.5 h-3.5" />
                Visionary Path
              </span>
            </div>

            {/* Path Content */}
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 font-display">I am a Dreamer</h2>
              <p className="text-[#64748b] text-sm md:text-sm mt-3 font-sans leading-relaxed">
                You see the world as it could be. Share your breakthrough concepts, get validated by the community, and find the technical talent needed to bring your vision to life.
              </p>

              {/* Value list items */}
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600 shrink-0 mt-0.5">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 tracking-wide uppercase">Pitch Ideas</h4>
                    <p className="text-xs text-[#64748b] font-sans mt-0.5">Describe your vision in interactive, high-fidelity step structures.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600 shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 tracking-wide uppercase">Community Voting</h4>
                    <p className="text-xs text-[#64748b] font-sans mt-0.5">Let developers and architects help you validate market viability and logic.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:px-8 md:pb-8">
            <button
              onClick={() => onSelectPath('dreamer')}
              className="w-full py-3.5 px-6 bg-pink-600 group-hover:bg-pink-700 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-pink-600/10 active:scale-[0.98]"
              id="landing-path-dreamer"
            >
              Pitch My Idea
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Builder Card Path */}
        <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between transition-all group hover:shadow-xl hover:border-slate-300">
          <div>
            {/* Mock Image Representation for Builder Path (Image 3 Right) */}
            <div className="relative h-44 bg-[#0f172a] overflow-hidden flex items-center justify-center p-6 border-b border-slate-800">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-transparent to-indigo-950/40"></div>
              {/* Visual IDE layout */}
              <div className="relative w-full max-w-[280px] bg-slate-900 rounded-xl shadow-md p-3 border border-slate-800 group-hover:scale-[1.03] transition-transform duration-300">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <div className="text-[9px] text-slate-500 font-mono ml-1.5 flex items-center gap-1">
                    <Terminal className="w-2.5 h-2.5" /> main.rs
                  </div>
                </div>
                <div className="font-mono text-[9px] text-[#38bdf8] space-y-1">
                  <p><span className="text-pink-500">fn</span> <span className="text-emerald-400">compile_idea</span>() &#123;</p>
                  <p className="pl-3 text-slate-400">// Seeking tech stack match...</p>
                  <p className="pl-3"><span className="text-amber-300">let</span> status <span className="text-pink-500">=</span> <span className="text-emerald-400">"BuildActive"</span>;</p>
                  <p>&#125;</p>
                </div>
              </div>

              {/* Path Accent Badge */}
              <span className="absolute top-4 left-4 flex items-center gap-1.5 py-1 px-3 bg-emerald-950 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-900 shadow-sm">
                <Code className="w-3.5 h-3.5" />
                Builder Path
              </span>
            </div>

            {/* Path Content */}
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 font-display">I am a Builder</h2>
              <p className="text-[#64748b] text-sm md:text-sm mt-3 font-sans leading-relaxed">
                You possess the tools to create reality. Browse curated, validated ideas that are looking for a technical co-founder or architect to lead the implementation.
              </p>

              {/* Value list items */}
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                    <Code className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 tracking-wide uppercase">Find Projects</h4>
                    <p className="text-xs text-[#64748b] font-sans mt-0.5">Filter by tech stack (Rust, React, Python), complexity, and potential impact.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                    <Play className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 tracking-wide uppercase">Building Reality</h4>
                    <p className="text-xs text-[#64748b] font-sans mt-0.5">Lead the development, commit repositories, and earn equity co-founderships.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:px-8 md:pb-8">
            <button
              onClick={() => onSelectPath('builder')}
              className="w-full py-3.5 px-6 bg-electric-indigo group-hover:bg-electric-indigo/90 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-electric-indigo/15 active:scale-[0.98]"
              id="landing-path-builder"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid Stats Footer (Image 3 bottom statistics) */}
      <div className="border-t border-slate-200/80 pt-10 sm:pt-12 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-electric-indigo font-display">
              {APP_STATS.ideasPitched}
            </div>
            <div className="text-xs font-bold text-[#64748b] uppercase tracking-wider mt-1.5">
              Ideas Pitched
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-electric-indigo font-display">
              {APP_STATS.buildersActive}
            </div>
            <div className="text-xs font-bold text-[#64748b] uppercase tracking-wider mt-1.5">
              Builders Active
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-electric-indigo font-display">
              {APP_STATS.projectsLaunched}
            </div>
            <div className="text-xs font-bold text-[#64748b] uppercase tracking-wider mt-1.5">
              Projects Launched
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-electric-indigo font-display">
              {APP_STATS.fundingRaised}
            </div>
            <div className="text-xs font-bold text-[#64748b] uppercase tracking-wider mt-1.5">
              Follow-on Funding
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
