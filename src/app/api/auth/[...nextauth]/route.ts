import { PrismaCustomAdapter } from '@/lib/auth/prisma-custom-adpter'
import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import { NextRequest } from 'next/server'

const buildAuthOptions = (req: NextRequest): AuthOptions => {
  return {
    adapter: PrismaCustomAdapter(req),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENTE_SECRET as string,
        authorization: {
          params: {
            scope:
              'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar',
          },
        },
        profile: (profile: GoogleProfile) => {
          return {
            id: profile.sub,
            name: profile.name,
            username: '',
            email: profile.email,
            avatar_url: profile.picture,
          }
        },
      }),
    ],
    callbacks: {
      async signIn({ account }) {
        if (
          !account?.scope?.includes('https://www.googleapis.com/auth/calendar')
        ) {
          return '/registro/conexao-google?error=permissions'
        }

        return true
      },
      async session({ session, user }) {
        return {
          ...session,
          user,
        }
      },
    },
  }
}

const handleHttp = (
  req: NextRequest,
  routeContext: { params: { nextauth: string[] } },
) => {
  return NextAuth(req, routeContext, buildAuthOptions(req))
}

export { handleHttp as POST, handleHttp as GET }
