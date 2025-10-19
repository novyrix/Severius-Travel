import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prisma';
import { compareSync } from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(creds) {
        if (!creds?.email || !creds?.password) {
          console.log('❌ Missing credentials');
          return null;
        }
        
        console.log('🔍 Attempting login for:', creds.email);
        
        const user = await prisma.user.findUnique({ 
          where: { email: creds.email.toLowerCase() } 
        });
        
        if (!user) {
          console.log('❌ User not found:', creds.email);
          return null;
        }
        
        if (!user.hashedPassword) {
          console.log('❌ User has no password:', creds.email);
          return null;
        }
        
        console.log('🔐 Verifying password...');
        const ok = compareSync(creds.password, user.hashedPassword);
        
        if (!ok) {
          console.log('❌ Invalid password for:', creds.email);
          return null;
        }
        
        console.log('✅ Login successful for:', creds.email);
        return { 
          id: user.id, 
          email: user.email ?? undefined, 
          name: user.name ?? undefined,
          role: user.role 
        } as any;
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = (user as any).id;
      }
      
      // Fetch latest user data on each request
      if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: {
            id: true,
            isActive: true,
            role: true
          }
        });
        
        if (dbUser) {
          token.userId = dbUser.id;
          token.isActive = dbUser.isActive;
          token.role = dbUser.role;
        }
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token?.userId) {
        (session as any).userId = token.userId as string;
        (session as any).isActive = token.isActive;
        (session as any).role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};
