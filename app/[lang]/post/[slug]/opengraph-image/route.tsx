import { ImageResponse } from "next/og";
import { getPostData } from "@/app/[lang]/post/[slug]/page";
import { getReadingTime, getRelativeDate } from "@/lib/helpers";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const alt = "Expolorer | Blog";

export const contentType = "image/png";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug") || "default slug";
    const lang = searchParams.get("lang") || "en";
    const post = await getPostData(slug, lang);

    return new ImageResponse(
      (
        <div tw="relative flex w-full h-full flex items-center justify-center">
          {/* Background */}
          <div tw="absolute flex inset-0">
            <img
              height="628"
              width="1200"
              style={{
                display: "flex",
                flexGrow: 1,
                objectFit: "cover",
                objectPosition: "center",
                width: "100%",
                height: "100%",
              }}
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}`}
              alt={post?.title!!}
            />
            {/* Overlay */}
            <div tw="absolute flex inset-0 bg-black bg-opacity-50" />
          </div>
          <div tw="flex flex-col text-neutral-50 ">
            {/* Title */}
            <div tw="text-[60px]">{post?.title}</div>
            {/* Description */}
            <div tw="text-2xl max-w-4xl">{post?.description}</div>
            {/* Tags */}
            <div tw="flex mt-6 flex-wrap items-center text-3xl text-neutral-200">
              <div
                tw={`font-medium ${
                  post?.category.title === "Cities"
                    ? "text-emerald-600"
                    : "text-indigo-600"
                }`}
              >
                {post?.category.title}
              </div>
              <div tw="w-4 h-4 mx-6 rounded-full bg-neutral-300 " />
              <div>{`${post?.author.first_name} ${post?.author.last_name}`}</div>
              <div tw="w-4 h-4 mx-6 rounded-full bg-neutral-300" />
              <div>{getReadingTime(post?.body!!, lang)}</div>
              <div tw="w-4 h-4 mx-6 rounded-full bg-neutral-300" />
              <div>{getRelativeDate(post?.date_created!!, lang)}</div>
            </div>
          </div>
        </div>
      ),
      size,
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
