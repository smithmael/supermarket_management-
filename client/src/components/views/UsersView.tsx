import React from 'react';
import { motion } from 'motion/react';
import { Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useStore } from '../../store/useStore';
// REMOVED: import { useAuth } from '../../context/AuthContext';

interface UsersViewProps {
  onDelete: (id: number) => void;
  key?: string;
}

export function UsersView({ onDelete }: UsersViewProps) {
  // Grab both 'users' and 'user' (current user) from the Zustand store
  const { users, user: currentUser } = useStore();

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
            <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Username</th>
            <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Role</th>
            <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E5E7EB]">
          {users.map(u => (
            <tr key={u.id} className="hover:bg-[#F9FAFB] transition-colors">
              <td className="px-6 py-4 font-medium text-[#111827]">{u.username}</td>
              <td className="px-6 py-4">
                <span className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider", 
                  u.role === 'Admin' ? "bg-black text-white" : "bg-[#F3F4F6] text-[#6B7280]"
                )}>
                  {u.role}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                {/* Prevent the current user from deleting themselves */}
                {u.username !== currentUser?.username && (
                  <button 
                    onClick={() => onDelete(u.id)} 
                    className="p-2 text-[#9CA3AF] hover:text-red-600 hover:bg-red-50 rounded-lg transition-all active:scale-90"
                    title="Delete User"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}