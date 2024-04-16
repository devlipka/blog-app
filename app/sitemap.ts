import { MetadataRoute } from "next";
import { getAllPosts } from "@/app/[lang]/page";
import { directus } from "@/lib/directus";
import { readItems } from "@directus/sdk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL;

  const posts = await directus.request(
    readItems("post", {
      fields: ["slug", "date_updated"],
    }),
  );

  const postLinks = posts?.map((post) => {
    return [
      {
        url: `${baseURL}/en/post/${post.slug}`,
        lastModified: new Date(post.date_updated),
      },
      {
        url: `${baseURL}/de/post/${post.slug}`,
        lastModified: new Date(post.date_updated),
      },
      {
        url: `${baseURL}/post/${post.slug}`,
        lastModified: new Date(post.date_updated),
      },
    ];
  });

  const categories = await directus.request(
    readItems("category", {
      fields: ["slug", "date_updated"],
    }),
  );

  const categoriesLinks = categories?.map((category) => {
    return [
      {
        url: `${baseURL}/en/${category.slug}`,
        lastModified: new Date(),
      },
      {
        url: `${baseURL}/de/${category.slug}`,
        lastModified: new Date(),
      },
      {
        url: `${baseURL}/${category.slug}`,
        lastModified: new Date(),
      },
    ];
  });

  const dynamicLinks = postLinks?.concat(categoriesLinks ?? []).flat() ?? [];

  return [
    {
      url: baseURL,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/en`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/de`,
      lastModified: new Date(),
    },
    ...dynamicLinks,
  ];
}
