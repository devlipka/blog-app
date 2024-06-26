import React from "react";
import Image from "next/image";
import { Post } from "@/types/collection";
import Link from "next/link";
import PostContent from "@/components/post/post-content";

interface PostProps {
  post: Post;
  layout?: "vertical" | "horizontal";
  reverse?: boolean;
  locale: string;
}
function PostCard({
  post,
  layout = "horizontal",
  reverse = false,
  locale,
}: PostProps) {
  return (
    <Link
      className={`@container ${
        layout === "horizontal"
          ? "grid items-center grid-cols-1 md:grid-cols-2 gap-10"
          : "space-y-10"
      }`}
      href={`/post/${post.slug}`}
    >
      <Image
        className={`rounded-md w-full object-cover object-center h-full max-h-[300px] ${
          reverse ? "md:order-last" : ""
        }`}
        alt={post.title}
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimised`}
        width={600}
        height={300}
      />
      <PostContent locale={locale} post={post} />
    </Link>
  );
}

export default PostCard;
