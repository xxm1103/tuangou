import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChannelCenter } from './components/ChannelCenter';
import { ProductMapping } from './components/ProductMapping';
import { RedemptionRecords } from './components/RedemptionRecords';
import { StoreBinding } from './components/StoreBinding';
import { ExceptionMonitoring } from './components/ExceptionMonitoring';
import { Bell, HelpCircle, Search, User } from 'lucide-react';

const Header = () => (
  <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-20 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
    <div className="flex items-center w-96">
       <div className="relative w-full group">
         <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#00C29F] transition-colors" size={18} />
         <input 
            type="text" 
            placeholder="搜索功能导航、帮助文档" 
            className="w-full pl-11 pr-4 py-2 text-sm bg-gray-50 border-none rounded-full focus:bg-white focus:ring-2 focus:ring-[#00C29F]/20 transition-all outline-none text-gray-600 placeholder-gray-400"
         />
       </div>
    </div>
    <div className="flex items-center gap-6">
      <button className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#00C29F] transition-colors">
        <div className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold">New</div>
        <span>版本更新</span>
      </button>
      <div className="h-4 w-px bg-gray-200"></div>
      <button className="text-gray-400 hover:text-gray-800 relative transition-colors">
        <Bell size={20} />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
      </button>
      <button className="text-gray-400 hover:text-gray-800 transition-colors">
        <HelpCircle size={20} />
      </button>
      <div className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 py-1.5 px-3 rounded-full border border-transparent hover:border-gray-100 transition-all">
        <div className="w-8 h-8 rounded-full bg-[#00C29F]/10 flex items-center justify-center text-[#00C29F]">
          <User size={16} />
        </div>
        <span className="font-medium">谢晓蒙</span>
      </div>
    </div>
  </header>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('channels');

  const renderContent = () => {
    switch (currentView) {
      case 'channels':
        return <ChannelCenter onNavigate={setCurrentView} />;
      case 'store-binding':
        return <StoreBinding />;
      case 'products':
        return <ProductMapping />;
      case 'records':
        return <RedemptionRecords />;
      case 'exceptions':
        return <ExceptionMonitoring />;
      default:
        return <ChannelCenter onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-white text-gray-900 font-sans">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <Header />
        <main className="flex-1 flex overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;