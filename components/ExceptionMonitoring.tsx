import React, { useState } from 'react';
import { MOCK_EXCEPTION_RECORDS } from '../constants';
import { ExceptionRecord } from '../types';
import { 
  AlertOctagon, 
  Search, 
  Filter, 
  RefreshCw, 
  Video, 
  MapPin, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';

export const ExceptionMonitoring: React.FC = () => {
  const [records, setRecords] = useState<ExceptionRecord[]>(MOCK_EXCEPTION_RECORDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pending' | 'resolved'>('pending');

  const pendingCount = records.filter(r => r.status !== 'resolved').length;
  const resolvedCount = records.filter(r => r.status === 'resolved').length;

  const filteredRecords = records.filter(record => {
    const matchSearch = record.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.couponCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus = activeTab === 'pending' 
        ? record.status !== 'resolved'
        : record.status === 'resolved';

    return matchSearch && matchStatus;
  });

  const handleRetry = async (id: string) => {
    setLoadingId(id);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setRecords(prev => prev.map(record => {
      if (record.id === id) {
        // Mock 50/50 success chance for demo
        const isSuccess = Math.random() > 0.5;
        if (isSuccess) {
          return { ...record, status: 'resolved' };
        } else {
          return { ...record, retryCount: record.retryCount + 1 };
        }
      }
      return record;
    }));
    
    setLoadingId(null);
  };

  return (
    <div className="flex-1 bg-white p-8 overflow-y-auto custom-scrollbar">
      <div className="w-full">
        <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">异常监控</h1>
                <span className="bg-red-50 text-red-600 border border-red-100 px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                    <AlertOctagon size={12} />
                    商家券核销异常
                </span>
            </div>
            <p className="text-gray-500 text-sm">
                监控在SaaS系统已成功核销（顾客已消费），但同步至平台失败的订单。请及时重试，以免影响商家结算。
            </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-red-50 to-white border border-red-100 p-6 rounded-2xl shadow-sm flex items-center justify-between">
                <div>
                    <div className="text-sm font-bold text-red-800 mb-1">待处理异常</div>
                    <div className="text-3xl font-mono font-bold text-gray-900">{pendingCount}</div>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                    <AlertTriangle size={24} />
                </div>
            </div>
            <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex items-center justify-between">
                <div>
                    <div className="text-sm font-bold text-gray-500 mb-1">累计已修复</div>
                    <div className="text-3xl font-mono font-bold text-gray-900">{resolvedCount}</div>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                    <CheckCircle2 size={24} />
                </div>
            </div>
            <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex items-center justify-between">
                <div>
                    <div className="text-sm font-bold text-gray-500 mb-1">自动重试次数</div>
                    <div className="text-3xl font-mono font-bold text-gray-900">148</div>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <RefreshCw size={24} />
                </div>
            </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-6 mb-6 border-b border-gray-100">
            <button 
                onClick={() => setActiveTab('pending')}
                className={`pb-3 text-sm font-bold transition-all border-b-2 ${
                    activeTab === 'pending' 
                    ? 'border-[#00C29F] text-[#00C29F]' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
                待处理异常 ({pendingCount})
            </button>
            <button 
                onClick={() => setActiveTab('resolved')}
                className={`pb-3 text-sm font-bold transition-all border-b-2 ${
                    activeTab === 'resolved' 
                    ? 'border-[#00C29F] text-[#00C29F]' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
                已修复记录 ({resolvedCount})
            </button>
        </div>

        {/* Toolbar */}
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#00C29F] transition-colors" size={16} />
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="搜索订单号或券码" 
                        className="pl-9 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00C29F]/20 w-72 shadow-sm transition-all"
                    />
                </div>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors shadow-sm font-medium">
                    <Filter size={16} />
                    筛选
                </button>
            </div>
            
            <button className="text-sm text-[#00C29F] font-bold hover:underline flex items-center gap-1">
                查看异常处理文档 <ArrowRight size={14} />
            </button>
        </div>

        {/* List */}
        <div className="space-y-4">
            {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                    <div 
                        key={record.id} 
                        className={`
                            bg-white border rounded-xl p-5 shadow-sm transition-all
                            ${record.status === 'resolved' ? 'border-gray-100' : 'border-red-100 hover:shadow-md hover:border-red-200'}
                        `}
                    >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            {/* Left: Info */}
                            <div className="flex-1">
                                <div className="flex items-start gap-4">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                        record.platform === 'douyin' ? 'bg-black text-white' : 
                                        record.platform === 'alipay' ? 'bg-blue-500 text-white' :
                                        'bg-[#FFC300] text-black'
                                    }`}>
                                        {record.platform === 'douyin' ? <Video size={18} /> : 
                                         record.platform === 'alipay' ? <CreditCard size={18} /> :
                                         <MapPin size={18} />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className={`font-bold ${record.status === 'resolved' ? 'text-gray-700' : 'text-gray-900'}`}>
                                                {record.productName}
                                            </span>
                                            <span className="text-xs font-mono text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                                                {record.couponCode}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <MapPin size={12} />
                                                {record.storeName}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={12} />
                                                {record.redeemTime}
                                            </span>
                                            <span className="font-mono text-gray-400">
                                                ID: {record.orderNo}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Middle: Error / Success Status */}
                            <div className="flex-1 lg:max-w-md">
                                {record.status === 'resolved' ? (
                                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg w-fit">
                                        <CheckCircle2 size={16} />
                                        <div>
                                            <span className="text-sm font-bold block">已修复成功</span>
                                            {record.errorMsg && <span className="text-xs text-green-600/70 block mt-0.5">原原因: {record.errorMsg.split('-')[0]}</span>}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                                        <div className="flex items-start gap-2">
                                            <AlertTriangle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <div className="text-sm font-bold text-red-700">同步失败</div>
                                                <div className="text-xs text-red-600 mt-1 leading-relaxed">
                                                    {record.errorMsg}
                                                </div>
                                                {record.retryCount > 0 && (
                                                    <div className="mt-2 text-[10px] font-bold text-red-400 uppercase tracking-wide">
                                                        已自动重试 {record.retryCount} 次
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Right: Action */}
                            <div className="flex items-center justify-end">
                                {record.status !== 'resolved' ? (
                                    <button 
                                        onClick={() => handleRetry(record.id)}
                                        disabled={loadingId === record.id}
                                        className={`
                                            flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all
                                            ${loadingId === record.id 
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                                : 'bg-[#00C29F] text-white hover:bg-[#00A88D] shadow-lg shadow-emerald-100 hover:shadow-emerald-200 transform hover:-translate-y-0.5'}
                                        `}
                                    >
                                        <RefreshCw size={16} className={loadingId === record.id ? 'animate-spin' : ''} />
                                        {loadingId === record.id ? '同步中...' : '重试同步'}
                                    </button>
                                ) : (
                                     <div className="text-xs text-gray-400 font-medium px-4 py-2">
                                        无需操作
                                     </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <CheckCircle2 size={48} className="text-gray-300 mb-4" />
                    <h3 className="text-lg font-bold text-gray-900">暂无{activeTab === 'pending' ? '待处理' : '已修复'}记录</h3>
                    <p className="text-gray-500 text-sm mt-1">
                        {activeTab === 'pending' ? '系统运行正常，所有核销均已同步。' : '暂无历史修复记录。'}
                    </p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

// Add missing icon for Alipay
function CreditCard(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
      </svg>
    )
}