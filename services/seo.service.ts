import { getCategoryData } from "@/services/category.service";
import { getPostData } from "@/services/post.service";
import { getDictionary } from "@/lib/getDictionary";
import siteConfig from "@/config/site";

interface GenerateCategoryMetadataProps {
  category: string;
  lang: string;
}

interface GeneratePostMetadataProps {
  slug: string;
  lang: string;
}

interface GenerateMainMetadataProps {
  lang: string;
}

export const generateCategoryMetadata = async ({
  category,
  lang,
}: GenerateCategoryMetadataProps) => {
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

export const generatePostMetadata = async ({
  slug,
  lang,
}: GeneratePostMetadataProps) => {
  const post = await getPostData(slug, lang);

  return {
    title: post?.title,
    description: post?.description,
    openGraph: {
      title: post?.title,
      description: post?.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/post/${slug}`,
      siteName: post?.title,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/post/${slug}/opengraph-image`,
          width: 1200,
          height: 628,
        },
      ],
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${slug}`,
      languages: {
        en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/post/${slug}`,
        de: `${process.env.NEXT_PUBLIC_SITE_URL}/de/post/${slug}`,
      },
    },
  };
};

export const generateMainMetadata = async ({
  lang,
}: GenerateMainMetadataProps) => {
  const dictionary = await getDictionary(lang);

  return {
    title: {
      template: "%s | " + siteConfig.siteName,
      default: siteConfig.siteName,
    },
    description: dictionary.footer.description,
    openGraph: {
      title: siteConfig.siteName,
      description: siteConfig.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}`,
      siteName: siteConfig.siteName,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/opengraph-image.png`,
          width: 1200,
          height: 628,
        },
      ],
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}`,
      languages: {
        en: `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
        de: `${process.env.NEXT_PUBLIC_SITE_URL}/de`,
      },
    },
  };
};
