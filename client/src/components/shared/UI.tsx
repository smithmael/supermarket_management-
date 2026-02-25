import React from 'react';
import { cn } from '../../lib/utils';

interface SidebarLinkProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

export function SidebarLink({ active, onClick, icon, label }: SidebarLinkProps) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left",
        active ? "bg-black text-white" : "text-[#6B7280] hover:bg-[#F3F4F6] hover:text-black"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
}

export function StatCard({ title, value, trend, icon }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] flex justify-between items-start">
      <div>
        <p className="text-sm text-[#6B7280] mb-1">{title}</p>
        <h4 className="text-3xl font-bold mb-2">{value}</h4>
        <span className={cn(
          "text-xs font-bold px-2 py-1 rounded-md",
          trend.includes('+') ? "bg-emerald-50 text-emerald-600" : 
          trend === "Warning" ? "bg-amber-50 text-amber-600" : "bg-[#F3F4F6] text-[#6B7280]"
        )}>
          {trend}
        </span>
      </div>
      <div className="p-3 bg-[#F9FAFB] rounded-xl">
        {icon}
      </div>
    </div>
  );
}
