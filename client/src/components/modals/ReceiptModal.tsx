import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Package } from 'lucide-react';
import { SaleItem } from '../../types';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  lastSale: { id: number, total: number, items: SaleItem[] } | null;
}

export function ReceiptModal({ isOpen, onClose, lastSale }: ReceiptModalProps) {
  if (!isOpen || !lastSale) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
        <div className="p-8 text-center border-b border-dashed border-[#E5E7EB]">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-xl font-bold">Sale Successful</h3>
          <p className="text-[#6B7280] text-sm">Receipt #{lastSale.id}</p>
        </div>
        <div className="p-8 space-y-4">
          <div className="space-y-2">
            {lastSale.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-[#6B7280]">{item.quantity}x {item.name}</span>
                <span className="font-medium">${(item.quantity * item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-dashed border-[#E5E7EB] pt-4 flex justify-between items-center">
            <span className="font-bold">Total Amount</span>
            <span className="text-2xl font-bold">${lastSale.total.toFixed(2)}</span>
          </div>
          <div className="pt-6 space-y-3">
            <button onClick={() => window.print()} className="w-full border border-[#E5E7EB] py-3 rounded-xl font-bold hover:bg-[#F9FAFB] transition-all flex items-center justify-center gap-2">
              <Package size={18} /> Print Receipt
            </button>
            <button onClick={onClose} className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-black/90 transition-all">
              Done
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
