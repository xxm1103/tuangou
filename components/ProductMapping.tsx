
import React, { useState, useMemo } from 'react';
import { MOCK_GROUP_BUY_PRODUCTS, POS_ITEMS, MOCK_STORE_BINDINGS, MOCK_PLATFORM_STORES_SOURCE, MOCK_MERCHANT_PRODUCTS, MOCK_COUPON_TEMPLATES, CHANNELS } from '../constants';
import { BindType, GroupBuyProduct, PosItem, MerchantProduct, CouponTemplate } from '../types';
import { Check, Edit2, Link, Save, X, Plus, Search, Layers, ListChecks, Ban, UtensilsCrossed, ArrowRight, Trash2, Filter, Store, AlertTriangle, Eye, AlertCircle, Sparkles, Ticket, ScanLine, ArrowRightLeft, CheckCircle2, Upload, FileSpreadsheet, Cloud, User, Clock, ArrowLeftRight, ChevronRight } from 'lucide-react';

export const ProductMapping: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'platform' | 'merchant'>('platform');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewingStoreId, setViewingStoreId] = useState<string | null>(null);
  const [editingMerchantProductId, setEditingMerchantProductId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [channelFilter, setChannelFilter] = useState<string>('all');

  // State for data (mocking updates)
  const [platformProducts, setPlatformProducts] = useState<GroupBuyProduct[]>(MOCK_GROUP_BUY_PRODUCTS);
  const [merchantProducts, setMerchantProducts] = useState<MerchantProduct[]>(MOCK_MERCHANT_PRODUCTS);

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleClose = () => {
    setEditingId(null);
  };
  
  const handleViewStores = (id: string) => {
    setViewingStoreId(id);
  };
  
  const handleCloseStores = () => {
    setViewingStoreId(null);
  };

  // Merchant Coupon Actions
  const handleEditMerchantBinding = (id: string) => {
    setEditingMerchantProductId(id);
  };

  const handleSaveMerchantBinding = (productId: string, templateId: string) => {
    setMerchantProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, boundTemplateId: templateId } : p
    ));
    setEditingMerchantProductId(null);
  };

  // Filter Logic
  const filteredPlatformProducts = platformProducts.filter(p => {
    if (channelFilter === 'all') return true;
    // Simple mapping for demo; in real app rely on p.platformId
    return p.platform === (channelFilter === 'douyin' ? '抖音' : channelFilter === 'meituan' ? '美团' : channelFilter === 'kuaishou' ? '快手' : p.platform);
  });

  const filteredMerchantProducts = merchantProducts.filter(p => {
    if (channelFilter === 'all') return true;
    return p.platform === (channelFilter === 'douyin' ? '抖音' : channelFilter === 'meituan' ? '美团' : channelFilter === 'alipay' ? '支付宝' : p.platform);
  });

  // Helper to check store binding status
  const getStoreStats = (product: GroupBuyProduct) => {
    let storesToCheck: { poiId: string, name: string }[] = [];
    
    // Determine the list of platform stores this product applies to
    if (product.applyRange === 'ALL') {
        // Find platform ID based on platform name (Mock logic, ideally product has platformId)
        const platformId = product.platform === '抖音' ? 'douyin' : 'meituan';
        storesToCheck = MOCK_PLATFORM_STORES_SOURCE.filter(ps => ps.platformId === platformId);
    } else {
        storesToCheck = product.applicableStores || [];
    }
    
    if (storesToCheck.length === 0) {
        return { total: 0, unbound: 0 };
    }
    
    const unboundCount = storesToCheck.filter(store => {
        // Check if this POI is bound in our system
        const binding = MOCK_STORE_BINDINGS.find(
            b => b.platformPoiId === store.poiId && b.status === 'bound'
        );
        return !binding; // If not found, it's unbound/risk
    }).length;
    
    return {
        total: storesToCheck.length,
        unbound: unboundCount
    };
  };

  // Add Product Handler
  const handleAddProduct = (newProduct: any) => {
      const now = new Date().toLocaleString();
      if (activeTab === 'platform') {
          setPlatformProducts(prev => [{
              id: `new-p-${Date.now()}`,
              name: newProduct.name,
              platform: newProduct.platformName,
              originalPrice: newProduct.price, // simple mapping
              salePrice: newProduct.price,
              bindType: BindType.ALL_APPLICABLE,
              targetItemIds: [],
              applyRange: 'ALL',
              source: 'manual',
              updateTime: now,
              platformProductId: newProduct.platformProductId
          }, ...prev]);
      } else {
          setMerchantProducts(prev => [{
              id: `new-m-${Date.now()}`,
              name: newProduct.name,
              platform: newProduct.platformName,
              salePrice: newProduct.price,
              boundTemplateId: null,
              source: 'manual',
              updateTime: now,
              platformProductId: newProduct.platformProductId
          }, ...prev]);
      }
      setIsAddModalOpen(false);
  };

  return (
    <div className="flex-1 bg-white p-8 overflow-y-auto custom-scrollbar">
      <div className="w-full">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">团购商品绑定</h1>
            <p className="text-gray-500 text-sm">配置多渠道团购商品与内部系统的映射关系，确保订单自动流转与核销。</p>
          </div>
          <div className="flex gap-3">
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-white text-gray-700 border border-gray-200 px-4 py-2.5 rounded-full text-sm font-bold hover:bg-gray-50 transition shadow-sm flex items-center gap-2"
              >
                <Plus size={16} strokeWidth={3} />
                手动新增
              </button>
              <button className="bg-white text-gray-700 border border-gray-200 px-4 py-2.5 rounded-full text-sm font-bold hover:bg-gray-50 transition shadow-sm flex items-center gap-2">
                <FileSpreadsheet size={16} />
                Excel导入
              </button>
              <button className="bg-[#00C29F] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#00A88D] transition shadow-lg shadow-emerald-100 flex items-center gap-2">
                <Cloud size={18} />
                一键同步
              </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-8 border-b border-gray-100 mb-6">
            <button 
                onClick={() => setActiveTab('platform')}
                className={`pb-3 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${
                    activeTab === 'platform' 
                    ? 'border-[#00C29F] text-[#00C29F]' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
                平台券绑定
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                    {platformProducts.length}
                </span>
            </button>
            <button 
                onClick={() => setActiveTab('merchant')}
                className={`pb-3 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${
                    activeTab === 'merchant' 
                    ? 'border-[#00C29F] text-[#00C29F]' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
                商家券绑定
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                    {merchantProducts.length}
                </span>
            </button>
        </div>

        {/* Channel Filter Bar */}
        <div className="flex items-center gap-2 mb-4">
             {['all', 'douyin', 'meituan', 'kuaishou', 'alipay'].map(channel => {
                 const labels: Record<string, string> = { all: '全部渠道', douyin: '抖音', meituan: '美团', kuaishou: '快手', alipay: '支付宝' };
                 return (
                     <button
                        key={channel}
                        onClick={() => setChannelFilter(channel)}
                        className={`
                            px-3 py-1.5 text-xs font-bold rounded-full border transition-all
                            ${channelFilter === channel 
                                ? 'bg-[#00C29F]/10 text-[#00C29F] border-[#00C29F]' 
                                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
                        `}
                     >
                         {labels[channel]}
                     </button>
                 );
             })}
        </div>

        {activeTab === 'platform' ? (
            /* ================= PLATFORM COUPON TABLE ================= */
            <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
             
             {/* Platform Coupon Explanation */}
             <div className="p-5 bg-gradient-to-r from-blue-50/80 to-white border-b border-blue-100 flex items-start gap-4">
                 <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl mt-0.5 shadow-sm border border-blue-200">
                    <ScanLine size={20} />
                 </div>
                 <div>
                    <h4 className="text-sm font-bold text-blue-900 flex items-center gap-2">
                        平台券模式
                        <span className="text-[10px] bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded border border-blue-300">核销平台码</span>
                    </h4>
                    <div className="text-xs text-blue-800 mt-2 leading-relaxed space-y-1">
                        <p><span className="font-bold">场景说明：</span>顾客在平台购买后，获得由<span className="font-bold underline decoration-blue-400 decoration-2 underline-offset-2">平台生成</span>的核销码。</p>
                        <p><span className="font-bold">核销逻辑：</span>收银员扫平台码核销 -> 系统将【平台商品】解析为【POS点单商品】 -> 自动出餐。</p>
                        <p><span className="font-bold">您的操作：</span>请在下方配置 N选M、单品映射等规则，以便系统知道该团购商品对应POS机上的哪些菜品。</p>
                    </div>
                 </div>
             </div>

            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                <tr>
                    <th className="px-6 py-5">商品名称 / 来源</th>
                    <th className="px-6 py-5">渠道</th>
                    <th className="px-6 py-5 text-right">售卖价</th>
                    <th className="px-6 py-5">适用门店</th>
                    <th className="px-6 py-5">绑定类型</th>
                    <th className="px-6 py-5">关联商品数</th>
                    <th className="px-6 py-5 text-right">操作</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                {filteredPlatformProducts.map((product) => {
                    const stats = getStoreStats(product);
                    return (
                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 py-5">
                            <div className="font-bold text-gray-900">{product.name}</div>
                            <div className="flex items-center gap-2 mt-1">
                                {product.source === 'sync' ? (
                                    <span className="inline-flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100" title="自动同步">
                                        <Cloud size={10} /> 自动同步
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 text-[10px] bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded border border-orange-100" title="手动创建">
                                        <User size={10} /> 手动创建
                                    </span>
                                )}
                                <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                                    <Clock size={10} /> {product.updateTime}
                                </span>
                            </div>
                        </td>
                        <td className="px-6 py-5">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                            product.platform === '抖音' ? 'bg-black text-white' : 
                            product.platform === '快手' ? 'bg-orange-500 text-white' :
                            'bg-[#FFC300] text-black'
                            }`}>
                            {product.platform}
                            </span>
                        </td>
                        <td className="px-6 py-5 text-right font-mono text-gray-600 font-medium">¥{product.salePrice}</td>
                        <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                                {product.applyRange === 'ALL' ? (
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-gray-900">全部门店</span>
                                        <span className="text-gray-400 text-xs">({stats.total}家)</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold text-gray-900">{stats.total}</span>
                                        <span className="text-gray-500 text-xs">家</span>
                                    </div>
                                )}
                                
                                {stats.unbound > 0 && (
                                    <div className="flex items-center gap-1.5 text-orange-700 bg-orange-50 px-2 py-1 rounded text-xs font-bold" title={`${stats.unbound} 家门店未关联`}>
                                        <AlertTriangle size={12} className="text-orange-500" />
                                        <span>{stats.unbound} 未关联</span>
                                    </div>
                                )}
                                
                                <button 
                                    onClick={() => handleViewStores(product.id)}
                                    className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                                    title="查看门店明细"
                                >
                                    <Eye size={16} />
                                </button>
                            </div>
                        </td>
                        <td className="px-6 py-5">
                            <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                                product.bindType === BindType.M_CHOOSE_N ? 'bg-orange-50 text-orange-600' :
                                product.bindType === BindType.EXCLUDE_ITEMS ? 'bg-red-50 text-red-600' :
                                product.bindType === BindType.SPECIFIC_ITEMS ? 'bg-blue-50 text-blue-600' :
                                'bg-green-50 text-green-600'
                            }`}>
                            {product.bindType === BindType.M_CHOOSE_N ? 'M选N套餐' : 
                            product.bindType === BindType.EXCLUDE_ITEMS ? '排除特定' : 
                            product.bindType === BindType.SPECIFIC_ITEMS ? '指定商品' : '全场通用'}
                            </span>
                        </td>
                        <td className="px-6 py-5 text-gray-500">
                            {product.bindType === BindType.ALL_APPLICABLE ? (
                                <span className="text-gray-400 text-xs">全部</span>
                            ) : (
                                <div className="flex items-center gap-1">
                                <span className="font-bold text-gray-700">{product.targetItemIds.length}</span>
                                <span className="text-xs">个</span>
                                </div>
                            )}
                        </td>
                        <td className="px-6 py-5 text-right">
                            <button 
                            onClick={() => handleEdit(product.id)}
                            className="text-[#00C29F] hover:text-[#00A88D] font-bold inline-flex items-center gap-1.5 text-xs px-4 py-2 bg-[#00C29F]/5 hover:bg-[#00C29F]/10 rounded-full transition-all"
                            >
                            <Edit2 size={12} />
                            配置规则
                            </button>
                        </td>
                    </tr>
                    );
                })}
                {filteredPlatformProducts.length === 0 && (
                     <tr>
                        <td colSpan={7} className="text-center py-10 text-gray-400 text-sm">暂无符合条件的商品</td>
                     </tr>
                )}
                </tbody>
            </table>
            </div>
        ) : (
            /* ================= MERCHANT COUPON TABLE ================= */
            <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
                
                {/* Merchant Coupon Explanation */}
                <div className="p-5 bg-gradient-to-r from-purple-50/80 to-white border-b border-purple-100 flex items-start gap-4">
                     <div className="p-2.5 bg-purple-100 text-purple-600 rounded-xl mt-0.5 shadow-sm border border-purple-200">
                        <Ticket size={20} />
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-purple-900 flex items-center gap-2">
                            商家券模式
                            <span className="text-[10px] bg-purple-200 text-purple-800 px-1.5 py-0.5 rounded border border-purple-300">核销企迈券</span>
                        </h4>
                        <div className="text-xs text-purple-800 mt-2 leading-relaxed space-y-1">
                            <p><span className="font-bold">场景说明：</span>顾客在平台购买团购商品后，系统将自动向其会员账户<span className="font-bold underline decoration-purple-400 decoration-2 underline-offset-2">发放一张企迈SaaS券</span>。</p>
                            <p><span className="font-bold">核销逻辑：</span>顾客出示<span className="font-bold">企迈会员码/券码</span>核销 -> 核销成功后系统自动同步状态给平台。</p>
                            <p><span className="font-bold">您的操作：</span>请在下方将【平台商品】与【企迈SaaS券模板】进行绑定，以便购买时发放正确的券。</p>
                        </div>
                     </div>
                </div>

                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-5">商品名称 / 来源</th>
                            <th className="px-6 py-5">渠道</th>
                            <th className="px-6 py-5 text-right">售卖价</th>
                            <th className="px-6 py-5">绑定状态</th>
                            <th className="px-6 py-5">关联券模板</th>
                            <th className="px-6 py-5 text-right">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredMerchantProducts.map((product) => {
                             const boundTemplate = MOCK_COUPON_TEMPLATES.find(t => t.id === product.boundTemplateId);
                             
                             // Smart recommendation logic
                             const recommendedTemplate = !boundTemplate 
                                ? MOCK_COUPON_TEMPLATES.find(t => 
                                    // Extremely simple fuzzy match: if template name shares 2+ chars with product name
                                    // Real world would use better algorithms
                                    product.name.includes(t.name.substring(0, 2)) || t.name.includes(product.name.substring(0, 2))
                                  )
                                : null;

                             return (
                                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="font-bold text-gray-900">{product.name}</div>
                                        <div className="flex items-center gap-2 mt-1">
                                            {product.source === 'sync' ? (
                                                <span className="inline-flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100" title="自动同步">
                                                    <Cloud size={10} /> 自动同步
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-[10px] bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded border border-orange-100" title="手动创建">
                                                    <User size={10} /> 手动创建
                                                </span>
                                            )}
                                            <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                                                <Clock size={10} /> {product.updateTime}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                                            product.platform === '抖音' ? 'bg-black text-white' : 
                                            product.platform === '支付宝' ? 'bg-blue-600 text-white' :
                                            'bg-[#FFC300] text-black'
                                        }`}>
                                            {product.platform}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right font-mono text-gray-600 font-medium">¥{product.salePrice}</td>
                                    <td className="px-6 py-5">
                                        {boundTemplate ? (
                                            <span className="inline-flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-1 rounded-md text-xs font-bold border border-green-100">
                                                <Check size={12} strokeWidth={3} />
                                                已绑定
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 text-orange-600 bg-orange-50 px-2 py-1 rounded-md text-xs font-bold border border-orange-100">
                                                <Link size={12} />
                                                待绑定
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-5">
                                        {boundTemplate ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded bg-pink-50 text-pink-500 flex items-center justify-center border border-pink-100 font-bold text-xs">
                                                    券
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-800 text-sm">{boundTemplate.name}</div>
                                                    <div className="text-xs text-gray-400">ID: {boundTemplate.id}</div>
                                                </div>
                                            </div>
                                        ) : recommendedTemplate ? (
                                             <div className="flex items-center gap-2 bg-purple-50 p-2 rounded-lg border border-dashed border-purple-200 w-fit">
                                                 <Sparkles size={14} className="text-purple-500" />
                                                 <span className="text-xs text-purple-700 font-medium">推荐: {recommendedTemplate.name}</span>
                                             </div>
                                        ) : (
                                            <span className="text-gray-300 text-xs italic">暂无关联</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button 
                                            onClick={() => handleEditMerchantBinding(product.id)}
                                            className="text-[#00C29F] hover:text-[#00A88D] font-bold inline-flex items-center gap-1.5 text-xs px-4 py-2 bg-[#00C29F]/5 hover:bg-[#00C29F]/10 rounded-full transition-all"
                                        >
                                            <Link size={12} />
                                            {boundTemplate ? '更换模板' : '关联模板'}
                                        </button>
                                    </td>
                                </tr>
                             );
                        })}
                        {filteredMerchantProducts.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-gray-400 text-sm">暂无符合条件的商品</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )}

        {/* ================= MODALS ================= */}

        {/* Add Product Modal */}
        {isAddModalOpen && (
            <AddProductModal 
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleAddProduct}
            />
        )}

        {/* Existing Product Binding Configuration Modal (Platform Coupons) */}
        {editingId && (
          <BindingModal 
            product={platformProducts.find(p => p.id === editingId)!} 
            onClose={handleClose} 
          />
        )}
        
        {/* Store Details Modal */}
        {viewingStoreId && (
            <StoreDetailModal
                product={platformProducts.find(p => p.id === viewingStoreId)!}
                onClose={handleCloseStores}
            />
        )}

        {/* Merchant Template Binding Modal */}
        {editingMerchantProductId && (
            <TemplateBindingModal
                product={merchantProducts.find(p => p.id === editingMerchantProductId)!}
                onClose={() => setEditingMerchantProductId(null)}
                onSave={handleSaveMerchantBinding}
            />
        )}
      </div>
    </div>
  );
};

/* ================= NEW COMPONENT: Add Product Modal ================= */
interface AddProductModalProps {
    onClose: () => void;
    onSave: (data: any) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        platformName: '抖音',
        platformProductId: '',
        name: '',
        price: ''
    });

    const handleSubmit = () => {
        if (!formData.name || !formData.platformProductId) return;
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900">手动新增团购商品</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-6 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">所属渠道 <span className="text-red-500">*</span></label>
                        <select 
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00C29F]"
                            value={formData.platformName}
                            onChange={e => setFormData({...formData, platformName: e.target.value})}
                        >
                            {CHANNELS.filter(c => ['douyin', 'kuaishou', 'meituan', 'alipay', 'xiaohongshu'].includes(c.platformId)).map(c => (
                                <option key={c.id} value={c.name}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">平台商品 ID <span className="text-red-500">*</span></label>
                        <input 
                            type="text" 
                            placeholder="请输入第三方平台商品 ID"
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00C29F]"
                            value={formData.platformProductId}
                            onChange={e => setFormData({...formData, platformProductId: e.target.value})}
                        />
                        <p className="text-xs text-gray-400">请登录渠道商家后台查看商品详情获取 ID</p>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">商品名称 <span className="text-red-500">*</span></label>
                        <input 
                            type="text" 
                            placeholder="请输入商品名称"
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00C29F]"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">售卖价格</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">¥</span>
                            <input 
                                type="number" 
                                placeholder="0.00"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:border-[#00C29F]"
                                value={formData.price}
                                onChange={e => setFormData({...formData, price: e.target.value})}
                            />
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                    <button 
                        onClick={onClose}
                        className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                    >
                        取消
                    </button>
                    <button 
                        onClick={handleSubmit}
                        disabled={!formData.name || !formData.platformProductId}
                        className="px-5 py-2.5 text-sm font-bold text-white bg-[#00C29F] hover:bg-[#00A88D] rounded-lg shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:shadow-none transition-all"
                    >
                        确认新增
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ================= NEW COMPONENT: Template Binding Modal ================= */

interface TemplateBindingModalProps {
    product: MerchantProduct;
    onClose: () => void;
    onSave: (productId: string, templateId: string) => void;
}

const TemplateBindingModal: React.FC<TemplateBindingModalProps> = ({ product, onClose, onSave }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(product.boundTemplateId || null);

    // Smart recommendation logic (same as in table)
    const recommendedTemplate = useMemo(() => {
        if (product.boundTemplateId) return null; // Don't recommend if already bound (conceptually)
        return MOCK_COUPON_TEMPLATES.find(t => 
             product.name.includes(t.name.substring(0, 2)) || t.name.includes(product.name.substring(0, 2))
        );
    }, [product]);

    // Apply recommendation if not manually selected yet and recommendation exists
    React.useEffect(() => {
        if (!selectedTemplateId && recommendedTemplate) {
            setSelectedTemplateId(recommendedTemplate.id);
        }
    }, []); // Run once on mount

    const filteredTemplates = MOCK_COUPON_TEMPLATES.filter(t => 
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        t.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col h-[70vh]">
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 flex-shrink-0">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">关联 SaaS 券模板</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">团购商品:</span>
                            <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">{product.name}</span>
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
                            placeholder="搜索券模板名称或 ID"
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00C29F]/20 focus:border-[#00C29F] transition-all"
                        />
                    </div>
                </div>

                {/* Recommendation Banner */}
                {recommendedTemplate && !searchTerm && (
                    <div className="px-4 py-2 bg-purple-50 border-b border-purple-100 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <Sparkles size={14} className="text-purple-600" fill="currentColor" />
                             <span className="text-xs font-bold text-purple-800">智能推荐: 根据商品名称为您匹配到 "{recommendedTemplate.name}"</span>
                         </div>
                         {selectedTemplateId !== recommendedTemplate.id && (
                             <button 
                                onClick={() => setSelectedTemplateId(recommendedTemplate.id)}
                                className="text-xs text-purple-600 hover:text-purple-800 font-bold underline"
                             >
                                 选中推荐
                             </button>
                         )}
                    </div>
                )}

                {/* List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-2 bg-gray-50/30">
                    <div className="space-y-2">
                        {filteredTemplates.map(template => {
                            const isSelected = selectedTemplateId === template.id;
                            const isRecommended = recommendedTemplate?.id === template.id;

                            return (
                                <div 
                                    key={template.id}
                                    onClick={() => setSelectedTemplateId(template.id)}
                                    className={`
                                        flex items-center justify-between p-4 rounded-xl cursor-pointer border transition-all relative overflow-hidden
                                        ${isSelected
                                            ? 'bg-white border-[#00C29F] shadow-md shadow-emerald-50 ring-1 ring-[#00C29F]/10' 
                                            : 'bg-white border-transparent hover:border-gray-200 shadow-sm'}
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`
                                            w-12 h-12 rounded-lg flex flex-col items-center justify-center border font-bold text-xs flex-shrink-0
                                            ${template.type === 'cash' ? 'bg-orange-50 text-orange-600 border-orange-100' : 
                                              template.type === 'discount' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                              'bg-pink-50 text-pink-600 border-pink-100'}
                                        `}>
                                            {template.type === 'cash' ? '代金' : template.type === 'discount' ? '折扣' : '兑换'}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className={`text-sm font-bold ${isSelected ? 'text-gray-900' : 'text-gray-800'}`}>
                                                    {template.name}
                                                </h4>
                                                {isRecommended && (
                                                    <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-bold">推荐</span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-xs text-gray-400 font-mono bg-gray-50 px-1.5 rounded">ID: {template.id}</span>
                                                <span className="text-xs text-gray-500">
                                                    {template.type === 'cash' ? `面值 ¥${template.faceValue}` : 
                                                     template.type === 'discount' ? `${Number(template.faceValue)*10}折` : 
                                                     `兑换: ${template.faceValue}`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <div className="text-xs text-gray-400">库存</div>
                                            <div className="text-xs font-mono font-bold text-gray-700">{template.stock}</div>
                                        </div>
                                        <div className={`
                                            w-5 h-5 rounded-full border flex items-center justify-center transition-colors
                                            ${isSelected 
                                                ? 'border-[#00C29F] bg-[#00C29F] text-white' 
                                                : 'border-gray-300 bg-white'}
                                        `}>
                                            {isSelected && <Check size={12} strokeWidth={3} />}
                                        </div>
                                    </div>
                                    
                                    {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00C29F]"></div>}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-end gap-3 flex-shrink-0">
                    <button 
                        onClick={onClose}
                        className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-lg transition-all"
                    >
                        取消
                    </button>
                    <button 
                        onClick={() => selectedTemplateId && onSave(product.id, selectedTemplateId)}
                        disabled={!selectedTemplateId}
                        className="px-5 py-2.5 text-sm font-bold text-white bg-[#00C29F] hover:bg-[#00A88D] rounded-lg shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:shadow-none transition-all flex items-center gap-2"
                    >
                        <Save size={16} />
                        确认绑定
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ================= EXISTING HELPERS & MODALS (Platform Logic) ================= */

interface BindingModalProps {
  product: GroupBuyProduct;
  onClose: () => void;
}

const BindingModal: React.FC<BindingModalProps> = ({ product, onClose }) => {
  const [bindType, setBindType] = useState<BindType>(product.bindType);
  const [mValue, setMValue] = useState<number>(product.mValue || 1);
  const [selectedItems, setSelectedItems] = useState<string[]>(product.targetItemIds || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Derive categories
  const categories = ['All', ...Array.from(new Set(POS_ITEMS.map(i => i.category)))];

  const filteredItems = POS_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedItemObjects = POS_ITEMS.filter(item => selectedItems.includes(item.id));

  const toggleItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(i => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleRemove = (id: string) => {
      setSelectedItems(selectedItems.filter(i => i !== id));
  };

  const handleClearAll = () => {
      setSelectedItems([]);
  };

  const handleSave = () => {
    // In a real app, dispatch an update action here
    console.log('Saving binding for', product.id, { bindType, mValue, selectedItems });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 flex-shrink-0 bg-white z-10">
          <div>
            <h3 className="text-xl font-bold text-gray-900">配置团购券规则</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500">商品:</span>
              <span className="text-sm font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">{product.name}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Configuration Section (Fixed Top) */}
        <div className="px-8 py-6 bg-white border-b border-gray-100">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-gray-700 w-20 flex-shrink-0">绑定模式</span>
                    <div className="flex gap-3">
                        {[
                            { type: BindType.ALL_APPLICABLE, label: '全场通用', desc: '任意商品可用' },
                            { type: BindType.SPECIFIC_ITEMS, label: '指定商品', desc: '仅限选中的商品' },
                            { type: BindType.M_CHOOSE_N, label: 'M选N套餐', desc: '任选N件' },
                            { type: BindType.EXCLUDE_ITEMS, label: '排除特定', desc: '除选中外可用' }
                        ].map((option) => (
                            <button
                                key={option.type}
                                onClick={() => setBindType(option.type)}
                                className={`
                                    px-4 py-2.5 rounded-lg border text-left min-w-[140px] transition-all
                                    ${bindType === option.type 
                                        ? 'bg-[#F0FDF9] border-[#00C29F] text-[#004D40] ring-1 ring-[#00C29F]/30' 
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}
                                `}
                            >
                                <div className="text-sm font-bold flex items-center gap-2">
                                    {option.label}
                                    {bindType === option.type && <CheckCircle2 size={14} className="text-[#00C29F]" />}
                                </div>
                                <div className="text-xs opacity-70 mt-0.5 font-normal">{option.desc}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {bindType === BindType.M_CHOOSE_N && (
                    <div className="flex items-center gap-4 animate-in fade-in slide-in-from-top-1">
                        <span className="text-sm font-bold text-gray-700 w-20 flex-shrink-0">任选数量</span>
                        <div className="flex items-center gap-3 bg-orange-50 px-4 py-2 rounded-lg border border-orange-100">
                            <span className="text-sm text-orange-800 font-medium">顾客可任选</span>
                            <div className="flex items-center bg-white rounded-md border border-orange-200">
                                <button 
                                    onClick={() => setMValue(Math.max(1, mValue - 1))}
                                    className="px-2.5 py-1 text-orange-600 hover:bg-orange-50 transition-colors border-r border-orange-100"
                                >
                                    -
                                </button>
                                <input 
                                    type="text" 
                                    value={mValue}
                                    readOnly
                                    className="w-10 text-center text-sm font-bold text-gray-900 focus:outline-none py-1"
                                />
                                <button 
                                    onClick={() => setMValue(mValue + 1)}
                                    className="px-2.5 py-1 text-orange-600 hover:bg-orange-50 transition-colors border-l border-orange-100"
                                >
                                    +
                                </button>
                            </div>
                            <span className="text-sm text-orange-800 font-medium">件商品</span>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Dual Pane Item Selection */}
        {bindType !== BindType.ALL_APPLICABLE ? (
            <div className="flex-1 overflow-hidden grid grid-cols-2 bg-gray-50/50">
                
                {/* Left Pane: Source List */}
                <div className="flex flex-col border-r border-gray-200 h-full bg-white">
                    <div className="p-4 border-b border-gray-100 bg-white space-y-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            <input 
                                type="text" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="搜索商品名称、ID..."
                                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00C29F]/20 focus:border-[#00C29F]"
                            />
                        </div>
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`
                                        px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors
                                        ${selectedCategory === cat 
                                            ? 'bg-gray-900 text-white' 
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                                    `}
                                >
                                    {cat === 'All' ? '全部' : cat}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-2">
                        <div className="space-y-1">
                            {filteredItems.map(item => {
                                const isSelected = selectedItems.includes(item.id);
                                return (
                                    <div 
                                        key={item.id}
                                        onClick={() => toggleItem(item.id)}
                                        className={`
                                            flex items-center p-3 rounded-lg cursor-pointer border transition-all group
                                            ${isSelected 
                                                ? 'bg-[#F0FDF9] border-[#00C29F]/30 opacity-60 grayscale-[0.3]' 
                                                : 'bg-white border-gray-100 hover:border-[#00C29F]/50 hover:shadow-sm'}
                                        `}
                                    >
                                        <div className={`
                                            w-5 h-5 rounded border mr-3 flex items-center justify-center transition-colors flex-shrink-0
                                            ${isSelected ? 'bg-[#00C29F] border-[#00C29F]' : 'bg-white border-gray-300 group-hover:border-[#00C29F]'}
                                        `}>
                                            {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <div className="text-sm font-medium text-gray-900 truncate pr-2">{item.name}</div>
                                                <div className="text-sm font-bold text-gray-900 whitespace-nowrap">¥{item.price}</div>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] text-gray-400 font-mono bg-gray-50 px-1 rounded">{item.id}</span>
                                                <span className="text-[10px] text-gray-500 bg-gray-50 px-1 rounded">{item.category}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {filteredItems.length === 0 && (
                                <div className="text-center py-10 text-gray-400 text-sm">
                                    未找到匹配商品
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Pane: Selected List */}
                <div className="flex flex-col h-full bg-gray-50/30">
                    <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between h-[88px]">
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">已选商品</h4>
                            <div className="text-xs text-gray-500 mt-1">共 {selectedItems.length} 项</div>
                        </div>
                        {selectedItems.length > 0 && (
                            <button 
                                onClick={handleClearAll}
                                className="text-xs text-red-500 hover:text-red-700 font-medium px-3 py-1.5 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                清空全部
                            </button>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto p-2">
                        {selectedItems.length > 0 ? (
                            <div className="space-y-2">
                                {selectedItemObjects.map(item => (
                                    <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-sm group">
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-bold text-gray-900 truncate">{item.name}</div>
                                            <div className="text-xs text-gray-500 mt-0.5">¥{item.price} · {item.category}</div>
                                        </div>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handleRemove(item.id); }}
                                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                                <ListChecks size={40} className="mb-3" />
                                <p className="text-sm">请从左侧选择商品</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-gray-50/30">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Layers size={32} className="text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">全场通用模式</h3>
                <p className="text-sm text-gray-500 max-w-sm text-center">
                    在此模式下，该券可用于抵扣门店内任意商品，无需指定特定菜品。
                </p>
            </div>
        )}

        {/* Footer */}
        <div className="px-8 py-4 bg-white border-t border-gray-100 flex justify-end gap-3 z-10">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-lg transition-all"
          >
            取消
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2.5 text-sm font-bold text-white bg-[#00C29F] hover:bg-[#00A88D] rounded-lg shadow-lg shadow-emerald-200 transition-all flex items-center gap-2"
          >
            <Save size={18} />
            保存配置
          </button>
        </div>
      </div>
    </div>
  );
};

interface StoreDetailModalProps {
  product: GroupBuyProduct;
  onClose: () => void;
}

const StoreDetailModal: React.FC<StoreDetailModalProps> = ({ product, onClose }) => {
  // Logic to determine stores
  let displayedStores: { name: string; status: 'bound' | 'unbound'; address?: string }[] = [];

  if (product.applyRange === 'ALL') {
      // Mock logic: get all stores for platform
      const platformId = product.platform === '抖音' ? 'douyin' : 'meituan';
      const stores = MOCK_PLATFORM_STORES_SOURCE.filter(ps => ps.platformId === platformId);
      displayedStores = stores.map(s => {
          const isBound = MOCK_STORE_BINDINGS.some(b => b.platformPoiId === s.poiId && b.status === 'bound');
          return {
              name: s.name,
              status: isBound ? 'bound' : 'unbound',
              address: s.address
          };
      });
  } else {
      displayedStores = (product.applicableStores || []).map(s => {
           // Check binding status
           const isBound = MOCK_STORE_BINDINGS.some(b => b.platformPoiId === s.poiId && b.status === 'bound');
           return {
               name: s.name,
               status: isBound ? 'bound' : 'unbound'
           };
      });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col h-[60vh]">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 flex-shrink-0">
          <div>
             <h3 className="text-lg font-bold text-gray-900">适用门店明细</h3>
             <div className="flex items-center gap-2 mt-1">
               <span className="text-xs text-gray-500">共 {displayedStores.length} 家门店</span>
               <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">{product.name}</span>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <div className="space-y-2">
                {displayedStores.map((store, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div>
                            <div className="text-sm font-bold text-gray-900">{store.name}</div>
                            {store.address && <div className="text-xs text-gray-400 mt-0.5">{store.address}</div>}
                        </div>
                        {store.status === 'bound' ? (
                            <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">已关联</span>
                        ) : (
                            <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded flex items-center gap-1">
                                <AlertTriangle size={10} /> 未关联
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
