import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { prisma } from '@/prisma/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  session: { strategy: 'jwt' },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
  theme: {
    colorScheme: 'light',
    brandColor: '', // Hex color code
    logo: '', // Absolute URL to image
    buttonText: '', // Hex color code
  },
});
