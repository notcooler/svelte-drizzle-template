import { sequence } from "@sveltejs/kit/hooks"
import auth from "$lib/server/auth"
import session from "./session"

export default sequence(
    auth,
    session,
    // Add more hooks here
)
