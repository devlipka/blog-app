import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation/navigation";
import Footer from "@/components/navigation/footer";
import Head from "next/head";
import { getDictionary } from "@/lib/getDictionary";
import siteConfig from "@/config/site";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });
export const generateMetadata = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
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

export default function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: {
    lang: string;
  };
}>) {
  return (
    <html lang={lang}>
      {/*TODO Move Head to Metadata*/}
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-SZ3DL56MMT"
      />
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-SZ3DL56MMT');`}
      </Script>
      <body className={inter.className}>
        <Navigation locale={lang} />
        <div className="pt-10 min-h-[100vh]">{children}</div>
        <Footer locale={lang} />
      </body>
    </html>
  );
}
