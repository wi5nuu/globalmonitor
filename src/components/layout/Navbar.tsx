import { useState } from 'react';
import { Shield, Radar, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LiveBadge } from '@/components/ui/LiveBadge';
import { CountBadge } from '@/components/ui/CountBadge';

interface NavbarProps {
  aircraftCount?: number;
  liveStatus?: 'fresh' | 'stale' | 'error';
  currentView?: 'home' | 'radar';
  onViewChange?: (view: 'home' | 'radar') => void;
}

export function Navbar({ 
  aircraftCount = 0, 
  liveStatus = 'fresh',
  currentView = 'home',
  onViewChange 
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'home' | 'radar') => {
    onViewChange?.(view);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-40',
        'h-14 md:h-[60px]',
        'bg-[#0A1628]/95 backdrop-blur-md',
        'border-b border-[#0EA5E9]/20'
      )}
    >
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 group"
        >
          <div className="relative">
            <Shield className="w-6 h-6 md:w-7 md:h-7 text-[#0EA5E9] group-hover:text-teal-500 transition-colors" />
            <Radar className="w-3 h-3 md:w-3.5 md:h-3.5 text-teal-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <span className="font-mono text-sm md:text-base font-bold tracking-wider text-slate-200">
            GLOBAL<span className="text-[#0EA5E9]">MONITOR</span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavClick('home')}
            className={cn(
              'font-mono text-sm tracking-wider transition-colors',
              currentView === 'home'
                ? 'text-[#0EA5E9]'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            HOME
          </button>
          <button
            onClick={() => handleNavClick('radar')}
            className={cn(
              'font-mono text-sm tracking-wider transition-colors',
              currentView === 'radar'
                ? 'text-[#0EA5E9]'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            RADAR
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-4">
          <LiveBadge status={liveStatus} className="hidden sm:flex" />
          <CountBadge count={aircraftCount} className="hidden sm:flex" />
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-slate-200 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0A1628]/95 backdrop-blur-md border-b border-[#0EA5E9]/20">
          <div className="px-4 py-3 space-y-2">
            <button
              onClick={() => handleNavClick('home')}
              className={cn(
                'block w-full text-left py-2 font-mono text-sm tracking-wider transition-colors',
                currentView === 'home'
                  ? 'text-[#0EA5E9]'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              HOME
            </button>
            <button
              onClick={() => handleNavClick('radar')}
              className={cn(
                'block w-full text-left py-2 font-mono text-sm tracking-wider transition-colors',
                currentView === 'radar'
                  ? 'text-[#0EA5E9]'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              RADAR
            </button>
            <div className="pt-2 border-t border-[#0EA5E9]/10 flex items-center justify-between">
              <LiveBadge status={liveStatus} />
              <CountBadge count={aircraftCount} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
