interface Dictionary {
  navigation: {
    links: {
      [k: string]: string;
    };
  };
  buttons: {
    [k: string]: string;
  };
  ctaCard: {
    [k: string]: string;
  };
  footer: {
    [k: string]: string;
  };
}

interface Dictionaries {
  en: () => Promise<Dictionary>;
  de: () => Promise<Dictionary>;
}

const dictionaries: Dictionaries = {
  en: () =>
    import("./../dictionaries/en.json").then((module) => module.default),
  de: () =>
    import("./../dictionaries/de.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  if (!locale || !(locale in dictionaries)) {
    return dictionaries["en"](); // Default to 'en' if locale is not provided or not in the dictionaries object
  }
  return dictionaries[locale as keyof Dictionaries](); // Call the function corresponding to the given locale
};
