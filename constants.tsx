
import React from 'react';
import { Channel, PosItem, RedemptionRecord, GroupBuyProduct, BindType, StoreBinding, PlatformStore, ExceptionRecord, CouponTemplate, MerchantProduct } from './types';
import { 
  Video, ShoppingBag, MapPin, CreditCard, 
  ShoppingCart, Smartphone, Camera, 
  Utensils, Zap, ScanLine
} from 'lucide-react';

export const CHANNELS: Channel[] = [
  // --- Group Buying (团购业务) ---
  {
    id: '1',
    name: '抖音(企业券)',
    platformId: 'douyin',
    category: 'social',
    status: 'authorized',
    icon: <Video className="w-5 h-5 text-white" />,
    description: '小程序在装修上架后实现在抖音平台售卖商品。售卖的商品以会员资产的形式发放，支持企迈微信/支付宝/抖音小程序多渠道核销。',
    businessType: 'group-buying',
    verificationScenarios: ['POS收银机核销', '小程序自助核销', '商家APP核销']
  },
  {
    id: '2',
    name: '快手',
    platformId: 'kuaishou',
    category: 'social',
    status: 'unauthorized',
    icon: <Camera className="w-5 h-5 text-white" />,
    description: '快手团购业务对接，支持视频挂载POI核销。',
    businessType: 'group-buying',
    verificationScenarios: ['POS收银机核销', '商家APP核销']
  },
  {
    id: '3',
    name: '小红书',
    platformId: 'xiaohongshu',
    category: 'social',
    status: 'unauthorized',
    icon: <Smartphone className="w-5 h-5 text-white" />,
    description: '连接小红书店铺，实现种草到交易的闭环。',
    businessType: 'group-buying',
    verificationScenarios: ['POS收银机核销']
  },
  {
    id: '4',
    name: '支付宝',
    platformId: 'alipay',
    category: 'local-life',
    status: 'unauthorized',
    icon: <CreditCard className="w-5 h-5 text-white" />,
    description: '支付宝公域流量对接，支付即会员能力支持。',
    businessType: 'group-buying',
    verificationScenarios: ['POS收银机核销', '小程序自助核销']
  },
  {
    id: '5',
    name: '淘宝',
    platformId: 'taobao',
    category: 'e-commerce',
    status: 'unauthorized',
    icon: <ShoppingBag className="w-5 h-5 text-white" />,
    description: '淘宝天猫本地生活券码对接。',
    businessType: 'group-buying',
    verificationScenarios: ['POS收银机核销']
  },
  {
    id: '6',
    name: '美团团购',
    platformId: 'meituan',
    category: 'local-life',
    status: 'authorized',
    icon: <MapPin className="w-5 h-5 text-white" />,
    description: '美团点评团购券对接，支持多门店统一核销。',
    businessType: 'group-buying',
    verificationScenarios: ['POS收银机核销', '商家APP核销']
  },
  {
    id: '7',
    name: '京东到家',
    platformId: 'jd',
    category: 'e-commerce',
    status: 'unauthorized',
    icon: <ShoppingCart className="w-5 h-5 text-white" />,
    description: '京东生态本地生活服务对接。',
    businessType: 'group-buying',
    verificationScenarios: ['POS收银机核销']
  },

  // --- Pay at Table (买单业务) ---
  {
    id: 'pay-1',
    name: '抖音一键买单',
    platformId: 'douyin',
    category: 'social',
    status: 'unauthorized',
    icon: <Video className="w-5 h-5 text-white" />,
    description: '抖音一键买单对接，实现桌面扫码或POI页面的快速结账功能。',
    businessType: 'pay-at-table',
    verificationScenarios: ['POS支付', '自动核销']
  },
  {
    id: 'pay-2',
    name: '美团一键买单',
    platformId: 'meituan',
    category: 'local-life',
    status: 'unauthorized',
    icon: <MapPin className="w-5 h-5 text-white" />,
    description: '美团一键买单服务，连接美团店铺与线下收银，提升买单效率。',
    businessType: 'pay-at-table',
    verificationScenarios: ['POS支付', '自动核销']
  },

  // --- Order at Table (点单业务) ---
  {
    id: 'order-1',
    name: '美团秒提',
    platformId: 'meituan',
    category: 'local-life',
    status: 'unauthorized',
    icon: <MapPin className="w-5 h-5 text-white" />,
    description: '美团秒提业务对接，支持用户在美团侧完成即时点单与支付，订单直通POS。',
    businessType: 'order-at-table',
    verificationScenarios: ['自动接单', 'POS核销']
  },
  {
    id: 'order-2',
    name: '抖音快点',
    platformId: 'douyin',
    category: 'social',
    status: 'unauthorized',
    icon: <Video className="w-5 h-5 text-white" />,
    description: '抖音快点业务对接，支持短视频/直播间挂载快速下单入口。',
    businessType: 'order-at-table',
    verificationScenarios: ['自动接单', 'POS核销']
  }
];

