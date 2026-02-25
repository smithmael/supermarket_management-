import React, { useState, useEffect } from 'react';
// REMOVED: import { useAuth } from '../context/AuthContext'; 
import { useStore } from '../store/useStore';
import { Tab, Product, Category, SaleItem } from '../types';

export function useAppLogic() {
  // Grab the user directly from the Zustand store
  const { 
    user, 
    cart, 
    clearCart,
    fetchProducts, 
    fetchCategories, 
    fetchUsers, 
    fetchSales, 
    fetchStats 
  } = useStore();

  const [activeTab, setActiveTab] = useState<Tab>(user?.role === 'Admin' ? 'dashboard' : 'pos');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [lastSale, setLastSale] = useState<{ id: number, total: number, items: SaleItem[] } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      // Inventory, POS, and Dashboard all need Product/Category data
      if (activeTab === 'inventory' || activeTab === 'pos' || activeTab === 'dashboard') {
        await Promise.all([fetchProducts(), fetchCategories()]);
      }
      if (activeTab === 'categories') await fetchCategories();
      
      // Admin-only data fetching
      if (user?.role === 'Admin') {
        if (activeTab === 'dashboard') await fetchStats();
        if (activeTab === 'history') await fetchSales();
        if (activeTab === 'users') await fetchUsers();
      }
    };
    loadData();
  }, [activeTab, user, fetchProducts, fetchCategories, fetchStats, fetchSales, fetchUsers]); // Added fetch dependencies for best practice

  const checkout = async () => {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const res = await fetch('/api/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, total_amount: total })
    });
    if (res.ok) {
      const data = await res.json();
      setLastSale({ id: data.id, total, items: [...cart] });
      clearCart();
      setIsReceiptModalOpen(true);
      fetchProducts();
    }
  };

  const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
    const method = editingProduct ? 'PATCH' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        price: parseFloat(data.price as string),
        stock: parseInt(data.stock as string),
        category_id: parseInt(data.category_id as string)
      })
    });

    if (res.ok) {
      setIsModalOpen(false);
      setEditingProduct(null);
      fetchProducts();
    }
  };

  const handleSaveCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const url = editingCategory ? `/api/categories/${editingCategory.id}` : '/api/categories';
    const method = editingCategory ? 'PATCH' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      setIsCategoryModalOpen(false);
      setEditingCategory(null);
      fetchCategories();
    }
  };

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      setIsUserModalOpen(false);
      fetchUsers();
    }
  };

  const deleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (res.ok) fetchProducts();
  };

  const deleteCategory = async (id: number) => {
    if (!confirm('Are you sure? This might affect products in this category.')) return;
    const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    if (res.ok) fetchCategories();
  };

  const deleteUser = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    const res = await fetch(`/api/auth/users/${id}`, { method: 'DELETE' });
    if (res.ok) fetchUsers();
  };

  const handleAddClick = () => {
    if (activeTab === 'inventory') {
      setEditingProduct(null);
      setIsModalOpen(true);
    } else if (activeTab === 'categories') {
      setEditingCategory(null);
      setIsCategoryModalOpen(true);
    } else if (activeTab === 'users') {
      setIsUserModalOpen(true);
    }
  };

  return {
    activeTab, setActiveTab,
    isModalOpen, setIsModalOpen,
    editingProduct, setEditingProduct,
    isCategoryModalOpen, setIsCategoryModalOpen,
    editingCategory, setEditingCategory,
    isUserModalOpen, setIsUserModalOpen,
    isReceiptModalOpen, setIsReceiptModalOpen,
    lastSale,
    checkout,
    handleSaveProduct,
    handleSaveCategory,
    handleCreateUser,
    deleteProduct,
    deleteCategory,
    deleteUser,
    handleAddClick
  };
}