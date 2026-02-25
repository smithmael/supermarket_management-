import React, { useEffect } from 'react';
import { useStore } from './store/useStore';
import Login from './components/Login';
import { MainLayout } from './components/layout/MainLayout';
import { LoadingScreen } from './components/shared/LoadingScreen';

export default function App() {
  const { user, authLoading, checkAuth } = useStore();

  useEffect(() => {
    // Check if a session cookie exists on mount
    checkAuth();
  }, [checkAuth]);

  if (authLoading) {
    return <LoadingScreen />;
  }

  // Direct conditional rendering based on Zustand state
  return user ? <MainLayout /> : <Login />;
}