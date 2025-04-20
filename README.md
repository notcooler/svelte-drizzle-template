# Svelte drizzle template

A simple svelte template with drizzle and auth.js equipped.

Uses bun, a simple bundler for svelte.

## Usage
Check .env.example for the environment variables needed.

```docker compose up -d``` to start the local database as well as the s3 storage

```bun run dev --open``` to start the dev server and open the browser.

```bun run build``` to build the project.

```bun run db:migrate``` to migrate the database.