export const POS_ITEMS: PosItem[] = [
  { id: 'p1', name: '招牌珍珠奶茶 (L)', price: 18, category: '饮品' },
  { id: 'p2', name: '满杯红柚 (L)', price: 22, category: '饮品' },
  { id: 'p3', name: '芝士莓莓 (L)', price: 28, category: '饮品' },
  { id: 'p4', name: '多肉葡萄 (L)', price: 28, category: '饮品' },
  { id: 'p5', name: '奥利奥波波 (M)', price: 24, category: '饮品' },
  { id: 'p6', name: '原味蛋挞', price: 8, category: '小吃' },
  { id: 'p7', name: '香辣鸡翅', price: 12, category: '小吃' },
  { id: 'p8', name: '生椰拿铁', price: 18, category: '咖啡' },
  { id: 'p9', name: '美式咖啡', price: 15, category: '咖啡' },
  { id: 'p10', name: '焦糖玛奇朵', price: 22, category: '咖啡' },
  { id: 'p11', name: '杨枝甘露', price: 25, category: '果茶' },
  { id: 'p12', name: '草莓圣代', price: 12, category: '冰淇淋' },
  { id: 'p13', name: '抹茶甜筒', price: 6, category: '冰淇淋' },
  { id: 'p14', name: '黑森林蛋糕', price: 28, category: '烘焙' },
  { id: 'p15', name: '牛角包', price: 15, category: '烘焙' },
  { id: 'p16', name: '鸡肉沙拉', price: 32, category: '轻食' },
  { id: 'p17', name: '品牌马克杯', price: 58, category: '周边' },
  { id: 'p18', name: '中秋礼盒', price: 188, category: '礼盒' },
  { id: 'p19', name: '四季春', price: 12, category: '纯茶' },
  { id: 'p20', name: '茉莉绿茶', price: 12, category: '纯茶' },
  { id: 'p21', name: '加料-波霸', price: 2, category: '加料' },
  { id: 'p22', name: '加料-椰果', price: 2, category: '加料' },
  { id: 'p23', name: '夏季限定西瓜桶', price: 38, category: '季节限定' },
];

export const MOCK_GROUP_BUY_PRODUCTS: GroupBuyProduct[] = [
  {
    id: 'gb1',
    platformProductId: 'DY-PROD-001',
    name: '抖音99元双人下午茶套餐',
    platform: '抖音',
    originalPrice: 156,
    salePrice: 99,
    bindType: BindType.M_CHOOSE_N,
    targetItemIds: ['p1', 'p2', 'p3', 'p4'],
    mValue: 2,
    applyRange: 'PARTIAL',
    applicableStores: [
      { poiId: 'DOUYIN-SH001', name: '人民广场旗舰店' }, // Bound
      { poiId: 'DOUYIN-HZ002', name: '西湖文化广场店' }, // Bound
      { poiId: 'DOUYIN-GZ005', name: '天河城总店' },    // Bound
      { poiId: 'DOUYIN-NEW-001', name: '上海五角场万达店' } // Unbound (Risk)
    ],
    source: 'sync',
    updateTime: '2024-05-20 10:00:00'
  },
  {
    id: 'gb2',
    platformProductId: 'MT-PROD-888',
    name: '美团50元代金券',
    platform: '美团',
    originalPrice: 50,
    salePrice: 45,
    bindType: BindType.EXCLUDE_ITEMS,
    targetItemIds: ['p6', 'p7'],
    applyRange: 'ALL', // Indicates all stores are applicable
    applicableStores: [], // Will be ignored or can be populated if needed by logic
    source: 'sync',
    updateTime: '2024-05-21 14:30:00'
  },
  {
    id: 'gb3',
    platformProductId: 'KS-MANUAL-001',
    name: '快手1元甜筒秒杀',
    platform: '快手',
    originalPrice: 6,
    salePrice: 1,
    bindType: BindType.SPECIFIC_ITEMS,
    targetItemIds: ['p13'],
    applyRange: 'ALL',
    applicableStores: [],
    source: 'manual',
    updateTime: '2024-05-22 09:15:00'
  }
];

