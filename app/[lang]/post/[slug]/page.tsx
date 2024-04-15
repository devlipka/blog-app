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
        lang: "en",
      };
    });

    const localisedParams = posts?.map((post) => {
      return {
        slug: post.slug as string,
        lang: "de",
      };
    });

    return params?.concat(localisedParams ?? []) || [];
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
    lang: string;
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
            "translations.*",
            "category.translations.*",
          ],
        }),
      );

      const postData = post[0];

      if (params.lang === "en") {
        return postData;
      } else {
        const localisedPostData = {
          ...postData,
          title: postData?.translations?.[0]?.title,
          description: postData?.translations?.[0]?.description,
          body: postData?.translations?.[0]?.body,
          category: {
            ...postData,
            title: postData?.category?.translations?.[0]?.title,
          },
        };

        return localisedPostData;
      }
    } catch (error) {
      console.error(error);

      throw new Error(error);
    }
  };

  const post: Post = (await getPostData()) as Post;

  if (!post) {
    notFound();
  }

  return (
    <PaddingContainer>
      <div className="space-y-10">
        <PostHero post={post} locale={params.lang} />
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
          <CTACard locale={params.lang} />
        </div>
      </div>
    </PaddingContainer>
  );
};
export default Page;
