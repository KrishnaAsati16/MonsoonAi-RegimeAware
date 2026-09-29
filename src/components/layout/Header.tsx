import React from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  Bell, 
  Settings as SettingsIcon, 
  Menu
} from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenMobileSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenMobileSidebar
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#F5F5F3]/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between border-b border-[#E7E7E3]/60 transition-all">
      {/* Left Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl bg-white border border-[#E7E7E3] text-[#525252] hover:text-[#171717]"
          aria-label="Open menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A3A3A3]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search district, state or forecast..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#E7E7E3] rounded-xl text-xs sm:text-sm text-[#171717] placeholder-[#A3A3A3] focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-neutral-400 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          />
        </div>
      </div>

      {/* Right Metas & Actions */}
      <div className="flex items-center gap-2 sm:gap-4 ml-4">
        {/* Forecast Date */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E7E7E3] rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <Calendar className="w-3.5 h-3.5 text-[#737373]" />
          <div className="text-left leading-none">
            <div className="text-[10px] text-[#737373] uppercase tracking-wider font-medium">Forecast Date</div>
            <div className="text-xs font-semibold text-[#171717] mt-0.5">23 September 2026</div>
          </div>
        </div>

        {/* Forecast Cycle */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E7E7E3] rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <Clock className="w-3.5 h-3.5 text-[#737373]" />
          <div className="text-left leading-none">
            <div className="text-[10px] text-[#737373] uppercase tracking-wider font-medium">Forecast Cycle</div>
            <div className="text-xs font-semibold text-[#171717] mt-0.5">06:00 UTC</div>
          </div>
        </div>

        {/* Demo Mode Badge */}
        <div className="flex items-center">
          <span className="px-3 py-1 bg-[#F5F8E6] text-[#6A8812] border border-[#DEEBAB] text-xs font-semibold rounded-full tracking-tight">
            Demo Mode
          </span>
        </div>

        {/* Notification Bell */}
        <button 
          className="relative p-2 rounded-xl bg-white border border-[#E7E7E3] text-[#737373] hover:text-[#171717] hover:bg-[#FAFAF8] shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#E98276] rounded-full"></span>
        </button>

        {/* Settings Button */}
        <button 
          className="p-2 rounded-xl bg-white border border-[#E7E7E3] text-[#737373] hover:text-[#171717] hover:bg-[#FAFAF8] shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors"
          title="Quick Settings"
        >
          <SettingsIcon className="w-4 h-4" />
        </button>

        {/* User Avatar */}
        <div className="flex items-center pl-1">
          <div className="w-8 h-8 rounded-full bg-neutral-900 border-2 border-white shadow-sm flex items-center justify-center text-xs font-medium text-white overflow-hidden ring-1 ring-[#E7E7E3]">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="Weather Analyst"
              className="w-full h-full object-cover"
              onError={(e) => {
                // fallback to initials
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="text-[11px] font-semibold">WA</span>
          </div>
        </div>
      </div>
    </header>
  );
};
