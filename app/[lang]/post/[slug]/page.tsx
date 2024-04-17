import { notFound } from "next/navigation";
import PaddingContainer from "@/components/layout/padding-container";
import PostHero from "@/components/post/post-hero";
import SocialLink from "@/components/elements/social-link";
import PostBody from "@/components/post/post-body";
import CTACard from "@/components/elements/cta-card";
import { directus } from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { Post } from "@/types/collection";
import siteConfig from "@/config/site";
import { getDictionary } from "@/lib/getDictionary";
import { generatePostMetadata } from "@/services/seo.service";
import { getPostData } from "@/services/post.service";

// TODO: fix type
export const generateStaticParams = async (): Promise<any[]> => {
  try {
    const posts = await directus.request(
      // TODO: get rid of ts-ignore
      //@ts-ignore
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
    return [];
  }
};

export const generateMetadata = async ({
  params: { slug, lang },
}: {
  params: {
    slug: string;
    lang: string;
  };
}) => generatePostMetadata({ slug, lang });

const Page = async ({
  params,
}: {
  params: {
    slug: string;
    lang: string;
  };
}) => {
  const post: Post = (await getPostData(params.slug, params.lang)) as Post;

  if (!post) {
    notFound();
  }

  const dictionary = await getDictionary(params.lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.lang}/post/${params.slug}/opengraph-image`,
    author: post.author.first_name + " " + post.author.last_name,
    genre: post.category.title,
    publisher: siteConfig.siteName,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${params.slug}`,
    datePublished: new Date(post.date_created).toISOString(),
    dateCreated: new Date(post.date_created).toISOString(),
    dateModified: new Date(post.date_updated).toISOString(),
    description: post.description,
    articleBody: post.body,
  };

  return (
    <PaddingContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-10">
        <PostHero post={post} locale={params.lang} />
        <div className="flex wrap flex-col md:flex-row gap-10">
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
        </div>
        <CTACard dictionary={dictionary} />
      </div>
    </PaddingContainer>
  );
};
export default Page;
