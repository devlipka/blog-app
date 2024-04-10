import PaddingContainer from "@/components/layout/padding-container";
import PostCard from "@/components/post/post-card";
import PostList from "@/components/post/post-list";
import CTACard from "@/components/elements/cta-card";
import { directus } from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { notFound } from "next/navigation";
import { Post } from "@/types/collection";

export default async function Home() {
  const getAllPosts = async () => {
    try {
      return await directus.request(
        readItems("post", {
          fields: [
            "*",
            "author.id",
            "author.first_name",
            "author.last_name",
            "category.id",
            "category.title",
          ],
        }),
      );
    } catch (error) {
      console.error(error);

      throw new Error(error);
    }
  };

  const posts = await getAllPosts();

  if (!posts) {
    notFound();
  }

  return (
    <PaddingContainer>
      <main className="h-auto space-y-10">
        <PostCard post={posts[0] as Post} />
        <PostList
          posts={posts.filter((_post, index) => index > 0 && index < 3)}
        />
        <CTACard />
        <PostCard reverse post={posts[3] as Post} />

        <PostList
          posts={posts.filter((_post, index) => index > 3 && index < 6)}
        />
      </main>
    </PaddingContainer>
  );
}
