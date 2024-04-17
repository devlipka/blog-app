import PaddingContainer from "@/components/layout/padding-container";
import PostList from "@/components/post/post-list";
import { directus } from "@/lib/directus";
import { Post } from "@/types/collection";
import { readItems } from "@directus/sdk";
import { notFound } from "next/navigation";
import { getParsedHTML } from "@/lib/parseHTML";
import { getCategoryData } from "@/services/category.service";
import { generateCategoryMetadata } from "@/services/seo.service";

// TODO: fix type
export const generateStaticParams = async (): Promise<any[]> => {
  try {
    const categories = await directus.request(
      // TODO: get rid of ts-ignore
      //@ts-ignore
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
    return [];
  }
};

export const generateMetadata = async ({
  params: { category, lang },
}: {
  params: {
    category: string;
    lang: string;
  };
}) => generateCategoryMetadata({ category, lang });

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
