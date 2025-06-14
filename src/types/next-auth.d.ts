import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      userType: string;
      emailVerified: boolean;
    };
    accessToken: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    userType: string;
    accessToken: string;
    emailVerified: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    userType: string;
    accessToken: string;
    emailVerified: boolean;
  }
}
