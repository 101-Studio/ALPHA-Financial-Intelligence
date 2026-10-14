import React, { useState, useEffect } from 'react';
import { Search, Bell, Clock, Globe2, ChevronDown, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenBriefing: () => void;
  onSearchClick: () => void;
  pristinaTime: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  setActiveSection,
  onOpenBriefing,
  onSearchClick,
  pristinaTime,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Front Page' },
    { id: 'markets', label: 'Markets' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'startups', label: 'Startups & VC' },
    { id: 'balkans', label: 'Balkans' },
    { id: 'research', label: 'Research' },
    { id: 'calendar', label: 'Calendar' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all">
      {/* Editorial Utility Micro-Bar */}
      <div className="border-b border-stone-100 bg-stone-50/70 px-4 sm:px-8 py-1.5 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-stone-900 tracking-wider uppercase text-[10px]">Edition: Global & US</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <div className="flex items-center gap-1.5 font-mono-nums text-stone-600">
              <Clock className="w-3 h-3 text-stone-400" />
              <span>Pristina: {pristinaTime || '07:00 CEST'}</span>
            </div>
            <span aria-hidden="true" className="text-stone-300 hidden md:inline">·</span>
            <span className="hidden md:inline text-stone-500">Automated Daily Briefing: 07:00 AM (Europe/Pristina)</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
              <CheckCircle2 className="w-3 h-3" />
              Scheduled: 101webstudio@gmail.com
            </span>
            <button
              onClick={onSearchClick}
              className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 transition-colors"
              aria-label="Search articles and assets"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Top Bar (3-Zone Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveSection('home')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-editorial text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950 group-hover:text-amber-700 transition-colors">
                ALPHA
              </span>
              <span className="hidden lg:inline text-[11px] uppercase tracking-widest text-stone-600 font-medium font-sans">
                Financial Intelligence
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-7 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveSection(link.id)}
              className={`whitespace-nowrap transition-colors relative py-1 focus:outline-none ${
                activeSection === link.id
                  ? 'text-stone-950 font-semibold'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenBriefing}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors whitespace-nowrap shadow-xs flex items-center gap-1.5"
          >
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>07:00 Briefing</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-stone-700 hover:text-stone-900"
            aria-label="Toggle Navigation Menu"
          >
            <ChevronDown className={`w-5 h-5 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 py-3 flex flex-col gap-2 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActiveSection(link.id);
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2 px-3 text-sm rounded-md transition-colors ${
                activeSection === link.id
                  ? 'bg-stone-100 text-stone-950 font-semibold'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>Daily dispatch: 07:00 Europe/Pristina</span>
            <span className="text-emerald-700 font-medium">Active</span>
          </div>
        </div>
      )}
    </header>
  );
};
