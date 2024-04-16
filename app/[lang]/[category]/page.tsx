import PaddingContainer from "@/components/layout/padding-container";
import PostList from "@/components/post/post-list";
import { directus } from "@/lib/directus";
import { Post } from "@/types/collection";
import { readItems } from "@directus/sdk";
import { notFound } from "next/navigation";
import { getParsedHTML } from "@/lib/parseHTML";
import { cache } from "react";
import siteConfig from "@/config/site";

export const generateStaticParams = async () => {
  try {
    const categories = await directus.request(
      readItems("category", {
        filter: {
          slug: {
            _eq: "published",
          },
        },
        fields: ["slug"],
      }),
    );

    const params = categories?.map((category) => {
      return {
        category: category.slug as string,
        lang: "en",
      };
    });

    const localisedParams = categories?.map((category) => {
      return {
        category: category.slug as string,
        lang: "de",
      };
    });

    return params?.concat(localisedParams ?? []) || [];
  } catch (error) {
    console.error(error);

    throw new Error(error);
  }
};

export const getCategoryData = cache(
  async (categorySlug: string, locale: string) => {
    try {
      const category = await directus.request(
        readItems("category", {
          filter: {
            slug: {
              _eq: categorySlug,
            },
          },
          fields: [
            "*",
            "translations.*",
            "posts.*",
            "posts.author.id",
            "posts.author.first_name",
            "posts.author.last_name",
            "posts.category.id",
            "posts.category.title",
            "posts.translations.*",
          ],
        }),
      );
      const fetchedCategory = category[0];

      if (locale === "en") {
        return fetchedCategory;
      } else {
        return {
          ...fetchedCategory,
          title: fetchedCategory.translations[0].title,
          description: fetchedCategory.translations[0].description,
          posts: fetchedCategory.posts.map((post) => {
            return {
              ...post,
              title: post.translations[0].title,
              description: post.translations[0].description,
              body: post.translations[0].body,
              category: {
                ...post.category,
                title: fetchedCategory.translations[0].title,
              },
            };
          }),
        };
      }
    } catch (error) {
      console.error(error);

      throw new Error(error);
    }
  },
);

export const generateMetadata = async ({
  params: { category, lang },
}: {
  params: {
    category: string;
    lang: string;
  };
}) => {
  const categoryData = await getCategoryData(category, lang);

  return {
    title: categoryData?.title,
    description: categoryData?.description,
    openGraph: {
      title: categoryData?.title,
      description: categoryData?.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${category}`,
      siteName: categoryData?.title,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${category}/opengraph-image`,
          width: 1200,
          height: 628,
        },
      ],
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${category}`,
      languages: {
        en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/${category}`,
        de: `${process.env.NEXT_PUBLIC_SITE_URL}/de/${category}`,
      },
    },
  };
};

const Page = async ({
  params,
}: {
  params: { category: string; lang: string };
}) => {
  const locale = params.lang;
  const categorySlug = params.category;
  const category = await getCategoryData(categorySlug, locale);

  if (!category) {
    notFound();
  }

  const typeCorrectedCategory = category as unknown as {
    id: string;
    title: string;
    description: string;
    slug: string;
    posts: Post[];
  };

  return (
    <PaddingContainer>
      <div className="mb-10">
        <h1 className="text-4xl font-semibold">
          {typeCorrectedCategory?.title}
        </h1>
        <div className="text-lg text-neutral-600">
          <div className="rich-text">
            {getParsedHTML({ body: typeCorrectedCategory?.description || "" })}
          </div>
        </div>
      </div>
      <PostList locale={params.lang} posts={typeCorrectedCategory.posts} />
    </PaddingContainer>
  );
};
export default Page;
