import type { Handle } from "@sveltejs/kit"

const handle: Handle = async ({ event, resolve }) => {
    event.locals.session = await event.locals.auth()
    event.locals.user = event.locals.session?.user || null

  return await resolve(event)
}

export default handle
