import React from 'react';
import { motion } from 'motion/react';
import { LoginHeader } from './auth/LoginHeader';
import { LoginForm } from './auth/LoginForm';
import { LoginFooter } from './auth/LoginFooter';

export default function Login() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-3xl border border-[#E5E7EB] w-full max-w-md shadow-xl"
      >
        <LoginHeader />
        <LoginForm />
        <LoginFooter />
      </motion.div>
    </div>
  );
}
