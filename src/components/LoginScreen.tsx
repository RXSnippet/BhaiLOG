/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Sparkles, Chrome, Github, ArrowRight } from 'lucide-react';
import { User } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (user: User) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('snippetrupam@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Rupam');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'Dreamer' | 'Builder' | 'Dual'>('Dual');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess({
      name: isSignUp ? name : 'Rupam Sen',
      email: email || 'snippetrupam@gmail.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      role: role
    });
  };

  const handleSocialLogin = (provider: string) => {
    onLoginSuccess({
      name: provider === 'Google' ? 'Google Collaborator' : 'GitHub Builder',
      email: email || 'user@bhailog.dev',
      avatarUrl: provider === 'Google' 
        ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
        : 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
      role: 'Dual'
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center py-10 px-4 bg-gradient-to-b from-[#f8fafc] to-[#eef2ff]">
      <div className="w-full max-w-[480px] bg-white rounded-2xl border border-slate-200/80 shadow-2xl p-8 md:p-10 my-auto animate-fade-in">
        {/* Logo and Greeting Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-electric-indigo flex items-center justify-center text-white mb-4 shadow-lg shadow-electric-indigo/20">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 font-display">
            IdeaSpark
          </h1>
          <p className="text-[#64748b] text-sm mt-1 font-sans">
            Fuel your creative momentum.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignUp && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider block">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rupam Sen"
                  className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl focus:border-electric-indigo focus:ring-2 focus:ring-electric-indigo/15 text-sm font-sans outline-none transition-all"
                  id="signup-name-input"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl focus:border-electric-indigo focus:ring-2 focus:ring-electric-indigo/15 text-sm font-sans outline-none transition-all"
                id="login-email-input"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Password
              </label>
              {!isSignUp && (
                <button
                  type="button"
                  onClick={() => alert('Demo Feature: Password recovery simulation active. Tap sign in to continue!')}
                  className="text-xs text-electric-indigo font-medium hover:underline cursor-pointer"
                  id="forgot-password"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl focus:border-electric-indigo focus:ring-2 focus:ring-electric-indigo/15 text-sm font-sans outline-none transition-all"
                id="login-password-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                id="login-toggle-password-view"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider block">
                Primary Interest Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Dreamer', 'Builder', 'Dual'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setRole(opt)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg text-center border transition-all cursor-pointer ${
                      role === opt
                        ? 'bg-electric-indigo-light text-electric-indigo border-electric-indigo'
                        : 'bg-[#f8fafc] text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-electric-indigo hover:bg-electric-indigo/90 text-white rounded-xl text-sm font-semibold shadow-lg shadow-electric-indigo/15 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 transition-all font-display mt-2"
            id="login-submit-button"
          >
            {isSignUp ? 'Create Free Account' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Dynamic Divider */}
        <div className="relative my-7">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-xs text-slate-400 uppercase">
            <span className="bg-white px-3 font-medium">Or continue with</span>
          </div>
        </div>

        {/* Social Authentication */}
        <div className="grid grid-cols-2 gap-3.5">
          <button
            onClick={() => handleSocialLogin('Google')}
            className="flex items-center justify-center gap-2.5 py-3 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 rounded-xl transition-all cursor-pointer"
            id="social-login-google"
          >
            <Chrome className="w-4 h-4 text-red-500" />
            Google
          </button>
          <button
            onClick={() => handleSocialLogin('GitHub')}
            className="flex items-center justify-center gap-2.5 py-3 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 rounded-xl transition-all cursor-pointer"
            id="social-login-github"
          >
            <Github className="w-4 h-4 text-slate-900" />
            GitHub
          </button>
        </div>
      </div>

      {/* Toggle Flow Footer */}
      <div className="text-center text-sm text-[#64748b] mt-4 font-sans">
        {isSignUp ? (
          <>
            Already have an account?{' '}
            <button
              onClick={() => setIsSignUp(false)}
              className="text-electric-indigo font-semibold hover:underline cursor-pointer"
              id="goto-signin"
            >
              Sign In
            </button>
          </>
        ) : (
          <>
            Don't have an account?{' '}
            <button
              onClick={() => setIsSignUp(true)}
              className="text-electric-indigo font-semibold hover:underline cursor-pointer"
              id="goto-signup"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}