// --- Merchant Coupon Mock Data ---

export const MOCK_COUPON_TEMPLATES: CouponTemplate[] = [
  { id: 't1', name: '99元双人套餐兑换券', type: 'exchange', faceValue: '商品兑换', stock: 9999 },
  { id: 't2', name: '50元全场通用代金券', type: 'cash', faceValue: 50, stock: 5000 },
  { id: 't3', name: '全场饮品8折券', type: 'discount', faceValue: 0.8, stock: 2000 },
  { id: 't4', name: '新品生椰拿铁兑换券', type: 'exchange', faceValue: '单品兑换', stock: 100 },
  { id: 't5', name: '100元满减券', type: 'cash', faceValue: 100, stock: 300 },
];

export const MOCK_MERCHANT_PRODUCTS: MerchantProduct[] = [
  {
    id: 'mp1',
    platformProductId: 'DY-M-001',
    name: '抖音99元双人套餐券',
    platform: '抖音',
    salePrice: 99,
    boundTemplateId: 't1', // Already bound
    source: 'sync',
    updateTime: '2024-05-20 10:00:00'
  },
  {
    id: 'mp2',
    platformProductId: 'MT-M-002',
    name: '美团50元代金券',
    platform: '美团',
    salePrice: 45,
    boundTemplateId: null, // Unbound
    source: 'sync',
    updateTime: '2024-05-21 15:00:00'
  },
  {
    id: 'mp3',
    platformProductId: 'ALI-M-003',
    name: '支付宝生椰拿铁1杯',
    platform: '支付宝',
    salePrice: 9.9,
    boundTemplateId: null, // Unbound, matches 't4' by name similarity
    source: 'manual',
    updateTime: '2024-05-22 11:20:00'
  }
];


export const MOCK_REDEMPTIONS: RedemptionRecord[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `R-${1000 + i}`,
  orderNo: `ORDER202405${1000 + i}`,
  couponCode: `Code-${Math.floor(Math.random() * 100000)}`,
  productName: i % 3 === 0 ? '抖音99元双人套餐' : '美团50元代金券',
  platform: i % 3 === 0 ? '抖音' : '美团',
  storeName: i % 2 === 0 ? '上海人民广场店' : '北京三里屯店',
  redeemTime: `2024-05-${10 + (i % 20)} 14:${10 + i}`,
  status: i === 0 ? 'failed' : i === 4 ? 'refunded' : 'success',
  amount: i % 3 === 0 ? 99 : 45,
  couponType: i % 2 === 0 ? 'platform' : 'merchant',
  verificationMethod: i % 3 === 0 ? 'POS核销' : (i % 3 === 1 ? '小程序自助核销' : '商家APP核销'),
  orderType: i % 4 === 0 ? '堂食订单' : (i % 4 === 1 ? '小程序堂食订单' : (i % 4 === 2 ? '买单订单' : '平台外卖订单')),
}));

export const MOCK_STORE_BINDINGS: StoreBinding[] = [
  { id: 's1', saasStoreName: '上海人民广场店', platformStoreName: '人民广场旗舰店', platformPoiId: 'DOUYIN-SH001', status: 'bound', platformId: 'douyin', address: '上海市黄浦区南京西路100号' },
  { id: 's2', saasStoreName: '北京三里屯店', platformStoreName: null, platformPoiId: null, status: 'unbound', platformId: 'douyin', address: '北京市朝阳区三里屯路19号' },
  { id: 's3', saasStoreName: '杭州西湖店', platformStoreName: '西湖文化广场店', platformPoiId: 'DOUYIN-HZ002', status: 'bound', platformId: 'douyin', address: '杭州市西湖区北山路' },
  { id: 's4', saasStoreName: '深圳万象城店', platformStoreName: null, platformPoiId: null, status: 'unbound', platformId: 'douyin', address: '深圳市罗湖区宝安南路1881号' },
  { id: 's5', saasStoreName: '广州天河城店', platformStoreName: '天河城总店', platformPoiId: 'DOUYIN-GZ005', status: 'bound', platformId: 'douyin', address: '广州市天河区天河路208号' },
  { id: 's6', saasStoreName: '南京新街口店', platformStoreName: null, platformPoiId: null, status: 'unbound', platformId: 'douyin', address: '南京市秦淮区中山南路1号' },
  { id: 's7', saasStoreName: '成都IFS店', platformStoreName: '成都IFS旗舰店', platformPoiId: 'MT-CD001', status: 'bound', platformId: 'meituan', address: '成都市锦江区红星路三段1号' },
  { id: 's8', saasStoreName: '武汉光谷店', platformStoreName: null, platformPoiId: null, status: 'unbound', platformId: 'meituan', address: '武汉市洪山区光谷步行街' },
];

