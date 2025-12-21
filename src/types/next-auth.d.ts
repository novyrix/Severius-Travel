import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT as DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Extended Session to include custom user properties
   */
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: 'USER' | 'ADMIN';
      isActive: boolean;
      emailVerified: Date | null;
    } & DefaultSession['user'];
  }

  /**
   * Extended User model
   */
  interface User extends DefaultUser {
    id: string;
    role: 'USER' | 'ADMIN';
    isActive: boolean;
    emailVerified: Date | null;
    hashedPassword?: string | null;
    resetToken?: string | null;
    resetTokenExpiry?: Date | null;
  }
}

declare module 'next-auth/jwt' {
  /**
   * Extended JWT to include custom claims
   */
  interface JWT extends DefaultJWT {
    userId: string;
    role: 'USER' | 'ADMIN';
    isActive: boolean;
    emailVerified: Date | null;
  }
}
