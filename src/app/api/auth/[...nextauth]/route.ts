import { buildAuthOptions } from '@/shared/utils/buildAuthOptions'
import NextAuth from 'next-auth'
import { NextRequest } from 'next/server'

const handleHttp = (
  req: NextRequest,
  routeContext: { params: { nextauth: string[] } },
) => {
  return NextAuth(req, routeContext, buildAuthOptions(req))
}

export { handleHttp as POST, handleHttp as GET }
