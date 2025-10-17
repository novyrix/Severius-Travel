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
        if (!creds?.email || !creds?.password) return null;
        const user = await prisma.user.findUnique({ where: { email: creds.email } });
        if (!user || !user.hashedPassword) return null;
        const ok = compareSync(creds.password, user.hashedPassword);
        if (!ok) return null;
        return { id: user.id, email: user.email ?? undefined, name: user.name ?? undefined } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = (user as any).id;
      }
      
      // Fetch latest user data on each request to check verification status
      if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: {
            id: true,
            emailVerified: true,
            isActive: true,
            role: true
          }
        });
        
        if (dbUser) {
          token.userId = dbUser.id;
          token.emailVerified = !!dbUser.emailVerified;
          token.isActive = dbUser.isActive;
          token.role = dbUser.role;
        }
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token?.userId) {
        (session as any).userId = token.userId as string;
        (session as any).emailVerified = token.emailVerified;
        (session as any).isActive = token.isActive;
        (session as any).role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
