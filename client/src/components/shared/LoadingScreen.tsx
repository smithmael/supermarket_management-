import React from 'react';

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-[#6B7280]">Loading MarketPro...</p>
      </div>
    </div>
  );
}
