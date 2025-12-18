
import React, { useState, useEffect } from 'react';
import { CHANNELS } from '../constants';
import { Channel } from '../types';
import { 
  CheckCircle2, 
  Store,
  Link as LinkIcon,
  ShieldCheck,
  AlertCircle,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Monitor,
  Smartphone,
  Tablet,
  ScanLine,
  Layout,
  MousePointer2,
  Receipt,
  Layers,
  ShoppingBag,
  TrendingUp,
  Clock,
  Shield,
  QrCode,
  Utensils,
  Percent,
  X,
  Power,
  Zap,
  RefreshCcw
} from 'lucide-react';

interface ChannelCenterProps {
  onNavigate: (view: string) => void;
}

type BusinessType = 'group-buying' | 'pay-at-table' | 'order-at-table';

// --- Illustrations ---
const GroupBuyingIllustration = () => (
  <div className="relative w-48 h-36 select-none pointer-events-none">
     <div className="absolute top-4 right-4 w-28 h-32 bg-white rounded-xl shadow-sm border border-orange-100 transform rotate-6 flex flex-col items-center pt-5 transition-transform duration-500 hover:rotate-12 hover:-translate-y-1">
        <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-3">
          <ShoppingBag size={20} className="text-orange-500" />
        </div>
        <div className="w-16 h-2 bg-gray-100 rounded mb-1.5"></div>
        <div className="w-10 h-2 bg-gray-100 rounded mb-4"></div>
        <div className="w-full border-t border-dashed border-gray-200"></div>
        <div className="w-4 h-4 rounded-full bg-orange-100 absolute -bottom-2 -left-2"></div>
        <div className="w-4 h-4 rounded-full bg-orange-100 absolute -bottom-2 -right-2"></div>
     </div>
     <div className="absolute top-6 left-2 w-32 h-24 bg-gradient-to-br from-orange-500 to-rose-500 rounded-xl shadow-lg shadow-orange-200/50 transform -rotate-6 text-white p-4 flex flex-col justify-between transition-transform duration-500 hover:-rotate-3 hover:-translate-y-1">
         <div className="flex justify-between items-start">
           <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm"><Receipt size={16} /></div>
           <div className="font-bold text-xl tracking-tighter">5折</div>
         </div>
         <div>
            <div className="h-1.5 bg-white/30 rounded-full w-3/4 mb-1"></div>
            <div className="h-1.5 bg-white/20 rounded-full w-1/2"></div>
         </div>
     </div>
     <div className="absolute bottom-2 right-8 bg-white px-2 py-1 rounded-lg shadow-md border border-gray-50 transform rotate-12 flex items-center gap-1">
        <Percent size={10} className="text-rose-500" />
        <span className="font-bold text-[10px] text-gray-700">超值特惠</span>
     </div>
  </div>
);

const PayAtTableIllustration = () => (
  <div className="relative w-48 h-36 select-none pointer-events-none">
     <div className="absolute top-2 right-6 w-28 h-28 bg-white rounded-xl shadow-sm border border-emerald-100 transform rotate-3 p-3 flex items-center justify-center transition-transform duration-500 hover:rotate-6">
        <div className="w-full h-full border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
            <QrCode size={48} className="text-gray-300" />
        </div>
     </div>
     <div className="absolute bottom-0 left-6 w-24 h-32 bg-gray-900 rounded-[1.2rem] shadow-xl shadow-gray-200 border-[3px] border-gray-800 transform -rotate-12 overflow-hidden flex flex-col items-center justify-center transition-transform duration-500 hover:-rotate-6 hover:-translate-y-2">
         <div className="w-full h-full bg-gray-800 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent animate-scan"></div>
            <div className="w-16 h-1 bg-emerald-400 absolute top-10 shadow-[0_0_15px_#34d399]"></div>
            <ScanLine size={28} className="text-white/40" />
            <div className="absolute bottom-4 w-8 h-1 bg-gray-700 rounded-full"></div>
         </div>
     </div>
     <div className="absolute top-8 left-2 bg-white p-2 rounded-full shadow-lg border border-emerald-50 animate-bounce-slow">
         <Zap size={20} className="text-emerald-500 fill-emerald-500" />
     </div>
  </div>
);

