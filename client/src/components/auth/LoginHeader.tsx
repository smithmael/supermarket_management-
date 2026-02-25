import React from 'react';
import { ShoppingCart } from 'lucide-react';

export function LoginHeader() {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg">
        <ShoppingCart size={32} />
      </div>
      <h1 className="text-2xl font-bold">MarketPro Login</h1>
      <p className="text-[#6B7280] text-sm mt-1">Enter your credentials to access the system</p>
    </div>
  );
}
