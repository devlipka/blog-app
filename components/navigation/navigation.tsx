import Link from "next/link";
import PaddingContainer from "@/components/layout/padding-container";
import { getDictionary } from "@/lib/getDictionary";
import LanguageSwitcher from "@/components/navigation/language-switcher";

const Navigation = async ({ locale }: { locale: string }) => {
  const dictionary = await getDictionary(locale);

  return (
    <div className="z-[999] border-b sticky top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md">
      <PaddingContainer>
        <div className="flex items-center justify-between py-5">
          <Link href={`/${locale}`} className="font-bold text-lg">
            Explorer
          </Link>
          {/*Category Links*/}
          <nav>
            <ul className="flex items-center gap-4 text-neutral-600">
              <li>
                <LanguageSwitcher locale={locale} />
              </li>
              <li>
                <Link href={`/${locale}/cities`}>
                  {dictionary.navigation.links.cities}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/experiences`}>
                  {dictionary.navigation.links.experience}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </PaddingContainer>
    </div>
  );
};
export default Navigation;
