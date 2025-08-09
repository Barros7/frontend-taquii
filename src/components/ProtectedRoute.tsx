import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import { Spinner } from '@/components/Spinner';
import { buildLoginUrlWithCallback } from '@/utils/auth';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedTypes?: string[];
}

export default function ProtectedRoute({ children, allowedTypes = [] }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!loading && (!user || (allowedTypes.length > 0 && !allowedTypes.includes(user.userType)))) {
      const current = `${pathname || ''}${searchParams?.toString() ? `?${searchParams!.toString()}` : ''}`;
      router.replace(buildLoginUrlWithCallback(current));
    }
  }, [user, loading, allowedTypes, router, pathname, searchParams]);

  if (loading || !user) return <Spinner />;
  if (allowedTypes.length > 0 && !allowedTypes.includes(user.userType)) return null;

  return children;
} 