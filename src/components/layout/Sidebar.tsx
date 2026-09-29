import React from 'react';
import { 
  LayoutDashboard, 
  CloudRain, 
  Waves, 
  MapPin, 
  CloudLightning, 
  ShieldCheck, 
  BarChart3, 
  Database, 
  Settings,
  X
} from 'lucide-react';

export type TabId = 
  | 'Dashboard' 
  | 'Forecast' 
  | 'Weather Regimes' 
  | 'Districts' 
  | 'Heavy Rainfall' 
  | 'Verification' 
  | 'Model Performance' 
  | 'Data Sources' 
  | 'Settings';

interface SidebarProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  onSelectTab, 
  isOpen = false,
  onClose 
}) => {
  const navItems: { label: TabId; icon: React.ElementType }[] = [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Forecast', icon: CloudRain },
    { label: 'Weather Regimes', icon: Waves },
    { label: 'Districts', icon: MapPin },
    { label: 'Heavy Rainfall', icon: CloudLightning },
    { label: 'Verification', icon: ShieldCheck },
    { label: 'Model Performance', icon: BarChart3 },
    { label: 'Data Sources', icon: Database },
    { label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-[#E7E7E3]
        flex flex-col justify-between p-5 transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top Header / Branding */}
        <div>
          <div className="flex items-center justify-between pb-6 pt-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EBF4FE] flex items-center justify-center text-[#75B8F5] shadow-sm">
                <CloudRain className="w-5 h-5 text-[#2563EB]" />
              </div>
              <div>
                <h1 className="text-base font-bold tracking-tight text-[#171717] leading-tight flex items-center gap-1.5">
                  Monsoon AI
                </h1>
                <p className="text-[11px] text-[#737373] font-medium leading-none mt-0.5">
                  Regime-Aware Rainfall Intelligence
                </p>
              </div>
            </div>

            {/* Mobile close button */}
            <button 
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1 mt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.label;

              return (
                <button
                  key={item.label}
                  onClick={() => {
                    onSelectTab(item.label);
                    if (onClose) onClose();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                    transition-all duration-150 text-left
                    ${isActive 
                      ? 'bg-[#ECECE9] text-[#171717] font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.02)]' 
                      : 'text-[#525252] hover:bg-[#F5F5F3] hover:text-[#171717]'
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#171717]' : 'text-[#737373]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom System Status */}
        <div className="pt-4 border-t border-[#E7E7E3]/80">
          <div className="px-1">
            <div className="text-[10px] font-semibold tracking-wider text-[#A3A3A3] uppercase mb-1.5">
              System Status
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-[#171717]">
                AI SYSTEM ONLINE
              </span>
            </div>
            <div className="text-[11px] text-[#737373]">
              MoES • NCMRWF
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
