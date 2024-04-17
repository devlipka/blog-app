// @ts-nocheck
// TODO: get rid of @ts-nocheck
import { cache } from "react";
import { directus } from "@/lib/directus";
import { readItems } from "@directus/sdk";

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
