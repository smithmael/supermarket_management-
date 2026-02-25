import React from 'react';
import { ShoppingCart, LayoutDashboard, Package, ChevronRight, History, User as UserIcon, LogOut } from 'lucide-react';
import { SidebarLink } from '../shared/UI';
// 1. Remove AuthContext import
// 2. Import useStore instead
import { useStore } from '../../store/useStore';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  // 3. Get user and logout from Zustand
  const { user, logout } = useStore();

  return (
    <aside className="w-64 bg-white border-r border-[#E5E7EB] flex flex-col">
      <div className="p-6 border-b border-[#E5E7EB]">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
            <ShoppingCart size={18} />
          </div>
          MarketPro
        </h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {user?.role === 'Admin' && (
          <SidebarLink 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
          />
        )}
        <SidebarLink 
          active={activeTab === 'inventory'} 
          onClick={() => setActiveTab('inventory')}
          icon={<Package size={20} />}
          label="Inventory"
        />
        {user?.role === 'Admin' && (
          <SidebarLink 
            active={activeTab === 'categories'} 
            onClick={() => setActiveTab('categories')}
            icon={<ChevronRight size={20} />}
            label="Categories"
          />
        )}
        <SidebarLink 
          active={activeTab === 'pos'} 
          onClick={() => setActiveTab('pos')}
          icon={<ShoppingCart size={20} />}
          label="Point of Sale"
        />
        {user?.role === 'Admin' && (
          <>
            <SidebarLink 
              active={activeTab === 'history'} 
              onClick={() => setActiveTab('history')}
              icon={<History size={20} />}
              label="Sales History"
            />
            <SidebarLink 
              active={activeTab === 'users'} 
              onClick={() => setActiveTab('users')}
              icon={<UserIcon size={20} />}
              label="Users"
            />
          </>
        )}
      </nav>

      <div className="p-4 border-t border-[#E5E7EB] space-y-4">
        <div className="flex items-center gap-3 px-4 py-2 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
          <div className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center text-black">
            <UserIcon size={16} />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold truncate">{user?.username}</p>
            <p className="text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold">{user?.role}</p>
          </div>
        </div>
        
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}