import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StatCard } from '../shared/UI';
import { useStore } from '../../store/useStore';

export function DashboardView() {
  const { stats, products } = useStore();

  const totalRevenue = stats.reduce((sum, s) => sum + s.total, 0);
  const lowStockCount = products.filter(p => p.stock < 10).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} trend="+12.5%" icon={<TrendingUp className="text-emerald-600" />} />
        <StatCard title="Low Stock Items" value={lowStockCount.toString()} trend={lowStockCount > 5 ? "Warning" : "Healthy"} icon={<AlertCircle className={lowStockCount > 5 ? "text-amber-600" : "text-emerald-600"} />} />
        <StatCard title="Total Products" value={products.length.toString()} trend="Active" icon={<CheckCircle2 className="text-blue-600" />} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB]">
          <h3 className="text-lg font-bold mb-6">Revenue Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="total" stroke="#000" strokeWidth={3} dot={{ r: 4, fill: '#000' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB]">
          <h3 className="text-lg font-bold mb-6">Low Stock Inventory</h3>
          <div className="space-y-4">
            {products.filter(p => p.stock < 10).slice(0, 5).map(p => (
              <div key={p.id} className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100">
                <div className="flex items-center gap-3">
                  <AlertCircle className="text-red-600" size={18} />
                  <div>
                    <p className="text-sm font-bold text-red-900">{p.name}</p>
                    <p className="text-xs text-red-600">SKU: {p.sku}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-red-900">{p.stock} left</span>
              </div>
            ))}
            {products.filter(p => p.stock < 10).length === 0 && (
              <div className="text-center py-8 text-[#9CA3AF]">
                <CheckCircle2 size={48} className="mx-auto mb-2 opacity-20" />
                <p className="text-sm">All stock levels are healthy.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
