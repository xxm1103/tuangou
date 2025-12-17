import React from 'react';
import { 
  LayoutGrid, 
  Store, 
  BarChart2, 
  Settings, 
  ChevronDown, 
  ChevronRight,
  Ticket,
  AlertOctagon
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onChangeView: (view: string) => void;
}

const MenuItem = ({ 
  icon: Icon, 
  label, 
  active = false, 
  onClick, 
  hasSubmenu = false, 
  expanded = false 
}: any) => (
  <div 
    onClick={onClick}
    className={`
      flex items-center justify-between px-4 py-3 mx-2 rounded-lg cursor-pointer text-sm font-medium transition-all duration-200
      ${active 
        ? 'text-[#00C29F] bg-[#00C29F]/10' 
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
    `}
  >
    <div className="flex items-center gap-3">
      <Icon size={18} strokeWidth={active ? 2.5 : 2} />
      <span>{label}</span>
    </div>
    {hasSubmenu && (
      expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
    )}
  </div>
);

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-100 h-screen flex flex-col flex-shrink-0 sticky top-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-30">
      <div className="h-16 flex items-center px-6 mb-2">
        <div className="flex items-center gap-2.5 text-gray-900 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 rounded-full bg-[#00C29F] flex items-center justify-center text-white text-lg pb-0.5">Q</div>
          <span>企迈科技</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar space-y-1">
        
        <MenuItem 
          icon={LayoutGrid} 
          label="渠道管理" 
          active={currentView === 'channels'} 
          onClick={() => onChangeView('channels')}
        />
        
        <MenuItem 
          icon={Store} 
          label="门店绑定" 
          active={currentView === 'store-binding'} 
          onClick={() => onChangeView('store-binding')}
        />

        <MenuItem 
          icon={Ticket} 
          label="商品绑定" 
          active={currentView === 'products'}
          onClick={() => onChangeView('products')}
        />

        <MenuItem 
          icon={BarChart2} 
          label="核销记录" 
          active={currentView === 'records'}
          onClick={() => onChangeView('records')}
        />

        <MenuItem 
          icon={AlertOctagon} 
          label="异常监控" 
          active={currentView === 'exceptions'}
          onClick={() => onChangeView('exceptions')}
        />

      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#00C29F] cursor-pointer transition-colors px-2 py-2">
          <Settings size={16} />
          <span>系统设置</span>
        </div>
      </div>
    </div>
  );
};