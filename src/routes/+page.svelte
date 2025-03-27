<script>
  import { buttonVariants } from "$lib/components/ui/button"
  import { cn } from "$lib/utils"

  import { SignIn, SignOut } from "@auth/sveltekit/components"

  let { data } = $props()
  let { session, user } = $derived(data)
</script>

<div class="w-full h-screen items-center space-y-4 p-4 text-center">
  <h1 class={cn("text-3xl", "text-center")}>Welcome to SvelteKit! {user?.name}</h1>
  <p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
  </p>
  <p class="text-muted-foreground">
    {user?.id}
    <br>
    {user?.name}
    <br>
    {user?.email}
    <br>
    {session?.expires}
  </p>

  {#if !session}
    <SignIn
      className={buttonVariants({ size: "lg", class: "cursor-pointer" })}
      provider="github"
      signInPage="signin"
    />
  {:else}
    <SignOut
      className={buttonVariants({
        size: "lg",
        variant: "destructive",
        class: "cursor-pointer",
      })}
      signOutPage="signout"
    />
  {/if}
</div>
