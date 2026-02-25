import React from 'react';
import { motion } from 'motion/react';
import { Edit2, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useStore } from '../../store/useStore';
// REMOVED: import { useAuth } from '../../context/AuthContext';
import { Product } from '../../types';

interface InventoryViewProps {
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  key?: string;
}

export function InventoryView({ onEdit, onDelete }: InventoryViewProps) {
  // Grab everything from Zustand
  const { products, searchQuery, user } = useStore();

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }} 
      className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm"
    >
      <table className="w-full text-left">
        <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Product</th>
            <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Category</th>
            <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Price</th>
            <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Stock</th>
            <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">SKU</th>
            {user?.role === 'Admin' && (
              <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider text-right">Actions</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E5E7EB]">
          {filteredProducts.map(product => (
            <tr key={product.id} className="hover:bg-[#F9FAFB] transition-colors">
              <td className="px-6 py-4 font-medium text-[#111827]">{product.name}</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-[#F3F4F6] rounded-md text-xs font-medium text-[#4B5563]">
                  {product.category_name}
                </span>
              </td>
              <td className="px-6 py-4 font-medium">${product.price.toFixed(2)}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "w-2 h-2 rounded-full", 
                    product.stock < 10 ? "bg-red-500 animate-pulse" : "bg-emerald-500"
                  )} />
                  <span className={cn(
                    "font-medium",
                    product.stock < 10 ? "text-red-600" : "text-[#111827]"
                  )}>
                    {product.stock}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 font-mono text-xs text-[#9CA3AF] uppercase tracking-tighter">
                {product.sku}
              </td>
              {user?.role === 'Admin' && (
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-1">
                    <button 
                      onClick={() => onEdit(product)} 
                      className="p-2 text-[#6B7280] hover:text-black hover:bg-[#F3F4F6] rounded-lg transition-all"
                      title="Edit Product"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => onDelete(product.id)} 
                      className="p-2 text-[#6B7280] hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete Product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {filteredProducts.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-[#9CA3AF] text-sm italic">No products found matching "{searchQuery}"</p>
        </div>
      )}
    </motion.div>
  );
}