import { create } from 'zustand';
import { Product, Category, SaleItem, User } from '../types';

interface AppState {
  // --- Auth State ---
  user: User | null;
  authLoading: boolean;
  
  // --- Data State ---
  products: Product[];
  categories: Category[];
  users: User[];
  sales: any[];
  stats: any[];
  
  // --- POS State ---
  cart: SaleItem[];
  
  // --- UI State ---
  searchQuery: string;
  isLoading: boolean;

  // --- Actions ---
  setUser: (user: User | null) => void;
  setProducts: (products: Product[]) => void;
  setCategories: (categories: Category[]) => void;
  setUsers: (users: User[]) => void;
  setSales: (sales: any[]) => void;
  setStats: (stats: any[]) => void;
  setSearchQuery: (query: string) => void;
  setIsLoading: (loading: boolean) => void;

  // --- Cart Actions ---
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  
  // --- Async Fetchers ---
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  fetchSales: () => Promise<void>;
  fetchStats: () => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  user: null,
  authLoading: true,
  products: [],
  categories: [],
  users: [],
  sales: [],
  stats: [],
  cart: [],
  searchQuery: '',
  isLoading: false,

  setUser: (user) => set({ user }),
  setProducts: (products) => set({ products }),
  setCategories: (categories) => set({ categories }),
  setUsers: (users) => set({ users }),
  setSales: (sales) => set({ sales }),
  setStats: (stats) => set({ stats }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setIsLoading: (isLoading) => set({ isLoading }),

  // Auth Logic integrated to handle 401s gracefully
  checkAuth: async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const userData = await res.json();
        set({ user: userData, authLoading: false });
      } else {
        // Status 401 handled silently here
        set({ user: null, authLoading: false });
      }
    } catch (error) {
      set({ user: null, authLoading: false });
    }
  },

  logout: async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    set({ user: null, cart: [] }); // Clear cart on logout for security
  },

  addToCart: (product) => {
    if (product.stock <= 0) return;
    const { cart } = get();
    const existing = cart.find(item => item.id === product.id);
    
    if (existing) {
      if (existing.quantity >= product.stock) return;
      set({
        cart: cart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      });
    } else {
      set({
        cart: [...cart, { id: product.id, name: product.name, quantity: 1, price: product.price }]
      });
    }
  },

  removeFromCart: (id) => set(state => ({
    cart: state.cart.filter(item => item.id !== id)
  })),

  clearCart: () => set({ cart: [] }),

  fetchProducts: async () => {
    const res = await fetch('/api/products');
    if (res.ok) set({ products: await res.json() });
  },

  fetchCategories: async () => {
    const res = await fetch('/api/categories');
    if (res.ok) set({ categories: await res.json() });
  },

  fetchUsers: async () => {
    const res = await fetch('/api/auth/users');
    if (res.ok) set({ users: await res.json() });
  },

  fetchSales: async () => {
    const res = await fetch('/api/sales');
    if (res.ok) set({ sales: await res.json() });
  },

  fetchStats: async () => {
    const res = await fetch('/api/sales/stats');
    if (res.ok) set({ stats: await res.json() });
  },
}));