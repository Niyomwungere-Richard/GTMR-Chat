"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthChanged } from '@/lib/authService';
import { type User as FirebaseUser } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ currentUser: null, loading: true });

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      if (!user && pathname !== '/login' && pathname !== '/signup') {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  const value = {
    currentUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
