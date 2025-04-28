// components/ProtectedRoute.tsx
import { useEffect } from 'react';
import { router, usePathname } from 'expo-router';
import { useAuthStore } from '@/store/useAuthStore';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    const isAuthPage = pathname.startsWith('/auth');
    if (!isAuthenticated && !isAuthPage) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated, pathname]);

  return <>{children}</>;
}
