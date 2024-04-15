const dictionaries = {
  en: () =>
    import("./../dictionaries/en.json").then((module) => module.default),
  de: () =>
    import("./../dictionaries/de.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  if (!locale || !(locale in dictionaries)) {
    return dictionaries["en"](); // Default to 'en' if locale is not provided or not in the dictionaries object
  }
  return dictionaries[locale](); // Call the function corresponding to the given locale
};
