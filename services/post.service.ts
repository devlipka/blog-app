//@ts-nocheck
// TODO: get rid of @ts-nocheck
import { cache } from "react";
import { directus } from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { Post } from "@/types/collection";

export const getPostData = cache(
  async (postSlug: string, locale: string): Promise<Post> => {
    try {
      const post: Post = await directus.request(
        readItems("post", {
          filter: {
            slug: {
              _eq: postSlug,
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

      if (locale === "en") {
        return postData;
      } else {
        return {
          ...postData,
          title: postData?.translations?.[0]?.title,
          description: postData?.translations?.[0]?.description,
          body: postData?.translations?.[0]?.body,
          category: {
            ...postData,
            title: postData?.category?.translations?.[0]?.title,
          },
        };
      }
    } catch (error) {
      console.error(error);

      throw new Error(error);
    }
  },
);

export const getAllPosts = async (lang: string): Promise<Post[]> => {
  try {
    const posts: Post[] = await directus.request(
      readItems("post", {
        fields: [
          "*",
          "author.id",
          "author.first_name",
          "author.last_name",
          "category.id",
          "category.title",
          "category.translations.*",
          "translations.*",
        ],
      }),
    );

    if (lang === "en") {
      return posts;
    } else {
      return posts?.map((post: Post) => {
        return {
          ...post,
          title: post.translations[0].title,
          description: post.translations[0].description,
          body: post.translations[0].body,
          category: {
            ...post.category,
            title: post.category.translations[0].title,
          },
        };
      });
    }
  } catch (error) {
    console.error(error);

    throw new Error(error);
  }
};
