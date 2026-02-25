import React from 'react';
import { AnimatePresence } from 'motion/react';
// REMOVED: import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../store/useStore';
import { useAppLogic } from '../../hooks/useAppLogic';

// Components
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { DashboardView } from '../views/DashboardView';
import { InventoryView } from '../views/InventoryView';
import { CategoriesView } from '../views/CategoriesView';
import { POSView } from '../views/POSView';
import { SalesHistoryView } from '../views/SalesHistoryView';
import { UsersView } from '../views/UsersView';

// Modals
import { ProductModal } from '../modals/ProductModal';
import { CategoryModal } from '../modals/CategoryModal';
import { UserModal } from '../modals/UserModal';
import { ReceiptModal } from '../modals/ReceiptModal';

export function MainLayout() {
  // Grab user from Zustand instead of Context
  const { user, categories, searchQuery, setSearchQuery } = useStore();
  const logic = useAppLogic();

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex font-sans text-[#1A1A1A]">
      <Sidebar activeTab={logic.activeTab} setActiveTab={logic.setActiveTab} />

      <main className="flex-1 overflow-auto p-8">
        <Header 
          activeTab={logic.activeTab} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          onAddClick={logic.handleAddClick}
        />

        <AnimatePresence mode="wait">
          {logic.activeTab === 'dashboard' && user?.role === 'Admin' && <DashboardView key="dashboard" />}
          {logic.activeTab === 'inventory' && (
            <InventoryView 
              key="inventory" 
              onEdit={(p) => { logic.setEditingProduct(p); logic.setIsModalOpen(true); }} 
              onDelete={logic.deleteProduct} 
            />
          )}
          {logic.activeTab === 'categories' && user?.role === 'Admin' && (
            <CategoriesView 
              key="categories" 
              onEdit={(c) => { logic.setEditingCategory(c); logic.setIsCategoryModalOpen(true); }} 
              onDelete={logic.deleteCategory} 
            />
          )}
          {logic.activeTab === 'pos' && <POSView key="pos" onCheckout={logic.checkout} />}
          {logic.activeTab === 'history' && user?.role === 'Admin' && <SalesHistoryView key="history" />}
          {logic.activeTab === 'users' && user?.role === 'Admin' && <UsersView key="users" onDelete={logic.deleteUser} />}
        </AnimatePresence>
      </main>

      {/* Modals remain the same, just ensured they use the store data via logic hook */}
      <ProductModal 
        isOpen={logic.isModalOpen} 
        onClose={() => logic.setIsModalOpen(false)} 
        onSave={logic.handleSaveProduct} 
        editingProduct={logic.editingProduct} 
        categories={categories} 
      />

      <CategoryModal 
        isOpen={logic.isCategoryModalOpen} 
        onClose={() => logic.setIsCategoryModalOpen(false)} 
        onSave={logic.handleSaveCategory} 
        editingCategory={logic.editingCategory} 
      />

      <UserModal 
        isOpen={logic.isUserModalOpen} 
        onClose={() => logic.setIsUserModalOpen(false)} 
        onSave={logic.handleCreateUser} 
      />

      <ReceiptModal 
        isOpen={logic.isReceiptModalOpen} 
        onClose={() => logic.setIsReceiptModalOpen(false)} 
        lastSale={logic.lastSale} 
      />
    </div>
  );
}