export const MOCK_PLATFORM_STORES_SOURCE: PlatformStore[] = [
  { poiId: 'DOUYIN-SH001', name: '人民广场旗舰店', address: '上海市黄浦区南京西路100号', platformId: 'douyin' },
  { poiId: 'DOUYIN-BJ002', name: '北京三里屯概念店', address: '北京市朝阳区三里屯路19号', platformId: 'douyin' },
  { poiId: 'DOUYIN-HZ002', name: '西湖文化广场店', address: '杭州市西湖区北山路', platformId: 'douyin' },
  { poiId: 'DOUYIN-SZ003', name: '深圳万象城店', address: '深圳市罗湖区宝安南路1881号', platformId: 'douyin' },
  { poiId: 'DOUYIN-GZ005', name: '天河城总店', address: '广州市天河区天河路208号', platformId: 'douyin' },
  { poiId: 'DOUYIN-NJ006', name: '南京新街口店', address: '南京市秦淮区中山南路1号', platformId: 'douyin' },
  { poiId: 'MT-CD001', name: '成都IFS旗舰店', address: '成都市锦江区红星路三段1号', platformId: 'meituan' },
  { poiId: 'MT-WH002', name: '武汉光谷店', address: '武汉市洪山区光谷步行街', platformId: 'meituan' },
  { poiId: 'MT-TEST-001', name: '测试门店001', address: '测试地址', platformId: 'meituan' },
  { poiId: 'DOUYIN-TEST-001', name: '测试门店ABC', address: '测试地址', platformId: 'douyin' },
];

export const MOCK_EXCEPTION_RECORDS: ExceptionRecord[] = [
  {
    id: 'e1',
    orderNo: 'ORDER20240520001',
    couponCode: 'Code-882910',
    productName: '抖音99元双人套餐',
    platform: 'douyin',
    storeName: '上海人民广场店',
    redeemTime: '2024-05-20 14:30:00',
    errorMsg: '平台接口响应超时 (Timeout) - 建议检查网络或稍后重试',
    status: 'pending',
    retryCount: 0
  },
  {
    id: 'e2',
    orderNo: 'ORDER20240520005',
    couponCode: 'Code-332190',
    productName: '美团50元代金券',
    platform: 'meituan',
    storeName: '北京三里屯店',
    redeemTime: '2024-05-20 15:12:00',
    errorMsg: '签名验证失败 (Invalid Signature) - 请检查授权状态',
    status: 'pending',
    retryCount: 2
  },
  {
    id: 'e3',
    orderNo: 'ORDER20240521008',
    couponCode: 'Code-112233',
    productName: '抖音99元双人套餐',
    platform: 'douyin',
    storeName: '杭州西湖店',
    redeemTime: '2024-05-21 10:05:00',
    errorMsg: '平台服务暂时不可用 (Service Unavailable)',
    status: 'pending',
    retryCount: 1
  },
  {
    id: 'e4',
    orderNo: 'ORDER20240522011',
    couponCode: 'Code-445566',
    productName: '美团100元代金券',
    platform: 'meituan',
    storeName: '成都IFS店',
    redeemTime: '2024-05-22 18:30:00',
    errorMsg: '无效的券码状态 (Invalid Status) - 平台侧已退款?',
    status: 'pending',
    retryCount: 0
  },
  {
    id: 'e5',
    orderNo: 'ORDER20240519099',
    couponCode: 'Code-778899',
    productName: '支付宝5元红包',
    platform: 'alipay',
    storeName: '上海人民广场店',
    redeemTime: '2024-05-19 12:00:00',
    errorMsg: '网络超时 - 自动重试成功',
    status: 'resolved',
    retryCount: 1
  },
  {
    id: 'e6',
    orderNo: 'ORDER20240518001',
    couponCode: 'Code-112200',
    productName: '抖音99元双人套餐',
    platform: 'douyin',
    storeName: '南京新街口店',
    redeemTime: '2024-05-18 10:30:00',
    errorMsg: '系统繁忙 - 手动重试成功',
    status: 'resolved',
    retryCount: 3
  }
];
