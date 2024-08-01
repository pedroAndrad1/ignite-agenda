import { getServerSession } from 'next-auth'
import { buildAuthOptions } from './buildAuthOptions'

export const getSession = () => getServerSession(buildAuthOptions())
