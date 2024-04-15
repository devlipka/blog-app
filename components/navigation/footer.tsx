import siteConfig from "@/config/site";
import PaddingContainer from "@/components/layout/padding-container";
import Link from "next/link";
import SocialLink from "@/components/elements/social-link";
import { getDictionary } from "@/lib/getDictionary";

async function Footer({ locale }: { locale: string }) {
  const dictionary = await getDictionary(locale);

  return (
    <div className="py-6 mt-10 border-t">
      <PaddingContainer>
        <div>
          <h2 className="text-3xl font-bold">{siteConfig.siteName}</h2>
          <p className="max-w-md mt-2 text-lg text-neutral-700">
            {dictionary.footer.description}
          </p>
        </div>
        {/*Social and Currently at*/}
        <div className="mt-6 flex flex-wrap justify-between gap-4 mt-6">
          <div>
            <div className="font-medium text-lg">#exploretheworld</div>
            <div className="flex items-center gap-3 mt-2 text-neutral-600">
              <SocialLink
                platform="twitter"
                link={siteConfig.socialLinks.twitter}
              />
              <SocialLink
                platform="instagram"
                link={siteConfig.socialLinks.instagram}
              />
              <SocialLink
                platform="github"
                link={siteConfig.socialLinks.github}
              />
              <SocialLink
                platform="youtube"
                link={siteConfig.socialLinks.youtube}
              />
              <SocialLink
                platform="linkedin"
                link={siteConfig.socialLinks.linkedin}
              />
            </div>
          </div>
          <div>
            <div className="text-sm text-neutral-400">
              {dictionary.footer.currentlyAtText}
            </div>
            <div className="bg-white px-3 py-2 shadow-md rounded-md flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              {siteConfig.currentlyAt}
            </div>
          </div>
        </div>
        {/*Bottom section*/}
        <div className="border-t py-3 flex items-center gap-4 flex-wrap justify-between mt-16 border-t">
          <div className="text-sm text-neutral">
            {dictionary.footer.rightsText} {new Date().getFullYear()}
          </div>
          <div className="text-sm">
            {dictionary.footer.creatorText}{" "}
            <Link href="/" className="underline underline-offset-4">
              @dev-lipka
            </Link>
          </div>
        </div>
      </PaddingContainer>
    </div>
  );
}

export default Footer;
