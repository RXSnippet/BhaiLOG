/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, CheckCheck, Smile, Paperclip, MessageSquare } from 'lucide-react';

interface MessagesScreenProps {
  userName: string;
}

export default function MessagesScreen({ userName }: MessagesScreenProps) {
  const [activeContactId, setActiveContactId] = useState<number>(0);
  const [messages, setMessages] = useState<Record<number, { text: string; sender: 'me' | 'them'; time: string }[]>>({
    0: [
      { text: 'Hey there! I saw you checked out the supply chain AI project. Are you familiar with Scope 3 calculations?', sender: 'them', time: '11:15 AM' },
      { text: 'Yes! I have integrated standard ERP structures before using Python delta models.', sender: 'me', time: '11:20 AM' },
      { text: 'That is perfect! We have a Zoom sync scheduled with our neuro-advisors tomorrow at 2 PM. Can you join?', sender: 'them', time: '11:22 AM' }
    ],
    1: [
      { text: 'Hey, did you look over the C++ audio compiler roadmap yet?', sender: 'them', time: 'Yesterday' },
      { text: 'I am drafting the mock rendering handlers in Vulkan tonight.', sender: 'me', time: 'Yesterday' }
    ],
    2: [
      { text: 'Welcome to the Team! Let us set up the GitHub repository bindings soon.', sender: 'them', time: 'Tuesday' }
    ]
  });

  const [inputText, setInputText] = useState('');

  const contacts = [
    { id: 0, name: 'Sarah Chen', status: 'Active Now', role: 'Sustainability Lead', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
    { id: 1, name: 'Alex Rivera', status: 'Offline', role: 'Indie Game Coder', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80' },
    { id: 2, name: 'Marcus Thorne', status: 'Away', role: 'Community Architect', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const currentChat = messages[activeContactId] || [];
    const updatedChat = [
      ...currentChat,
      { text: inputText, sender: 'me', time: 'Just now' }
    ];

    setMessages({
      ...messages,
      [activeContactId]: updatedChat
    });
    setInputText('');

    // Simulated responsive reply after 1.5 seconds!
    setTimeout(() => {
      setMessages(prev => {
        const chat = prev[activeContactId] || [];
        return {
          ...prev,
          [activeContactId]: [
            ...chat,
            { text: `Thanks for the reply! Let's schedule a call on Discord soon to plan this further.`, sender: 'them', time: 'Just now' }
          ]
        };
      });
    }, 1500);
  };

  const activeContact = contacts[activeContactId];
  const activeChat = messages[activeContactId] || [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in select-none">
      <div className="flex flex-col md:flex-row bg-white border border-slate-200/80 rounded-2xl shadow-sm h-[600px] overflow-hidden">
        
        {/* Contact List column */}
        <div className="w-full md:w-80 border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h2 className="font-bold text-gray-900 text-base font-display flex items-center gap-2">
              <MessageSquare className="w-4.5 h-4.5 text-electric-indigo" />
              Collaborator Chats
            </h2>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide">Select a pitch partner to correspond</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setActiveContactId(contact.id)}
                className={`w-full p-4 flex gap-3 text-left transition-all hover:bg-slate-50 cursor-pointer ${
                  activeContactId === contact.id ? 'bg-electric-indigo/5 border-l-4 border-electric-indigo' : ''
                }`}
              >
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-xs text-gray-900 truncate block">{contact.name}</span>
                    <span className="text-[9px] text-[#64748b]">{contact.id === 0 ? 'Active' : 'Offline'}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 truncate block mt-0.5">{contact.role}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area column */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden bg-slate-50/30">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-200 bg-white flex items-center gap-3">
            <img
              src={activeContact.avatar}
              alt={activeContact.name}
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover"
            />
            <div>
              <span className="text-xs font-bold text-gray-900 block">{activeContact.name}</span>
              <span className="text-[10px] text-slate-500 font-medium block">Role: {activeContact.role}</span>
            </div>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeChat.map((msg, index) => {
              const isMe = msg.sender === 'me';
              return (
                <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs sm:max-w-md p-3.5 rounded-2xl text-xs leading-relaxed border ${
                    isMe
                      ? 'bg-electric-indigo text-white border-electric-indigo rounded-br-none'
                      : 'bg-white text-gray-800 border-slate-200 rounded-bl-none'
                  }`}>
                    <p className="font-sans font-medium">{msg.text}</p>
                    <div className="flex justify-end items-center gap-1 mt-1.5 opacity-70">
                      <span className="text-[9px] text-right block">{msg.time}</span>
                      {isMe && <CheckCheck className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reply Form Footer */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 bg-white flex gap-3 items-center">
            <button
              type="button"
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg cursor-pointer transition-colors"
              onClick={() => alert("Simulation tip: Attached images or files can be simulated directly on commit!")}
              title="Attach File"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Write your reply to ${activeContact.name}...`}
              className="flex-grow px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-electric-indigo focus:ring-2 focus:ring-electric-indigo/10 text-xs transition-all font-sans"
              id="chat-message-input"
            />

            <button
              type="submit"
              className="p-2.5 bg-electric-indigo hover:bg-[#3525cd] text-white rounded-xl cursor-pointer transition-colors"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
