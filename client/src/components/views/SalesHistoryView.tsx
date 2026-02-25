import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../../store/useStore';

export function SalesHistoryView() {
  const { sales } = useStore();

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">ID</th>
            <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Date</th>
            <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Cashier</th>
            <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E5E7EB]">
          {sales.map(sale => (
            <tr key={sale.id} className="hover:bg-[#F9FAFB] transition-colors">
              <td className="px-6 py-4 text-sm text-[#6B7280]">#{sale.id}</td>
              <td className="px-6 py-4 text-sm">{new Date(sale.timestamp).toLocaleString()}</td>
              <td className="px-6 py-4"><span className="px-2 py-1 bg-[#F3F4F6] rounded-md text-xs font-medium">{sale.cashier_name}</span></td>
              <td className="px-6 py-4 font-bold">${sale.total_amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
