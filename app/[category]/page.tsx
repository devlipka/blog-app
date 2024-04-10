import PaddingContainer from "@/components/layout/padding-container";
import PostList from "@/components/post/post-list";
import { directus } from "@/lib/directus";
import { Post } from "@/types/collection";
import { readItems } from "@directus/sdk";
import { notFound } from "next/navigation";

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
      };
    });

    return params || [];
  } catch (error) {
    console.error(error);

    throw new Error(error);
  }
};
const Page = async ({ params }: { params: { category: string } }) => {
  const getCategoryData = async () => {
    try {
      const category = await directus.request(
        readItems("category", {
          filter: {
            slug: {
              _eq: params.category,
            },
          },
          fields: [
            "*",
            "posts.*",
            "posts.author.id",
            "posts.author.first_name",
            "posts.author.last_name",
            "posts.category.id",
            "posts.category.title",
          ],
        }),
      );
      return category[0];
    } catch (error) {
      console.error(error);

      throw new Error(error);
    }
  };

  const category = await getCategoryData();

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
        <p className="text-lg text-neutral-600">
          {typeCorrectedCategory?.description}
        </p>
      </div>
      <PostList posts={typeCorrectedCategory.posts} />
    </PaddingContainer>
  );
};
export default Page;
