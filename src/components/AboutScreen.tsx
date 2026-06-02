/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Heart, Code, Layers, Smartphone, Lightbulb, Users } from 'lucide-react';

export default function AboutScreen() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in select-none">
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-electric-indigo/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gradient-to-tr from-pink-500/5 to-transparent rounded-full blur-2xl pointer-events-none"></div>

        {/* Development Phase Badge / Big Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="py-0.5 px-2 bg-pink-100 text-pink-700 text-[10px] font-bold rounded-md uppercase tracking-wider">
                Development Phase
              </span>
              <span className="py-0.5 px-2 bg-electric-indigo/10 text-electric-indigo text-[10px] font-bold rounded-md uppercase tracking-wider">
                v1.1 Alpha
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 font-display">
              About BhaiLOG
            </h1>
            <p className="text-[#64748b] text-sm font-sans mt-1">
              An interactive ecosystem bridging the gap between product visionaries and technical builders.
            </p>
          </div>

          {/* Prompt Creator Notice Widget */}
          <div className="bg-[#f8fafc] border border-slate-200/60 rounded-2xl p-4 w-full sm:w-auto flex flex-col justify-center min-w-[220px]">
            <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">CREATOR & DEVELOPER</span>
            <span className="text-xs font-mono font-bold text-gray-900 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-electric-indigo" />
              Rupam Sadhukhan
            </span>
            <span className="text-[10px] text-[#64748b] font-medium mt-1">
              Active developer portal contributor
            </span>
          </div>
        </div>

        {/* STRIKING AND PROMINENT BANNER (MADE BY RUPAM SADHUKHAN in Development Phase) */}
        <div className="bg-gradient-to-r from-electric-indigo to-indigo-900 text-white p-6 rounded-2xl shadow-md relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="z-10">
            <h3 className="text-xs font-bold text-indigo-200 uppercase tracking-widest font-mono">
              CREDIT SIGNATURE
            </h3>
            <p className="text-lg sm:text-xl font-extrabold tracking-tight font-display mt-1">
              MADE BY RUPAM SADHUKHAN
            </p>
            <p className="text-xs text-indigo-100 opacity-85 mt-1 font-sans">
              Designed & Engineered under active Development Phase iteration metrics.
            </p>
          </div>
          <div className="z-10 shrink-0">
            <span className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-xs font-bold font-mono tracking-wider text-white inline-block">
              DEVELOPMENT PHASE ACTIVE
            </span>
          </div>
          {/* Subtle background graphic */}
          <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none">
            <Sparkles className="w-36 h-36 translate-x-10 translate-y-10" />
          </div>
        </div>

        {/* Content sections */}
        <div className="grid md:grid-cols-2 gap-8 pt-4">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 font-display flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-electric-indigo" />
              The Platform Goal
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              <strong>BhaiLOG</strong> is a digital collaborative environment designed precisely for high-efficiency pitch evaluation and product realization workflows. If you are a <strong>Dreamer</strong> carrying novel product concepts, or a <strong>Builder</strong> equipped with high-performance computational skillsets, BhaiLOG streamlines your union.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Publish detailed, step-by-step structural pitches complete with targets, role requirements, and technical tags. High community-backed ideas enter the <em>Spotlight</em> for direct technical deployment.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 font-display flex items-center gap-2">
              <Layers className="w-5 h-5 text-electric-indigo" />
              Key Features
            </h2>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-pink-500" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 font-display">Pitch Stepper Suite</h4>
                  <p className="text-slate-500 text-[11px]">Deploy highly structured proposals with interactive problem statements and tech stack lists.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-electric-indigo" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 font-display">Curated Spotlight streams</h4>
                  <p className="text-slate-500 text-[11px]">Real-time dual-role filtering matching technical capabilities with direct upvoted project indexes.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                  <Smartphone className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 font-display">Fluid Responsive Workspace</h4>
                  <p className="text-slate-500 text-[11px]">Experience lightning-fast adaptive navigation transitions perfectly designed for multi-tier displays.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated authorship footnote */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px] font-medium">
          <div className="flex items-center gap-1.5">
            <Code className="w-3.5 h-3.5 text-slate-400" />
            <span>Compiled with Tailwind CSS v4.0 & Vite</span>
          </div>
          <div className="text-right">
            <span>Powered by <strong className="text-slate-600 font-bold">Rupam Sadhukhan</strong> Creative Systems</span>
          </div>
        </div>

      </div>
    </div>
  );
}
