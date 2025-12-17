import React from 'react';
import { MOCK_REDEMPTIONS } from '../constants';
import { RedemptionRecord } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Search, Filter, Download, Video, MapPin } from 'lucide-react';

export const RedemptionRecords: React.FC = () => {
  // Simple data aggregation for the chart
  const chartData = [
    { name: '05-10', count: 12 },
    { name: '05-11', count: 19 },
    { name: '05-12', count: 15 },
    { name: '05-13', count: 22 },
    { name: '05-14', count: 28 },
    { name: '05-15', count: 18 },
    { name: '05-16', count: 25 },
  ];

  return (
    <div className="flex-1 bg-white p-8 overflow-y-auto custom-scrollbar">
      <div className="w-full">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">核销记录</h1>
            <p className="text-gray-500 text-sm mt-1">查看所有渠道的券码核销详情、状态及退款记录。</p>
          </div>
          <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm">
                  <Download size={16} />
                  导出报表
              </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="col-span-1 lg:col-span-3 bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <h3 className="text-sm font-bold text-gray-700 mb-6">近7日核销趋势</h3>
              <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} barSize={40}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fontSize: 12, fill: '#9ca3af'}} 
                            dy={10}
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fontSize: 12, fill: '#9ca3af'}} 
                          />
                          <Tooltip 
                              cursor={{fill: '#f9fafb'}}
                              contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} 
                          />
                          <Bar dataKey="count" fill="#00C29F" radius={[6, 6, 0, 0]} />
                      </BarChart>
                  </ResponsiveContainer>
              </div>
          </div>
          <div className="col-span-1 flex flex-col gap-6">
               <div className="bg-gradient-to-br from-[#00C29F] to-[#00A88D] p-6 rounded-2xl shadow-lg shadow-emerald-100 text-white flex-1 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
                  <span className="text-emerald-100 text-sm font-medium relative z-10">今日核销金额</span>
                  <div className="text-3xl font-bold mt-2 font-mono relative z-10">¥4,285.00</div>
                  <div className="text-xs text-emerald-100 mt-2 flex items-center relative z-10 bg-white/20 w-fit px-2 py-1 rounded-lg">
                      +12.5% <span className="opacity-80 ml-1">较昨日</span>
                  </div>
               </div>
               <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex-1 flex flex-col justify-center">
                  <span className="text-gray-500 text-sm font-medium">总核销单量</span>
                  <div className="text-3xl font-bold text-gray-900 mt-2 font-mono">1,024</div>
               </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-gray-50 p-1.5 rounded-xl border border-gray-100 flex flex-wrap gap-2 items-center mb-6 w-fit">
          <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#00C29F] transition-colors" size={16} />
              <input 
                  type="text" 
                  placeholder="搜索订单号/券码" 
                  className="pl-9 pr-4 py-2 bg-white border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00C29F]/20 w-64 shadow-sm transition-all"
              />
          </div>
          <div className="h-6 w-px bg-gray-200 mx-2"></div>
          <select className="px-3 py-2 border-none rounded-lg text-sm bg-transparent text-gray-600 focus:outline-none hover:bg-white hover:shadow-sm cursor-pointer transition-all">
              <option>所有渠道</option>
              <option>抖音</option>
              <option>美团</option>
          </select>
          <select className="px-3 py-2 border-none rounded-lg text-sm bg-transparent text-gray-600 focus:outline-none hover:bg-white hover:shadow-sm cursor-pointer transition-all">
              <option>所有状态</option>
              <option>核销成功</option>
              <option>核销失败</option>
              <option>已退款</option>
          </select>
          <button className="px-3 py-2 text-gray-500 hover:text-gray-900 text-sm hover:bg-white hover:shadow-sm rounded-lg transition-all ml-2">
              <Filter size={16} />
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/50 text-gray-500 font-medium">
                  <tr>
                  <th className="px-6 py-4 whitespace-nowrap">订单编号 / 券码</th>
                  <th className="px-4 py-4 whitespace-nowrap">商品名称</th>
                  <th className="px-4 py-4 text-center whitespace-nowrap">渠道</th>
                  <th className="px-4 py-4 text-center whitespace-nowrap">券码类型</th>
                  <th className="px-4 py-4 whitespace-nowrap">订单类型</th>
                  <th className="px-4 py-4 whitespace-nowrap">核销方式</th>
                  <th className="px-4 py-4 whitespace-nowrap">核销金额</th>
                  <th className="px-4 py-4 whitespace-nowrap">核销时间</th>
                  <th className="px-4 py-4 whitespace-nowrap">核销门店</th>
                  <th className="px-6 py-4 text-center whitespace-nowrap">状态</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                  {MOCK_REDEMPTIONS.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="px-6 py-4">
                          <div className="font-bold text-gray-900">{record.orderNo}</div>
                          <div className="text-xs text-gray-400 font-mono mt-0.5 group-hover:text-[#00C29F] transition-colors">{record.couponCode}</div>
                      </td>
                      <td className="px-4 py-4 text-gray-700 max-w-xs truncate font-medium">{record.productName}</td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                               record.platform === '抖音' ? 'bg-black text-white' : 'bg-[#FFC300] text-black'
                           }`}>
                              {record.platform === '抖音' ? <Video size={14} /> : <MapPin size={14} />}
                           </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center">
                          <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold ${
                              record.couponType === 'platform' 
                              ? 'bg-blue-50 text-blue-600' 
                              : 'bg-orange-50 text-orange-600'
                          }`}>
                              {record.couponType === 'platform' ? '平台券' : '商家券'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-gray-600 text-sm whitespace-nowrap">{record.orderType}</td>
                      <td className="px-4 py-4 text-gray-600 text-sm whitespace-nowrap">{record.verificationMethod}</td>
                      <td className="px-4 py-4 font-mono font-bold text-gray-800">¥{record.amount}</td>
                      <td className="px-4 py-4 text-gray-400 text-xs whitespace-nowrap">{record.redeemTime}</td>
                      <td className="px-4 py-4 text-gray-600 whitespace-nowrap">{record.storeName}</td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                          <StatusBadge status={record.status} />
                      </td>
                  </tr>
                  ))}
              </tbody>
              </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-50 flex justify-between items-center text-sm text-gray-500">
              <span>显示 1-20 条，共 1,024 条</span>
              <div className="flex gap-2">
                  <button className="px-4 py-1.5 border border-gray-200 rounded-full hover:bg-gray-50 disabled:opacity-50 transition-colors" disabled>上一页</button>
                  <button className="px-4 py-1.5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">下一页</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: RedemptionRecord['status'] }) => {
    switch (status) {
        case 'success':
            return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600">核销成功</span>;
        case 'failed':
            return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600">失败</span>;
        case 'refunded':
            return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-500">已退款</span>;
    }
};