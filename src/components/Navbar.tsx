/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Bell, Sparkles, LogOut, ChevronDown, CheckCheck, RefreshCw, Menu } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  activeTab: 'welcome' | 'board' | 'finder' | 'pitch' | 'messages' | 'about';
  setActiveTab: (tab: 'welcome' | 'board' | 'finder' | 'pitch' | 'messages' | 'about') => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onToggleSidebar?: () => void;
}

export default function Navbar({
  user,
  onLogout,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onToggleSidebar
}: NavbarProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Custom interactive mock notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Sarah Chen applied as a collaborator on "Sustainable Supply Chain AI"', read: false, time: '2 mins ago' },
    { id: 2, text: 'Your idea "NeuralLink" received 15 new developer upvotes', read: false, time: '1 hour ago' },
    { id: 3, text: 'Alex Rivera committed to build milestone 3 of DevConnect CLI', read: true, time: '3 hours ago' }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // If user types and is on another tab, auto-switch to board to show search results!
    if (activeTab !== 'board' && activeTab !== 'finder') {
      setActiveTab('board');
    }
  };

  return (
    <header className="h-16 border-b border-[#eceef0] bg-white px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 select-none">
      {/* Brand logo (Image 1 top left: BhaiLOG) with mobile menu button */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button 
            onClick={onToggleSidebar}
            className="md:hidden p-1.5 hover:bg-slate-100 rounded-xl text-[#64748b] hover:text-[#191c1e] transition-colors cursor-pointer"
            title="Toggle Sidebar"
          >
            <Menu className="w-5.5 h-5.5" />
          </button>
        )}

        <div 
          onClick={() => setActiveTab('welcome')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-electric-indigo flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-250">
            <Sparkles className="w-4.5 h-4.5 fill-white/10" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-brand-purple font-display bg-gradient-to-r from-brand-purple to-electric-indigo bg-clip-text text-transparent">
            BhaiLOG
          </span>
        </div>
      </div>

      {/* Main Tabs Navigation (Image 1 & 4 center options) */}
      <nav className="hidden md:flex items-center gap-6 h-full font-display">
        {[
          { id: 'board', label: 'Idea Board' },
          { id: 'finder', label: 'My Projects' },
          { id: 'messages', label: 'Messages' },
          { id: 'about', label: 'About Us' }
        ].map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`text-sm font-semibold tracking-wide h-full px-1.5 relative flex items-center transition-all cursor-pointer ${
                isSelected ? 'text-electric-indigo font-bold' : 'text-[#64748b] hover:text-[#191c1e]'
              }`}
            >
              {tab.label}
              {isSelected && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric-indigo rounded-full"></span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Interactive Right-side Widgets */}
      <div className="flex items-center gap-4">
        {/* Advanced search widget */}
        <div className="relative max-w-xs hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search ideas, techs..."
            className="w-56 pl-9 pr-4 py-1.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs outline-none focus:border-electric-indigo focus:ring-2 focus:ring-electric-indigo/10 transition-all font-sans"
            id="global-search-bar"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-2 text-xs text-slate-400 hover:text-slate-600 font-medium px-1 bg-slate-100 rounded"
            >
              Clear
            </button>
          )}
        </div>

        {/* Notifications Icon and Dynamic Badge Popover (Images top right indicator) */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="w-10 h-10 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-center text-slate-600 hover:bg-[#eceef0]/60 hover:text-[#191c1e] transition-all cursor-pointer relative"
            id="navbar-notifications-button"
            title="Notifications list"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-600 text-[10px] font-bold text-white rounded-full flex items-center justify-center shadow-lg shadow-pink-600/30 animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-4 font-sans text-xs animate-fade-in text-[#191c1e] max-h-96 overflow-y-auto">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 mb-3">
                <span className="font-bold text-[#191c1e] text-sm">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-electric-indigo hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    Mark all read
                  </button>
                )}
              </div>

              {notifications.length === 0 ? (
                <div className="py-8 text-center text-slate-400">
                  All caught up! No notifications.
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 rounded-xl border border-slate-100 transition-all ${
                        notif.read ? 'bg-white opacity-70' : 'bg-electric-indigo/5 border-electric-indigo/10'
                      }`}
                    >
                      <p className="text-[11px] leading-relaxed text-gray-800 font-medium">
                        {notif.text}
                      </p>
                      <span className="text-[10px] text-slate-400 block mt-1.5">{notif.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* User profile dropdown and authentication settings */}
        {user && (
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 py-1.5 pl-1.5 pr-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-xl transition-all cursor-pointer"
              id="navbar-profile-trigger"
            >
              <img
                src={user.avatarUrl}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-lg object-cover bg-slate-200 ring-2 ring-electric-indigo/20"
              />
              <span className="text-xs font-bold text-gray-700 max-w-[100px] truncate hidden sm:block">
                {user.name}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-2 font-sans text-xs animate-fade-in">
                <div className="px-3 py-2.5 border-b border-slate-100 mb-1.5">
                  <span className="block font-bold text-gray-900 truncate">{user.name}</span>
                  <span className="block text-[10px] text-slate-400 truncate mt-0.5">{user.email}</span>
                </div>
                
                {/* Role Switch Tool */}
                <div className="p-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 my-1">
                  Workspace Role
                </div>
                <div className="px-3 py-1.5 bg-slate-50 rounded-xl m-1 text-[11px] text-slate-600 font-medium flex justify-between items-center">
                  <span>Type: <strong className="text-electric-indigo font-bold">{user.role}</strong></span>
                  <button 
                    onClick={() => {
                      alert("Testing tip: You triggered a role profile swap! Excellent.");
                    }}
                    className="p-1 bg-white border border-slate-200 rounded-lg hover:border-slate-300"
                    title="Simulate swap"
                  >
                    <RefreshCw className="w-2.5 h-2.5 text-slate-500" />
                  </button>
                </div>

                <div className="h-px bg-slate-100 my-1.5"></div>

                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-pink-600 hover:bg-pink-50 rounded-xl transition-all text-left cursor-pointer"
                  id="navbar-logout-button"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
