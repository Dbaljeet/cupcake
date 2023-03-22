import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { dbUsers } from '../../../database'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
  }
  interface User {
    id?: string
    _id: string
  }
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  session: {
    maxAge: 2592000, /// 30d
    strategy: 'jwt',
    updateAge: 86400, // cada día
  },

  pages: {
    signIn: '/login',
  },

  callbacks: {
    async jwt({ token, account, user, profile, isNewUser }) {
      if (account) {
        //const tokenn = account.access_token
        switch (account.type) {
          case 'oauth':
            token.user = await dbUsers.oAUthToDbUser(
              user?.email || '',
              user?.name || ''
            )
            break

          case 'credentials':
            token.user = user
            break
        }
      }

      return token
    },

    /*
    async session({ session, token, user }) {
      console.log({ session, token, user })

      return session
    },*/
  },
}
export default NextAuth(authOptions)
