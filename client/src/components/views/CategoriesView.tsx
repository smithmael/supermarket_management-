import React from 'react';
import { motion } from 'motion/react';
import { Edit2, Trash2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Category } from '../../types';

interface CategoriesViewProps {
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
  key?: string;
}

export function CategoriesView({ onEdit, onDelete }: CategoriesViewProps) {
  const { categories } = useStore();

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">ID</th>
            <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Name</th>
            <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E5E7EB]">
          {categories.map(cat => (
            <tr key={cat.id} className="hover:bg-[#F9FAFB] transition-colors">
              <td className="px-6 py-4 text-sm text-[#6B7280]">{cat.id}</td>
              <td className="px-6 py-4 font-medium">{cat.name}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button onClick={() => onEdit(cat)} className="p-2 text-[#6B7280] hover:text-black hover:bg-[#F3F4F6] rounded-lg transition-colors"><Edit2 size={16} /></button>
                  <button onClick={() => onDelete(cat.id)} className="p-2 text-[#6B7280] hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
