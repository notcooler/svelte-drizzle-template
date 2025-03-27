import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/sveltekit/providers/github"

const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [GitHub],
  callbacks: {
    jwt({ token, profile }) {
      if(profile) {
        token.userId = profile?.id?.toString()
      }
      
      return token
    },
    session({ session, token }) {
      // @ts-ignore
      session.user.id = token.userId
      
      return session
    },
  },
})

export default handle
export { signIn, signOut }
