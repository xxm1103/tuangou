import React, { useState, useEffect } from 'react';
import { CHANNELS } from '../constants';
import { Channel } from '../types';
import { 
  CheckCircle2, 
  ChevronRight, 
  Store,
  Link as LinkIcon,
  ShieldCheck,
  Search,
  AlertCircle,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Monitor,
  Smartphone,
  Tablet,
  ScanLine
} from 'lucide-react';

interface ChannelCenterProps {
  onNavigate: (view: string) => void;
}

export const ChannelCenter: React.FC<ChannelCenterProps> = ({ onNavigate }) => {
  const [selectedChannelId, setSelectedChannelId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter channels based on search term
  const filteredChannels = CHANNELS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Auto-select first channel when list changes or initial load
  useEffect(() => {
    if (filteredChannels.length > 0) {
      // If currently selected channel is not in the new filtered list, select the first one
      const currentInList = filteredChannels.find(c => c.id === selectedChannelId);
      if (!currentInList) {
        setSelectedChannelId(filteredChannels[0].id);
      }
    } else {
      setSelectedChannelId('');
    }
  }, [filteredChannels, selectedChannelId]);

  const selectedChannel = CHANNELS.find(c => c.id === selectedChannelId) || filteredChannels[0];

  return (
    <div className="flex h-full bg-[#F7F8FA] overflow-hidden">
      {/* Left Sidebar - Channel Navigation */}
      <div className="w-72 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col z-10">
        
        <div className="p-5 pb-3">
           <h2 className="text-base font-bold text-gray-900">接入渠道</h2>
        </div>

        <div className="px-4 pb-4 border-b border-gray-50">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#00C29F] transition-colors" size={15} />
            <input 
              type="text" 
              placeholder="搜索平台" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 text-sm pl-9 pr-4 py-2 rounded-lg border-transparent focus:bg-white focus:ring-1 focus:ring-[#00C29F] focus:border-[#00C29F] transition-all outline-none placeholder-gray-400"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-3 space-y-2">
          {filteredChannels.length > 0 ? (
            filteredChannels.map((channel) => (
              <ChannelListItem 
                key={channel.id}
                channel={channel}
                isSelected={selectedChannelId === channel.id}
                onClick={() => setSelectedChannelId(channel.id)}
              />
            ))
          ) : (
            <div className="text-center py-10 text-gray-400 text-xs">
              无相关渠道
            </div>
          )}
        </div>
      </div>

      {/* Right Content - Configuration Detail */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        {selectedChannel ? (
           <ChannelDetailConfig 
             channel={selectedChannel} 
             onNavigate={onNavigate}
           />
        ) : (
           <div className="flex items-center justify-center h-full text-gray-400 text-sm">
             请选择左侧渠道进行配置
           </div>
        )}
      </div>
    </div>
  );
};

// --- Subcomponents ---

const ChannelListItem: React.FC<{ channel: Channel; isSelected: boolean; onClick: () => void }> = ({ channel, isSelected, onClick }) => {
  const isAuthorized = channel.status === 'authorized';
  // Mock logic: Douyin (id '1') has binding risks consistent with the detail view
  const hasRisk = channel.id === '1'; 
  
  return (
    <div 
      onClick={onClick}
      className={`
        relative flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-200 border
        ${isSelected 
          ? 'bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] border-gray-100 z-10' 
          : 'border-transparent hover:bg-gray-50'}
      `}
    >
      {/* Icon with Status Badge */}
      <div className="relative">
        <div className={`
          w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200
          ${channel.platformId === 'douyin' ? 'bg-black text-white' : 
            channel.platformId === 'meituan' ? 'bg-[#FFC300] text-black' : 'bg-gray-100 text-gray-500'}
        `}>
          {React.cloneElement(channel.icon as React.ReactElement<any>, { className: "w-5 h-5" })}
        </div>
        
        {/* Corner Badge */}
        <div className={`
          absolute -top-1 -right-1 w-4 h-4 border-2 border-white rounded-full flex items-center justify-center shadow-sm
          ${isAuthorized 
             ? (hasRisk ? 'bg-orange-500' : 'bg-[#00C29F]') 
             : 'bg-gray-300'}
        `}>
          {isAuthorized && hasRisk && <span className="text-white text-[10px] font-bold">!</span>}
        </div>
      </div>
      
      {/* Text Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-0.5">
          <span className={`font-bold text-sm truncate ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
            {channel.name}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5">
           {isAuthorized ? (
             hasRisk ? (
               <>
                 <AlertCircle size={10} className="text-orange-500" />
                 <span className="text-xs text-orange-500 font-medium scale-90 origin-left">存在配置风险</span>
               </>
             ) : (
               <>
                 <span className="w-1.5 h-1.5 rounded-full bg-[#00C29F]"></span>
                 <span className="text-xs text-gray-400 scale-90 origin-left">已连接</span>
               </>
             )
           ) : (
             <span className="text-xs text-gray-300 scale-90 origin-left">未授权接入</span>
           )}
        </div>
      </div>
      
      {isSelected && <ChevronRight size={14} className="text-gray-300" />}
    </div>
  );
};

interface DetailProps {
  channel: Channel;
  onNavigate: (view: string) => void;
}

const ChannelDetailConfig: React.FC<DetailProps> = ({ channel, onNavigate }) => {
  const isAuthorized = channel.status === 'authorized';
  
  // Mock data for store binding
  const totalStores: number = 12;
  const boundStores: number = 5;
  const isFullyBound = boundStores === totalStores;
  const unboundStores = totalStores - boundStores;
  const percentage = Math.round((boundStores/totalStores)*100);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Header Info */}
      <div className="flex items-center justify-between mb-4">
        <div>
           <div className="flex items-center gap-3">
             <h1 className="text-2xl font-bold text-gray-900">{channel.name}配置</h1>
             <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded border border-gray-200 font-medium">团购</span>
           </div>
           <p className="text-gray-500 text-sm mt-1.5">管理{channel.name}的授权、门店映射及商品关联。</p>
        </div>
        <a href="#" className="text-[#00C29F] text-sm font-bold flex items-center gap-1 hover:underline hover:text-[#00A88D] transition-colors">
            查看接入文档 <ExternalLink size={14} />
        </a>
      </div>

      {/* STEP 1: Authorization */}
      <section className="bg-white rounded-2xl p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 group hover:border-gray-200 transition-all">
          <div className="flex justify-between items-start">
             <div className="flex gap-5">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                   <ShieldCheck size={20} />
                </div>
                <div>
                   <h3 className="text-lg font-bold text-gray-900">步骤 1: 品牌授权</h3>
                   <p className="text-sm text-gray-500 mt-1.5 max-w-2xl leading-relaxed">
                      授权企迈SaaS平台获取您的{channel.name}企业账户权限，这是实现门店同步、商品上架及订单核销的基础。
                   </p>
                </div>
             </div>
             <button className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm bg-white">
                {isAuthorized ? '更新授权' : '去授权'}
             </button>
          </div>

          <div className="mt-6 ml-[60px]">
              {isAuthorized ? (
                 <div className="bg-[#F0FDF9] border border-[#00C29F]/20 rounded-xl p-5 flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#00C29F] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                       <CheckCircle2 size={14} strokeWidth={3} />
                    </div>
                    <div>
                       <h4 className="text-sm font-bold text-gray-900">已成功授权</h4>
                       <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-8 text-xs text-gray-600">
                          <span>授权主体：<span className="font-medium text-gray-900">上海企迈餐饮管理有限公司</span></span>
                          <span>有效期至：<span className="font-medium text-gray-900 font-mono">2025-12-31</span></span>
                       </div>
                    </div>
                 </div>
              ) : (
                 <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 flex items-start gap-4">
                    <AlertCircle className="text-orange-500 mt-0.5" size={20} />
                    <div>
                       <h4 className="text-sm font-bold text-orange-900">尚未授权</h4>
                       <p className="text-xs text-orange-700 mt-1">请管理员扫码授权以开启服务。</p>
                    </div>
                 </div>
              )}
          </div>
      </section>

      {/* STEP 2: Store Binding */}
      <section className={`bg-white rounded-2xl p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 group hover:border-gray-200 transition-all ${!isAuthorized ? 'opacity-60 grayscale-[0.5]' : ''}`}>
          <div className="flex justify-between items-start">
             <div className="flex gap-5">
                <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                   <Store size={20} />
                </div>
                <div>
                   <h3 className="text-lg font-bold text-gray-900">步骤 2: 门店绑定</h3>
                   <p className="text-sm text-gray-500 mt-1.5 max-w-2xl leading-relaxed">
                      建立SaaS门店与{channel.name}POI门店的映射关系，确保团购券能在正确门店核销。
                   </p>
                </div>
             </div>
             <button 
                onClick={() => onNavigate('store-binding')}
                className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm bg-white"
             >
                管理绑定
             </button>
          </div>

          <div className="mt-8 ml-[60px]">
              <div className="flex items-center gap-6 mb-6">
                 <div className="text-4xl font-bold text-gray-900 font-mono tracking-tight">{percentage}<span className="text-lg text-gray-400 ml-1">%</span></div>
                 <div className="flex-1">
                    <div className="flex justify-between text-xs mb-2">
                       <span className="font-bold text-gray-700">绑定完成度</span>
                       <span className="text-gray-500 font-mono">{boundStores} / {totalStores} 门店</span>
                    </div>
                    <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full transition-all duration-1000 ${isFullyBound ? 'bg-[#00C29F]' : 'bg-[#00C29F]'}`}
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                 </div>
              </div>

              {!isFullyBound && (
                  <div className="flex items-center justify-between bg-orange-50 border border-orange-100 rounded-xl px-5 py-3.5">
                      <div className="flex items-center gap-3">
                          <AlertTriangle size={18} className="text-orange-500" />
                          <div className="text-sm text-gray-700">
                              检测到 <span className="font-bold text-orange-600">{unboundStores} 家门店</span> 尚未关联 POI，将导致无法核销。
                          </div>
                      </div>
                      <button 
                          onClick={() => onNavigate('store-binding')}
                          className="text-xs font-bold text-white bg-orange-400 hover:bg-orange-500 px-4 py-1.5 rounded-md transition-colors shadow-sm shadow-orange-200"
                      >
                          去关联
                      </button>
                  </div>
              )}
          </div>
      </section>

      {/* STEP 3: Product Binding */}
      <section className={`bg-white rounded-2xl p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 group hover:border-gray-200 transition-all ${!isAuthorized ? 'opacity-60 grayscale-[0.5]' : ''}`}>
          <div className="flex justify-between items-start">
             <div className="flex gap-5">
                <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                   <LinkIcon size={20} />
                </div>
                <div>
                   <h3 className="text-lg font-bold text-gray-900">步骤 3: 团购商品绑定</h3>
                   <p className="text-sm text-gray-500 mt-1.5 max-w-2xl leading-relaxed">
                      将{channel.name}后台创建的团购券与SaaS收银系统中的商品进行关联。支持 <span className="font-bold text-gray-700">单品绑定</span>、<span className="font-bold text-gray-700">多选一(M选N)</span> 等复杂规则。
                   </p>
                </div>
             </div>
             <button className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm bg-white">
                待配置
             </button>
          </div>

          <div className="mt-8 ml-[60px] flex items-center justify-between bg-gray-50/50 rounded-xl p-6 border border-gray-100">
              <div className="flex gap-12">
                  <div>
                      <div className="text-3xl font-bold text-gray-900 font-mono mb-1">5</div>
                      <div className="text-xs text-gray-500 font-medium">已同步商品</div>
                  </div>
                  <div>
                      <div className="text-3xl font-bold text-orange-500 font-mono mb-1">2</div>
                      <div className="text-xs text-gray-500 font-medium">待绑定配置</div>
                  </div>
              </div>
              
              <button 
                  onClick={() => onNavigate('products')}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-lg shadow-lg shadow-purple-100 transition-all transform hover:-translate-y-0.5"
              >
                  <RefreshCw size={16} />
                  前往配置商品
              </button>
          </div>
      </section>

      {/* STEP 4: Order Verification */}
      <section className={`bg-white rounded-2xl p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 group hover:border-gray-200 transition-all ${!isAuthorized ? 'opacity-60 grayscale-[0.5]' : ''}`}>
          <div className="flex justify-between items-start">
             <div className="flex gap-5">
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                   <ScanLine size={20} />
                </div>
                <div>
                   <h3 className="text-lg font-bold text-gray-900">步骤 4: 下单核销</h3>
                   <p className="text-sm text-gray-500 mt-1.5 max-w-2xl leading-relaxed">
                      配置完成的团购券可通过以下渠道进行核销，确保订单快速闭环。
                   </p>
                </div>
             </div>
             <span className="px-3 py-1 rounded text-xs font-bold bg-green-50 text-green-600 border border-green-100">
                运行中
             </span>
          </div>

          <div className="mt-8 ml-[60px] grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-indigo-500 border border-gray-100">
                      <Monitor size={20} />
                  </div>
                  <span className="text-sm font-bold text-gray-700">POS收银机核销</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-indigo-500 border border-gray-100">
                      <Smartphone size={20} />
                  </div>
                  <span className="text-sm font-bold text-gray-700">小程序自助核销</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-indigo-500 border border-gray-100">
                      <Tablet size={20} />
                  </div>
                  <span className="text-sm font-bold text-gray-700">商家APP核销</span>
              </div>
          </div>
      </section>

    </div>
  );
};