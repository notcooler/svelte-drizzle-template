<script>
  import { goto } from "$app/navigation"
  import { page } from "$app/state"
  import { uploadFileToS3 } from "$lib/client/s3.js"
  import { buttonVariants } from "$lib/components/ui/button"
  import { cn } from "$lib/utils"

  import { SignIn, SignOut } from "@auth/sveltekit/components"

  let { data } = $props()
  let { session, user } = $derived(data)

  let image = $state(`http://localhost:4566/my-bucket/${page.url.searchParams.get("image") || null}`)
  let files = $state()

  async function upload() {
    if (!files || files.length == 0) {
      alert("Please select a file to upload.")
      return
    }
    const file = files[0]

    image = await uploadFileToS3(file)
  }
</script>

<div class="w-full h-screen items-center space-y-4 p-4 text-center">
  <h1 class={cn("text-3xl", "text-center")}>
    Welcome to SvelteKit! {user?.name}
  </h1>
  <p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
  </p>
  <p class="text-muted-foreground">
    {user?.id}
    <br />
    {user?.name}
    <br />
    {user?.email}
    <br />
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

  <div class="flex flex-col gap-4 p-4 border-2 border-black">
    <input type="file" bind:files />
    <button on:click={upload}>Upload to S3 via Signed URL</button>
  </div>

  {#if image}
    <!-- svelte-ignore a11y_missing_attribute -->
    <img src={image} class="w-1/2 h-auto mx-auto" />
  {/if}
</div>
