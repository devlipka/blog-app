import { createDirectus, rest, staticToken } from "@directus/sdk";
import { Schema } from "@/types/schema";
export const directus = createDirectus<Schema>(
  process.env.NEXT_PUBLIC_API_URL as string,
)
  .with(staticToken(process.env.ADMIN_TOKEN as string))
  .with(rest());
