import React from 'react';
import { Search, Plus } from 'lucide-react';
// REMOVED: import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../store/useStore';

interface HeaderProps {
  activeTab: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddClick: () => void;
}

export function Header({ activeTab, searchQuery, setSearchQuery, onAddClick }: HeaderProps) {
  // Grab the user from Zustand instead
  const { user } = useStore();

  const showAddButton = (activeTab === 'inventory' || activeTab === 'categories' || activeTab === 'users') && user?.role === 'Admin';

  const getAddButtonLabel = () => {
    if (activeTab === 'inventory') return 'Add Product';
    if (activeTab === 'categories') return 'Add Category';
    if (activeTab === 'users') return 'Add User';
    return 'Add';
  };

  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>
        <p className="text-[#6B7280] text-sm">Manage your supermarket operations efficiently.</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
          <input 
            type="text" 
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-white border border-[#E5E7EB] rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-black/5"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {showAddButton && (
          <button 
            onClick={onAddClick} 
            className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-black/90 transition-colors shadow-sm active:scale-95"
          >
            <Plus size={18} /> {getAddButtonLabel()}
          </button>
        )}
      </div>
    </header>
  );
}