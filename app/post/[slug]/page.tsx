import { notFound } from "next/navigation";
import PaddingContainer from "@/components/layout/padding-container";
import PostHero from "@/components/post/post-hero";
import SocialLink from "@/components/elements/social-link";
import PostBody from "@/components/post/post-body";
import CTACard from "@/components/elements/cta-card";
import { directus } from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { Post } from "@/types/collection";
export const generateStaticParams = async () => {
  try {
    const posts = await directus.request(
      readItems("post", {
        filter: {
          status: {
            _eq: "published",
          },
          fields: ["slug"],
        },
      }),
    );

    const params = posts?.map((post) => {
      return {
        slug: post.slug as string,
      };
    });

    return params || [];
  } catch (error) {
    console.error(error);

    throw new Error(error);
  }
};

const Page = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const getPostData = async () => {
    try {
      const post = await directus.request(
        readItems("post", {
          filter: {
            slug: {
              _eq: params.slug,
            },
          },
          fields: [
            "*",
            "category.id",
            "category.title",
            "author.id",
            "author.first_name",
            "author.last_name",
          ],
        }),
      );

      return post[0];
    } catch (error) {
      console.error(error);

      throw new Error(error);
    }
  };

  const post: Post = await getPostData();

  if (!post) {
    notFound();
  }

  return (
    <PaddingContainer>
      <div className="space-y-10">
        <PostHero post={post} />
        <div className="flex flex-col md:flex-row gap-10">
          <div className="relative">
            <div className="sticky top-20 flex items-center md:flex-col gap-5">
              <div className="font-medium md:hidden">Share this content</div>
              <SocialLink
                isShareUrl
                platform="facebook"
                link={`https://www.facebook.com/sharer/sharer.php?u=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
              <SocialLink
                isShareUrl
                platform="twitter"
                link={`https://www.twitter.com/intent/tweet?url=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
              <SocialLink
                isShareUrl
                platform="linkedin"
                link={`https://www.linkedin.com/shareArticle?mini=true&url=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
            </div>
          </div>
          <PostBody body={post.body} />
          <CTACard />
        </div>
      </div>
    </PaddingContainer>
  );
};
export default Page;
