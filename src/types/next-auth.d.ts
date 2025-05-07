import 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string;
    userType: 'CLIENT' | 'PROVIDER' | 'ADMIN';
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userType: 'CLIENT' | 'PROVIDER' | 'ADMIN';
    id: string;
  }
} 