import PaddingContainer from "@/components/layout/padding-container";
import PostCard from "@/components/post/post-card";
import PostList from "@/components/post/post-list";
import CTACard from "@/components/elements/cta-card";
import { notFound } from "next/navigation";
import { Post } from "@/types/collection";
import { getDictionary } from "@/lib/getDictionary";
import { getAllPosts } from "@/services/post.service";

export default async function Home({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  const posts = await getAllPosts(lang);

  if (!posts) {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  return (
    <PaddingContainer>
      <main className="h-auto space-y-10">
        <PostCard locale={lang} post={posts[0] as Post} />
        <PostList
          locale={lang}
          posts={posts.filter((_post, index) => index > 0 && index < 3)}
        />
        <CTACard dictionary={dictionary} />
        <PostCard locale={lang} reverse post={posts[3] as Post} />

        <PostList
          locale={lang}
          posts={posts.filter((_post, index) => index > 3 && index < 6)}
        />
      </main>
    </PaddingContainer>
  );
}
