import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { Category } from '../../types';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (e: React.FormEvent<HTMLFormElement>) => void;
  editingCategory: Category | null;
}

export function CategoryModal({ isOpen, onClose, onSave, editingCategory }: CategoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-[#E5E7EB] flex justify-between items-center">
          <h3 className="text-lg font-bold">{editingCategory ? 'Edit Category' : 'Add New Category'}</h3>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-black"><X size={20} /></button>
        </div>
        <form onSubmit={onSave} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">Category Name</label>
            <input name="name" defaultValue={editingCategory?.name} required className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5" />
          </div>
          <div className="pt-4">
            <button type="submit" className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-black/90 transition-all">
              {editingCategory ? 'Update Category' : 'Create Category'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
