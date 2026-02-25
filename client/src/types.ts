export interface User {
  id: number;
  username: string;
  role: 'Admin' | 'Cashier';
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  category_id: number;
  category_name?: string;
  price: number;
  stock: number;
  sku: string;
  image_url?: string;
}

export interface SaleItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Sale {
  id: number;
  total_amount: number;
  user_id: number;
  cashier_name?: string;
  timestamp: string;
}

export interface SaleItemDetail extends SaleItem {
  product_name: string;
}

export interface SaleStat {
  date: string;
  total: number;
}

export type Tab = 'dashboard' | 'inventory' | 'categories' | 'pos' | 'history' | 'users';