const OrderAtTableIllustration = () => (
  <div className="relative w-48 h-36 select-none pointer-events-none">
     <div className="absolute top-4 left-4 w-36 h-28 bg-white rounded-xl shadow-sm border border-blue-100 transform -rotate-3 p-3 transition-transform duration-500 hover:rotate-0 hover:-translate-y-1">
        <div className="flex gap-2 mb-2.5 items-center">
           <div className="w-10 h-10 bg-blue-50 rounded-lg flex-shrink-0"></div>
           <div className="flex-1 space-y-1.5">
              <div className="w-14 h-2 bg-gray-100 rounded"></div>
              <div className="w-8 h-2 bg-gray-100 rounded"></div>
           </div>
           <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md shadow-blue-200 cursor-default">+</div>
        </div>
        <div className="flex gap-2 items-center opacity-50">
           <div className="w-10 h-10 bg-gray-50 rounded-lg flex-shrink-0"></div>
           <div className="flex-1 space-y-1.5">
              <div className="w-12 h-2 bg-gray-100 rounded"></div>
           </div>
        </div>
     </div>
     <div className="absolute bottom-4 right-2 bg-white px-3 py-1.5 rounded-xl shadow-lg border border-blue-50 transform rotate-6 flex items-center gap-2 transition-transform duration-500 hover:rotate-12">
        <div className="bg-blue-100 p-1 rounded-md"><Utensils size={12} className="text-blue-600" /></div>
        <span className="text-xs font-bold text-gray-700">自助点餐</span>
     </div>
  </div>
);

const BUSINESS_BANNERS: Record<BusinessType, {
  title: string;
  description: string;
  gradient: string;
  accentColor: string;
  iconColor: string;
  illustration: React.ReactNode;
  features: string[];
}> = {
  'group-buying': {
    title: '全域团购经营',
    description: '统一管理抖音、美团、快手等公域流量渠道。实现商品一键分发、库存自动同步与多门店统一核销，让流量变现更简单。',
    gradient: 'from-orange-50 via-rose-50 to-white',
    accentColor: 'text-orange-600 bg-orange-50 border-orange-100',
    iconColor: 'text-orange-600',
    illustration: <GroupBuyingIllustration />,
    features: ['多平台自动核销', '库存实时同步', '财务自动对账']
  },
  'pay-at-table': {
    title: '全场景买单',
    description: '聚合美团一键买单、抖音一键买单等支付入口。消费者扫码即付，订单直通 POS 收银系统，减少排队等待，杜绝漏单错单。',
    gradient: 'from-emerald-50 via-teal-50 to-white',
    accentColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    iconColor: 'text-emerald-600',
    illustration: <PayAtTableIllustration />,
    features: ['极速扫码落单', '会员自动识别', '防止漏单跑单']
  },
  'order-at-table': {
    title: '自助点单系统',
    description: '连接美团秒提、抖音快点等公域点单能力。支持餐前/餐后模式，释放前厅人力，提升翻台效率。',
    gradient: 'from-blue-50 via-indigo-50 to-white',
    accentColor: 'text-blue-600 bg-blue-50 border-blue-100',
    iconColor: 'text-blue-600',
    illustration: <OrderAtTableIllustration />,
    features: ['降低人工成本', '提升翻台率', '公域转私域']
  }
};

