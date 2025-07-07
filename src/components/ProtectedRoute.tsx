import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, allowedTypes = [] }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && (!user || (allowedTypes.length > 0 && !allowedTypes.includes(user.userType)))) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [user, loading, allowedTypes, router, pathname]);

  if (loading || !user) return <div>Carregando...</div>;
  if (allowedTypes.length > 0 && !allowedTypes.includes(user.userType)) return null;

  return children;
} 