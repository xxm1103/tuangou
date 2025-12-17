import React, { useState, useMemo } from 'react';
import { MOCK_STORE_BINDINGS, CHANNELS, MOCK_PLATFORM_STORES_SOURCE } from '../constants';
import { StoreBinding as StoreBindingType, PlatformStore } from '../types';
import { 
  Search, 
  Filter, 
  Upload, 
  Sparkles, 
  Link, 
  MapPin, 
  Check,
  AlertTriangle,
  X,
  Save,
  Unlink
} from 'lucide-react';

export const StoreBinding: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('douyin');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  // Local state to manage binding changes
  const [bindings, setBindings] = useState<StoreBindingType[]>(MOCK_STORE_BINDINGS);
  
  // Modal states
  const [storeToUnbind, setStoreToUnbind] = useState<StoreBindingType | null>(null);
  const [storeToBind, setStoreToBind] = useState<StoreBindingType | null>(null);

  // Filter bindings based on platform and search
  const filteredBindings = bindings.filter(item => 
    item.platformId === selectedPlatform && 
    (item.saasStoreName.includes(searchTerm) || (item.platformStoreName || '').includes(searchTerm))
  );

  const boundCount = filteredBindings.filter(i => i.status === 'bound').length;
  const totalCount = filteredBindings.length;

  const handleSelectAll = () => {
    if (selectedItems.length === filteredBindings.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredBindings.map(i => i.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(i => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const executeUnbind = () => {
    if (!storeToUnbind) return;
    
    setBindings(prev => prev.map(item => 
      item.id === storeToUnbind.id 
        ? { ...item, status: 'unbound', platformStoreName: null, platformPoiId: null }
        : item
    ));
    setStoreToUnbind(null);
  };

  const executeBind = (poiId: string, name: string) => {
    if (!storeToBind) return;

    setBindings(prev => prev.map(item => 
      item.id === storeToBind.id 
        ? { ...item, status: 'bound', platformStoreName: name, platformPoiId: poiId }
        : item
    ));
    setStoreToBind(null);
  };

  return (
    <div className="flex-1 bg-white p-8 overflow-y-auto custom-scrollbar">
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">门店绑定管理</h1>
          <p className="text-gray-500 text-sm">管理SaaS门店与各渠道POI的映射关系，支持自动匹配与批量处理。</p>
        </div>

        {/* Channel Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-gray-100">
          {CHANNELS.filter(c => ['douyin', 'meituan', 'kuaishou'].includes(c.platformId)).map(channel => (
            <button
              key={channel.id}
              onClick={() => setSelectedPlatform(channel.platformId)}
              className={`
                px-5 py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2
                ${selectedPlatform === channel.platformId 
                  ? 'border-[#00C29F] text-[#00C29F]' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-t-lg'}
              `}
            >
              {channel.name}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#00C29F] transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="搜索SaaS门店名称或POI" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00C29F]/20 w-72 shadow-sm transition-all"
              />
            </div>
            
            <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors shadow-sm font-medium">
               <Filter size={16} />
               状态筛选
            </button>
          </div>

          <div className="flex items-center gap-3">
            {selectedItems.length > 0 && (
              <span className="text-sm text-gray-500 font-medium bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
                已选 {selectedItems.length} 项
              </span>
            )}
            
            <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:text-[#00C29F] hover:border-[#00C29F]/30 transition-colors shadow-sm font-medium">
               <Upload size={16} />
               导入关联关系
            </button>

            <button className="flex items-center gap-1.5 px-4 py-2.5 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-lg text-sm text-[#8B5CF6] hover:bg-[#8B5CF6]/20 transition-colors shadow-sm font-bold">
               <Link size={16} />
               批量关联
            </button>
            
            <button className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#00C29F] to-[#00A88D] text-white rounded-lg text-sm font-bold hover:shadow-lg hover:shadow-emerald-200 transition-all transform hover:-translate-y-0.5">
               <Sparkles size={16} className="fill-white" />
               自动匹配门店
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mb-4 text-sm">
           <div className="flex items-baseline gap-1">
              <span className="text-gray-500">门店总数</span>
              <span className="text-lg font-bold text-gray-900">{totalCount}</span>
           </div>
           <div className="flex items-baseline gap-1">
              <span className="text-gray-500">已关联</span>
              <span className="text-lg font-bold text-[#00C29F]">{boundCount}</span>
           </div>
           <div className="flex items-baseline gap-1">
              <span className="text-gray-500">未关联</span>
              <span className="text-lg font-bold text-orange-500">{totalCount - boundCount}</span>
           </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 w-14">
                  <input 
                    type="checkbox" 
                    checked={selectedItems.length === filteredBindings.length && filteredBindings.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-[#00C29F] focus:ring-[#00C29F]" 
                  />
                </th>
                <th className="px-6 py-4">SaaS门店信息</th>
                <th className="px-6 py-4">绑定状态</th>
                <th className="px-6 py-4">平台POI信息</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredBindings.map((store) => (
                <tr key={store.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      checked={selectedItems.includes(store.id)}
                      onChange={() => handleToggleSelect(store.id)}
                      className="rounded border-gray-300 text-[#00C29F] focus:ring-[#00C29F]" 
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{store.saasStoreName}</div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                       <MapPin size={10} />
                       {store.address}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {store.status === 'bound' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-600 border border-green-100">
                        <Check size={10} strokeWidth={3} /> 已绑定
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-50 text-orange-600 border border-orange-100">
                        <Unlink size={10} strokeWidth={3} /> 未绑定
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {store.status === 'bound' ? (
                       <div>
                         <div className="font-medium text-gray-900">{store.platformStoreName}</div>
                         <div className="text-xs text-gray-400 font-mono mt-0.5">POI: {store.platformPoiId}</div>
                       </div>
                    ) : (
                       <div className="text-gray-400 text-xs italic">
                         暂无关联 POI
                       </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {store.status === 'bound' ? (
                       <button 
                         onClick={() => setStoreToUnbind(store)}
                         className="text-gray-400 hover:text-red-500 font-medium text-xs px-3 py-1.5 hover:bg-red-50 rounded transition-colors"
                       >
                          解绑
                       </button>
                    ) : (
                       <button 
                         onClick={() => setStoreToBind(store)}
                         className="text-[#00C29F] hover:text-[#00A88D] font-bold text-xs px-3 py-1.5 bg-[#00C29F]/5 hover:bg-[#00C29F]/15 rounded transition-colors"
                       >
                          去关联
                       </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredBindings.length === 0 && (
                <tr>
                   <td colSpan={5} className="py-12 text-center text-gray-400">
                      没有找到符合条件的门店
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Unbind Alert Modal */}
      {storeToUnbind && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
            <div className="p-6">
               <div className="flex items-start gap-4">
                 <div className="bg-red-100 p-3 rounded-full flex-shrink-0">
                    <AlertTriangle className="text-red-600" size={24} />
                 </div>
                 <div>
                   <h3 className="text-lg font-bold text-gray-900">确定要解除绑定吗？</h3>
                   <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                     解除与 <span className="font-bold text-gray-800">{storeToUnbind.saasStoreName}</span> 的关联后，该门店将无法进行团购核销，已售出的券码可能无法正常使用。
                   </p>
                 </div>
               </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
               <button 
                 onClick={() => setStoreToUnbind(null)}
                 className="px-4 py-2 text-sm font-bold text-gray-600 hover:bg-white hover:shadow-sm rounded-lg transition-all"
               >
                 取消
               </button>
               <button 
                 onClick={executeUnbind}
                 className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md shadow-red-200 transition-all"
               >
                 确认解绑
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Bind Config Modal */}
      {storeToBind && (
        <BindModal 
          store={storeToBind} 
          onClose={() => setStoreToBind(null)} 
          onConfirm={executeBind} 
        />
      )}

    </div>
  );
};

// Subcomponent for Binding
const BindModal: React.FC<{ 
  store: StoreBindingType; 
  onClose: () => void; 
  onConfirm: (poiId: string, name: string) => void 
}> = ({ store, onClose, onConfirm }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState<PlatformStore | null>(null);

  // Filter available platform stores based on current store's platform ID and search term
  const availableStores = MOCK_PLATFORM_STORES_SOURCE.filter(ps => 
    ps.platformId === store.platformId &&
    (ps.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     ps.poiId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col h-[600px]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 flex-shrink-0">
          <div>
            <h3 className="text-lg font-bold text-gray-900">关联平台门店</h3>
            <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">SaaS门店:</span>
                <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">{store.saasStoreName}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        {/* Search */}
        <div className="p-4 border-b border-gray-50 bg-white">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="输入平台门店名称或 POI ID 搜索"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00C29F]/20 focus:border-[#00C29F] transition-all"
              />
           </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            <div className="space-y-1">
                {availableStores.length > 0 ? (
                    availableStores.map(item => (
                        <div 
                            key={item.poiId}
                            onClick={() => setSelectedStore(item)}
                            className={`
                                flex items-center justify-between p-4 rounded-xl cursor-pointer border transition-all
                                ${selectedStore?.poiId === item.poiId 
                                    ? 'bg-[#F0FDF9] border-[#00C29F] shadow-sm' 
                                    : 'bg-white border-transparent hover:bg-gray-50 border-gray-100'}
                            `}
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h4 className={`text-sm font-bold ${selectedStore?.poiId === item.poiId ? 'text-[#004D40]' : 'text-gray-900'}`}>
                                        {item.name}
                                    </h4>
                                    {selectedStore?.poiId === item.poiId && <Check size={14} className="text-[#00C29F]" strokeWidth={3} />}
                                </div>
                                <div className="flex items-center gap-4 mt-1">
                                    <span className="text-xs text-gray-400 font-mono">ID: {item.poiId}</span>
                                    <span className="text-xs text-gray-400 truncate max-w-[200px]">{item.address}</span>
                                </div>
                            </div>
                            <div className={`
                                w-5 h-5 rounded-full border flex items-center justify-center
                                ${selectedStore?.poiId === item.poiId 
                                    ? 'border-[#00C29F] bg-[#00C29F] text-white' 
                                    : 'border-gray-300 bg-white'}
                            `}>
                                {selectedStore?.poiId === item.poiId && <Check size={12} strokeWidth={3} />}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-gray-400">
                        <Search size={32} className="mb-2 opacity-20" />
                        <p className="text-sm">未找到匹配的平台门店</p>
                    </div>
                )}
            </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100 flex-shrink-0">
           <button 
             onClick={onClose}
             className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-white hover:shadow-sm rounded-lg transition-all"
           >
             取消
           </button>
           <button 
             onClick={() => selectedStore && onConfirm(selectedStore.poiId, selectedStore.name)}
             disabled={!selectedStore}
             className="px-5 py-2.5 text-sm font-bold text-white bg-[#00C29F] hover:bg-[#00A88D] rounded-lg shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:shadow-none transition-all flex items-center gap-2"
           >
             <Save size={16} />
             确认关联
           </button>
        </div>
      </div>
    </div>
  );
}