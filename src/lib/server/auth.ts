import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/sveltekit/providers/github"
import { db } from "./db"

const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [GitHub],
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
    updateAge: 60 * 60 * 24, // 1 day @default
    maxAge: 60 * 60 * 24 * 30, // 30 days @default
  },
  callbacks: {
    jwt({token, user}) {
      if (user) {
        token.userId = user.id
      }
      return token
    },
    session({session, token}) {
      //@ts-ignore
      session.user.id = token.userId
      
      return session
    }
  }
})

export default handle
export { signIn, signOut }
