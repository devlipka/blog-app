import { ImageResponse } from "next/og";
import { getCategoryData } from "@/app/[lang]/[category]/page";

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
    const category = searchParams.get("category") || "default category";
    const lang = searchParams.get("lang") || "en";
    const categoryData = await getCategoryData(category, lang);

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
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1121&q=80"
              alt="Explorer"
            />
            {/* Overlay */}
            <div
              tw={`absolute flex inset-0 bg-opacity-80 ${
                categoryData?.title === "Cities" ||
                categoryData?.title === "Städte"
                  ? "bg-emerald-600"
                  : "bg-indigo-600"
              }`}
            />
          </div>
          <div tw="flex flex-col text-white">
            {/* Title */}
            <div tw="text-[60px]">{categoryData?.title}</div>
            {/* Description */}
            <div tw="text-3xl max-w-4xl">{categoryData?.description}</div>
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
