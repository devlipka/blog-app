import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { NextApiResponse } from "next";

export async function GET(request: NextRequest, res: NextApiResponse) {
  const token = request.nextUrl.searchParams.get("token");
  // If there is no token, return a 401
  if (!token || token !== process.env.ADMIN_TOKEN)
    return res.status(200).json({ error: "Not authorised" });
  // Revalidate All Posts
  revalidatePath(`/[lang]/post/[slug]`);
  // Revalidate All Categories
  revalidatePath(`/[lang]/[category]`);
  // Revalidate All Languages
  revalidatePath(`/[lang]`);

  return res.json({ revalidated: true, now: Date.now() });
}
