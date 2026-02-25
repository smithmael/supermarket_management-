import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { Product, Category } from '../../types';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (e: React.FormEvent<HTMLFormElement>) => void;
  editingProduct: Product | null;
  categories: Category[];
}

export function ProductModal({ isOpen, onClose, onSave, editingProduct, categories }: ProductModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-[#E5E7EB] flex justify-between items-center">
          <h3 className="text-lg font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-black"><X size={20} /></button>
        </div>
        <form onSubmit={onSave} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">Product Name</label>
            <input name="name" defaultValue={editingProduct?.name} required className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">Category</label>
              <select name="category_id" defaultValue={editingProduct?.category_id} className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5">
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">SKU</label>
              <input name="sku" defaultValue={editingProduct?.sku} required className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">Price ($)</label>
              <input name="price" type="number" step="0.01" defaultValue={editingProduct?.price} required className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">Stock</label>
              <input name="stock" type="number" defaultValue={editingProduct?.stock} required className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5" />
            </div>
          </div>
          <div className="pt-4">
            <button type="submit" className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-black/90 transition-all">
              {editingProduct ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
