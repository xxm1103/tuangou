import React from 'react';

// Channel Types
export interface Channel {
  id: string;
  name: string;
  platformId: 'douyin' | 'kuaishou' | 'meituan' | 'alipay' | 'taobao' | 'jd' | 'xiaohongshu' | 'eleme';
  category: 'social' | 'e-commerce' | 'local-life';
  status: 'authorized' | 'unauthorized';
  icon: React.ReactNode;
  description: string;
  businessType: 'group-buying';
  verificationScenarios?: string[];
}

// Product Binding Types
export enum BindType {
  ALL_APPLICABLE = 'ALL_APPLICABLE',
  SPECIFIC_ITEMS = 'SPECIFIC_ITEMS',
  M_CHOOSE_N = 'M_CHOOSE_N',
  EXCLUDE_ITEMS = 'EXCLUDE_ITEMS'
}

export interface PosItem {
  id: string;
  name: string;
  price: number;
  category: string;
}

// Platform Coupon Product (Existing logic)
export interface GroupBuyProduct {
  id: string;
  platformProductId?: string; // The ID from the external platform
  name: string;
  platform: string;
  originalPrice: number;
  salePrice: number;
  bindType: BindType;
  // Configuration for binding
  targetItemIds: string[]; // For SPECIFIC_ITEMS or EXCLUDE_ITEMS or the 'N' in M_CHOOSE_N
  mValue?: number; // The 'M' in M_CHOOSE_N
  applicableStores?: { poiId: string; name: string }[];
  applyRange?: 'ALL' | 'PARTIAL'; // New field: ALL = 全部门店, PARTIAL = 指定门店
  source: 'sync' | 'manual'; // New: Data source
  updateTime: string; // New: Last update time
}

// Merchant Coupon Logic Types
export interface CouponTemplate {
  id: string;
  name: string;
  type: 'cash' | 'discount' | 'exchange'; // 代金 | 折扣 | 兑换
  faceValue: number | string; // e.g. 5 (yuan) or 8.5 (discount) or 'Specific Item'
  stock: number;
}

export interface MerchantProduct {
  id: string;
  platformProductId?: string; // The ID from the external platform
  name: string;
  platform: string;
  salePrice: number;
  boundTemplateId?: string | null; // ID of the CouponTemplate
  source: 'sync' | 'manual'; // New: Data source
  updateTime: string; // New: Last update time
}

// Store Binding Types
export interface StoreBinding {
  id: string;
  saasStoreName: string;
  platformStoreName: string | null;
  platformPoiId: string | null;
  status: 'bound' | 'unbound';
  platformId: string;
  address: string;
  distance?: number; // Match confidence or distance
}

export interface PlatformStore {
  poiId: string;
  name: string;
  address: string;
  platformId: string;
}

// Redemption Record Types
export interface RedemptionRecord {
  id: string;
  orderNo: string;
  couponCode: string;
  productName: string;
  platform: string;
  storeName: string;
  redeemTime: string;
  status: 'success' | 'failed' | 'refunded';
  amount: number;
  // New fields for extended details
  couponType: 'platform' | 'merchant'; // 平台券 | 商家券
  verificationMethod: string; // POS核销, 小程序自助核销
  orderType: string; // 堂食订单, 小程序堂食订单, 买单订单, 平台外卖订单
}

// Exception Monitoring Types
export interface ExceptionRecord {
  id: string;
  orderNo: string;
  couponCode: string;
  productName: string;
  platform: string;
  storeName: string;
  redeemTime: string;
  errorMsg: string;
  status: 'pending' | 'retrying' | 'resolved';
  retryCount: number;
}