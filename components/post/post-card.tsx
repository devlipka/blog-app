import React from "react";
import Image from "next/image";
import { Post } from "@/types/collection";
import Link from "next/link";
import PostContent from "@/components/post/post-content";

interface PostProps {
  post: Post;
}
function PostCard({ post }: PostProps) {
  return (
    <Link
      className="grid items-center grid-cols-2 gap-10"
      href={`/post/${post.slug}`}
    >
      <Image
        className="rounded-md w-full object-cover object-center max-h-[300px]"
        alt={post.title}
        src={post.image}
        width={600}
        height={300}
      />
      <PostContent post={post} />
    </Link>
  );
}

export default PostCard;
