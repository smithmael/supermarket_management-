import React from 'react';
import { motion } from 'motion/react';
import { Package, ShoppingCart, X, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useStore } from '../../store/useStore';

interface POSViewProps {
  onCheckout: () => void;
  key?: string;
}

export function POSView({ onCheckout }: POSViewProps) {
  const { products, cart, searchQuery, addToCart, removeFromCart } = useStore();

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <button key={product.id} disabled={product.stock <= 0} onClick={() => addToCart(product)} className={cn("p-4 bg-white border border-[#E5E7EB] rounded-2xl text-left hover:border-black transition-all group relative", product.stock <= 0 && "opacity-50 cursor-not-allowed grayscale")}>
              <div className="aspect-square bg-[#F9FAFB] rounded-xl mb-3 flex items-center justify-center text-[#9CA3AF]"><Package size={32} /></div>
              <h4 className="font-bold text-sm mb-1 group-hover:text-black">{product.name}</h4>
              <p className="text-xs text-[#6B7280] mb-2">{product.category_name}</p>
              <div className="flex justify-between items-center"><span className="font-bold text-lg">${product.price.toFixed(2)}</span><span className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]">Stock: {product.stock}</span></div>
              {product.stock <= 0 && <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-2xl"><span className="bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold uppercase">Out of Stock</span></div>}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 flex flex-col h-[calc(100vh-200px)] sticky top-8">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">Current Order <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">{cart.length}</span></h3>
        <div className="flex-1 overflow-auto space-y-4 mb-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-[#9CA3AF] text-center"><ShoppingCart size={48} strokeWidth={1} className="mb-4" /><p className="text-sm">Your cart is empty.<br/>Select products to start an order.</p></div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex justify-between items-center group">
                <div><p className="font-medium text-sm">{item.name}</p><p className="text-xs text-[#6B7280]">{item.quantity} x ${item.price.toFixed(2)}</p></div>
                <div className="flex items-center gap-3"><span className="font-bold text-sm">${(item.quantity * item.price).toFixed(2)}</span><button onClick={() => removeFromCart(item.id)} className="p-1 text-[#9CA3AF] hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"><X size={14} /></button></div>
              </div>
            ))
          )}
        </div>
        <div className="border-t border-[#E5E7EB] pt-6 space-y-4">
          <div className="flex justify-between text-sm"><span className="text-[#6B7280]">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-xl font-bold pt-2"><span>Total</span><span>${subtotal.toFixed(2)}</span></div>
          <button onClick={onCheckout} disabled={cart.length === 0} className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4">Complete Checkout <ChevronRight size={18} /></button>
        </div>
      </div>
    </motion.div>
  );
}
