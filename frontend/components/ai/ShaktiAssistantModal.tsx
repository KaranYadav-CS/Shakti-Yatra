'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageCircle, X, Send, ShieldCheck, CornerDownLeft, Bot, User } from 'lucide-react';
import { queryShaktiAssistant } from '@/lib/api';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  sources?: string[];
  suggestedActions?: string[];
}

const DEFAULT_PROMPTS = [
  "I am visiting Vindhyachal with my elderly parents",
  "I only have 6 hours, what is the best plan?",
  "What are the verified temple timings & aartis?",
  "What facilities are available for wheelchair users?",
];

export const ShaktiAssistantModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      sender: 'assistant',
      text: "Jai Mata Di! I am Shakti Assistant, your verified pilgrimage companion for Vindhyachal. How may I assist your sacred Yatra today?",
      sources: ["Vindhya Shrine Board", "UP Tourism"],
      suggestedActions: [
        "Plan my Vindhyachal trip",
        "What should I visit nearby?",
        "I am travelling with elderly parents",
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (messageText: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const mode = typeof window !== 'undefined' ? localStorage.getItem('shakti_accessibility_mode') || 'Normal' : 'Normal';
      const response = await queryShaktiAssistant(textToSend, mode);

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: response.reply,
        sources: response.sources,
        suggestedActions: response.suggested_actions,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: "I don't have verified information for that yet. Please refer to official temple helpdesk or emergency contacts.",
          sources: ["Vindhya Shrine Board Helpdesk"],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* FLOATING TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-shakti-600 via-amber-600 to-shakti-700 text-white font-medium shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 glow-shakti border border-amber-400/40"
        aria-label="Ask Shakti Pilgrimage Assistant"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 text-amber-200 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-900" />
        </div>
        <span className="hidden sm:inline font-serif font-bold text-sm tracking-wide">
          Ask Shakti Assistant
        </span>
      </button>

      {/* CHAT MODAL WINDOW */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full sm:max-w-lg h-[85vh] sm:h-[650px] rounded-t-3xl sm:rounded-3xl glass-panel-gold flex flex-col overflow-hidden shadow-2xl border border-amber-500/30">
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-shakti-950/70 to-slate-900 border-b border-amber-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-shakti-600 to-amber-500 flex items-center justify-center shadow-lg border border-amber-300/40">
                  <Sparkles className="w-5 h-5 text-white animate-spin-very-slow" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-base text-white">Shakti AI Assistant</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Strictly Verified
                    </span>
                  </div>
                  <p className="text-xs text-amber-200/70">Authentic pilgrimage guidance • No hallucinations</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
                aria-label="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-shakti-700/80 border border-shakti-500/40 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-amber-200" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-shakti-600 text-white rounded-br-xs'
                        : 'bg-slate-900/90 text-slate-100 border border-slate-700/60 rounded-bl-xs'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>

                    {/* Sources Badge */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] text-amber-300/80 flex items-center gap-1.5 flex-wrap">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Sources: {msg.sources.join(' • ')}</span>
                      </div>
                    )}

                    {/* Suggested Action Chips */}
                    {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="mt-3 pt-2 flex flex-wrap gap-1.5">
                        {msg.suggestedActions.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(action)}
                            className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-shakti-900/60 text-slate-300 hover:text-amber-200 border border-slate-700 hover:border-shakti-500/50 transition-all text-left"
                          >
                            ✦ {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4 text-slate-300" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-shakti-700/80 border border-shakti-500/40 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-amber-200" />
                  </div>
                  <div className="bg-slate-900/90 border border-slate-700/60 rounded-2xl px-4 py-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-xs text-slate-400 ml-1">Consulting verified shrine records...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Bar */}
            <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800/80 overflow-x-auto flex gap-2 no-scrollbar">
              {DEFAULT_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p)}
                  className="whitespace-nowrap px-3 py-1 rounded-full text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-amber-500/40 transition-all shrink-0"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-slate-900/95 border-t border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about timings, accessibility, Trikona Yatra, travel..."
                  className="flex-1 bg-slate-950 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-2xl text-sm border border-slate-800 focus:outline-hidden focus:border-amber-500/80 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-3 rounded-2xl bg-shakti-600 hover:bg-shakti-500 disabled:opacity-50 text-white transition-all shadow-md"
                  aria-label="Send query"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
