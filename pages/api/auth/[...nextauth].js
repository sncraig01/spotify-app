import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default (req, res) => NextAuth(req, res, {
  // Configure one or more authentication providers
  providers: [
    Providers.Spotify({
      scope: 'user-read-private user-read-email user-top-read',
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
    })
  ],
  callbacks: { 
    async jwt(token, _, account) {
      if (account) {
        token.id = account.id
        token.accessToken = account.accessToken
      }
       return token
    },
    async session(session, user) {
      session.user = user
      return session
    }
  },
})