import { sequence } from "@sveltejs/kit/hooks"
import auth from "$lib/auth"
import session from "./session"

export default sequence(
    auth,
    session,
    // Add more hooks here
)