export const ChannelCenter: React.FC<ChannelCenterProps> = ({ onNavigate }) => {
  const [selectedChannelId, setSelectedChannelId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeBusiness, setActiveBusiness] = useState<BusinessType>('group-buying');
  
  const filteredChannels = CHANNELS.filter(c => 
    c.businessType === activeBusiness &&
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setSelectedChannelId('');
    setSearchTerm('');
  }, [activeBusiness]);

  const selectedChannel = CHANNELS.find(c => c.id === selectedChannelId);
  const currentBanner = BUSINESS_BANNERS[activeBusiness];

  const businessTabs: { id: BusinessType; label: string; icon: React.ReactNode }[] = [
    { id: 'group-buying', label: '团购业务', icon: <Receipt size={16} /> },
    { id: 'pay-at-table', label: '买单业务', icon: <MousePointer2 size={16} /> },
    { id: 'order-at-table', label: '点单业务', icon: <Layout size={16} /> },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F7F8FA] relative overflow-hidden">
      
      {/* Top Tab Bar - Position fixed via flex column */}
      <div className="bg-white border-b border-gray-200 px-6 pt-3 flex items-end gap-6 flex-shrink-0 z-20 shadow-sm relative">
         {businessTabs.map(tab => (
           <button
             key={tab.id}
             onClick={() => setActiveBusiness(tab.id)}
             className={`
               flex items-center gap-2 pb-3 px-2 border-b-2 transition-all font-bold text-sm
               ${activeBusiness === tab.id 
                 ? 'border-[#00C29F] text-[#00C29F]' 
                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
             `}
           >
             {tab.icon}
             {tab.label}
           </button>
         ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
         <div className="p-6 lg:p-8 w-full max-w-[1800px] mx-auto">
            
            {/* --- Banner Area: Always Full Width and Stable --- */}
            <div className="mb-8 relative rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm p-8 group">
                <div className={`absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l ${currentBanner.gradient} opacity-40 group-hover:opacity-60 transition-opacity`}></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex-1 max-w-2xl">
                      <div className="flex items-center gap-3 mb-3">
                          <h2 className="text-2xl font-bold tracking-tight text-gray-900">{currentBanner.title}</h2>
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${currentBanner.accentColor} bg-white/60 backdrop-blur-sm`}>
                              运营中心
                          </span>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6">
                          {currentBanner.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                          {currentBanner.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 shadow-sm text-xs font-bold text-gray-700 hover:border-[#00C29F]/30 hover:shadow-md transition-all">
                                  {idx === 0 ? <TrendingUp size={12} className={currentBanner.iconColor} /> : 
                                  idx === 1 ? <Clock size={12} className={currentBanner.iconColor} /> : 
                                  <Shield size={12} className={currentBanner.iconColor} />}
                                  {feature}
                              </div>
                          ))}
                      </div>
                  </div>
                  <div className="hidden md:flex flex-shrink-0 w-48 justify-center items-center">
                      {currentBanner.illustration}
                  </div>
                </div>
            </div>

            {/* --- Master-Detail Interactive Area --- */}
            <div className="flex gap-8 items-start relative overflow-visible">
                
                {/* Master: Channel List */}
                <div className={`
                    transition-all duration-500 ease-in-out flex-shrink-0
                    ${selectedChannelId ? 'w-[400px]' : 'w-full'}
                `}>
                    <div className="flex items-center justify-between mb-4 h-8">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Layers size={18} className="text-gray-400" />
                            可用渠道列表
                        </h3>
                    </div>

                    <div className={`
                        grid gap-5 transition-all duration-500
                        ${selectedChannelId ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}
                    `}>
                        {filteredChannels.length > 0 ? (
                            filteredChannels.map(channel => (
                                <ChannelGridCard 
                                    key={channel.id} 
                                    channel={channel} 
                                    isActive={selectedChannelId === channel.id}
                                    onClick={() => setSelectedChannelId(channel.id)} 
                                />
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400">
                                暂无可用渠道
                            </div>
                        )}
                    </div>
                </div>

                {/* Detail: Config Guide Panel */}
                <div className={`
                    flex-1 transition-all duration-500 ease-in-out origin-right
                    ${selectedChannelId ? 'translate-x-0 opacity-100 pointer-events-auto block' : 'translate-x-12 opacity-0 pointer-events-none hidden'}
                `}>
                    {selectedChannel && (
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sticky top-8">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">配置指引</h2>
                                    <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-2">
                                        <span className="font-bold text-gray-600">{selectedChannel.name}</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span>请按照步骤完成基础配置，配置完成后即可上线对应业务。</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setSelectedChannelId('')}
                                    className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            
                            {/* Configuration Steps */}
                            <ChannelDetailConfig 
                                channel={selectedChannel} 
                                onNavigate={onNavigate}
                            />
                        </div>
                    )}
                </div>

            </div>
         </div>
      </div>
    </div>
  );
};

// --- Subcomponents ---

const ChannelGridCard: React.FC<{ channel: Channel; isActive: boolean; onClick: () => void }> = ({ channel, isActive, onClick }) => {
    const isAuthorized = channel.status === 'authorized';
    const hasRisk = channel.id === '1' || channel.id === '6';

    return (
        <div 
          onClick={onClick}
          className={`
             group cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col relative
             ${isActive 
               ? 'bg-white border-[#00C29F] ring-2 ring-[#00C29F]/10 shadow-lg' 
               : 'bg-white border-gray-100 hover:border-[#00C29F]/30 hover:shadow-xl hover:-translate-y-0.5'}
          `}
        >
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-105
                        ${channel.platformId === 'douyin' ? 'bg-black text-white' : 
                          channel.platformId === 'meituan' ? 'bg-[#FFC300] text-black' : 'bg-gray-100 text-gray-500'}
                    `}>
                        {React.cloneElement(channel.icon as React.ReactElement<any>, { className: "w-6 h-6" })}
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                        {isAuthorized ? (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#F0FDF9] text-[#00C29F] border border-[#00C29F]/20 rounded-full text-[10px] font-bold">
                                <CheckCircle2 size={10} strokeWidth={3} />
                                已授权
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-gray-50 text-gray-400 border border-gray-200 rounded-full text-[10px] font-bold">
                                <Power size={10} strokeWidth={3} />
                                未接入
                            </span>
                        )}
                    </div>
                </div>
                
                <div className="flex items-center justify-between gap-3 mb-4">
                    <h3 className={`text-base font-bold transition-colors ${isActive ? 'text-[#00C29F]' : 'text-gray-900 group-hover:text-[#00C29F]'}`}>
                        {channel.name}
                    </h3>
                    
                    {hasRisk && (
                        <div className="animate-pulse-slow inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 border border-orange-200 px-2 py-1 rounded text-xs font-bold">
                            <AlertTriangle size={12} className="fill-orange-500 text-white" />
                            <span>配置异常：7家门店未关联</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                    {(channel.verificationScenarios || []).slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-bold bg-gray-50 text-gray-500 px-2 py-0.5 rounded border border-gray-100 group-hover:bg-white group-hover:border-gray-200 transition-colors">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00C29F]"></div>}
        </div>
    );
}

interface DetailProps {
  channel: Channel;
  onNavigate: (view: string) => void;
}

const ChannelDetailConfig: React.FC<DetailProps> = ({ channel, onNavigate }) => {
  const isAuthorized = channel.status === 'authorized';
  
  const totalStores: number = 12;
  const boundStores: number = 5;
  const isFullyBound = boundStores === totalStores;
  const unboundStores = totalStores - boundStores;
  const percentage = Math.round((boundStores/totalStores)*100);

  const tagLabel = channel.businessType === 'group-buying' ? '团购' : 
                   channel.businessType === 'pay-at-table' ? '买单' : '点单';

  return (
    <div className="space-y-6 pb-4">
      
      {/* Detail Header Summary */}
      <div className="flex items-start justify-between bg-white rounded-xl p-6 border border-gray-100 mb-6">
        <div className="flex items-center gap-5">
           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${
                channel.platformId === 'douyin' ? 'bg-black text-white' : 
                channel.platformId === 'meituan' ? 'bg-[#FFC300] text-black' : 'bg-gray-100 text-gray-400'
           }`}>
               {React.cloneElement(channel.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
           </div>
           <div>
             <div className="flex items-center gap-3">
               <h1 className="text-xl font-bold text-gray-900">{channel.name}配置</h1>
               <span className="bg-gray-100 text-gray-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                 {tagLabel}
               </span>
             </div>
             <p className="text-gray-500 text-xs mt-1.5 max-w-xl line-clamp-2 leading-relaxed">
                 {channel.description}
             </p>
           </div>
        </div>
        <a href="#" className="text-[#00C29F] text-xs font-bold flex items-center gap-1 hover:underline whitespace-nowrap bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
            接入文档 <ExternalLink size={12} />
        </a>
      </div>

      <div className="space-y-4">
          {/* STEP 1: 品牌授权 */}
          <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm group hover:border-emerald-100 transition-all">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">1. 品牌授权</h3>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed max-w-lg">
                          授权企迈SaaS平台获取您的{channel.name}企业账户权限，以实现数据同步。
                      </p>
                    </div>
                </div>
                <button className="px-4 py-2 text-xs font-bold text-white bg-[#00C29F] rounded-lg hover:bg-[#00A88D] transition-all shadow-sm shadow-emerald-100">
                    {isAuthorized ? '更新授权' : '去授权'}
                </button>
              </div>

              <div className="mt-4 ml-14">
                  {isAuthorized ? (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-[#00C29F]" />
                        <span className="text-xs text-emerald-800 font-medium">已成功授权 (有效期至 2025-12-31)</span>
                    </div>
                  ) : (
                    <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 flex items-start gap-3">
                        <AlertCircle className="text-orange-500 mt-0.5 flex-shrink-0" size={16} />
                        <span className="text-xs text-orange-800">尚未授权，请前往对应平台完成品牌资质授权。</span>
                    </div>
                  )}
              </div>
          </section>

          {/* STEP 2: 门店绑定 */}
          <section className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-sm group hover:border-emerald-100 transition-all ${!isAuthorized ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                      <Store size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">2. 门店绑定</h3>
                      <p className="text-sm text-gray-500 mt-1 max-w-lg">
                          将 SaaS 门店映射到平台 POI 门店，确保核销逻辑正确流向物理门店。
                      </p>
                    </div>
                </div>
                <button 
                    onClick={() => onNavigate('store-binding')}
                    className="px-4 py-2 text-xs font-bold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
                >
                    管理绑定
                </button>
              </div>

              <div className="mt-6 ml-14">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl font-bold text-gray-900 font-mono tracking-tighter">{percentage}%</div>
                    <div className="flex-1">
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-[#00C29F] transition-all duration-1000"
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </div>
                        <div className="mt-1 text-[10px] text-gray-400 font-medium">绑定进度: {boundStores}/{totalStores} 门店已关联</div>
                    </div>
                  </div>

                  {!isFullyBound && (
                      <div className="flex items-center justify-between bg-orange-50 border border-orange-100 rounded-lg px-4 py-2.5">
                          <div className="flex items-center gap-2">
                              <AlertTriangle size={14} className="text-orange-500" />
                              <span className="text-xs text-orange-800 font-bold">{unboundStores} 家门店尚未关联平台 POI</span>
                          </div>
                          <button onClick={() => onNavigate('store-binding')} className="text-[10px] font-bold text-white bg-orange-500 px-3 py-1 rounded shadow-sm hover:bg-orange-600">去关联</button>
                      </div>
                  )}
              </div>
          </section>

          {/* STEP 3: 团购商品绑定 */}
          <section className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative group transition-all ${!isAuthorized ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                      <LinkIcon size={20} />
                    </div>
                    <div className="flex-1 pr-20">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-gray-900">3. 团购商品绑定</h3>
                      </div>
                      <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                          将{channel.name}后台创建的团购券与SaaS收银系统中的商品进行关联。支持 <span className="font-bold text-gray-700">单品绑定、多选一(M选N)</span> 等复杂规则。
                      </p>
                    </div>
                </div>
                <div className="text-sm font-medium text-gray-600 px-4 py-1.5 border border-gray-200 rounded-lg bg-white">
                  待配置
                </div>
              </div>

              {/* Stats & Action Card inside Step 3 */}
              <div className="ml-14 mt-4 bg-[#F8F9FB] rounded-2xl border border-gray-100 p-6 flex items-center justify-between">
                  <div className="flex gap-16">
                      <div className="space-y-1">
                          <div className="text-4xl font-bold text-gray-900 font-mono tracking-tight">5</div>
                          <div className="text-xs font-bold text-gray-500">已同步商品</div>
                      </div>
                      <div className="space-y-1">
                          <div className="text-4xl font-bold text-orange-500 font-mono tracking-tight">2</div>
                          <div className="text-xs font-bold text-gray-500">待绑定配置</div>
                      </div>
                  </div>
                  <button 
                    onClick={() => onNavigate('products')}
                    className="flex items-center gap-2 px-6 py-4 bg-[#8B5CF6] text-white rounded-2xl text-base font-bold hover:bg-[#7C3AED] transition-all shadow-lg shadow-purple-100 transform active:scale-95"
                  >
                    <RefreshCcw size={20} />
                    前往配置商品
                  </button>
              </div>
          </section>

          {/* STEP 4: 下单验证 */}
          <section className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-sm group hover:border-emerald-100 transition-all ${!isAuthorized ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                    <ScanLine size={20} />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">4. 下单验证</h3>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                        配置完成后，请通过以下场景进行下单验证，确保订单能正常核销及出单：
                    </p>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {(channel.verificationScenarios || ['POS核销']).map((scenario, idx) => (
                            <div key={idx} className="bg-white rounded-lg p-3 border border-gray-100 flex items-center gap-3 hover:shadow-md hover:border-emerald-100 transition-all cursor-default">
                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-indigo-500 shadow-sm">
                                    {scenario.includes('POS') ? <Monitor size={16} /> : <Smartphone size={16} />}
                                </div>
                                <span className="text-xs font-bold text-gray-700">{scenario}</span>
                            </div>
                        ))}
                    </div>
                </div>
              </div>
          </section>
      </div>

    </div>
  );
};
