import Image from "next/image";
import parse from "html-react-parser";

interface GetParsedHTMLProps {
  body: string;
  options?: { replace?: (domNode: any) => JSX.Element };
}

export const getParsedHTML = ({ body, options = {} }: GetParsedHTMLProps) => {
  const defaultOptions = {
    replace: (domNode: any) => {
      if (domNode.name === "img") {
        const { src, alt } = domNode.attribs;

        return (
          <Image
            src={src}
            alt={alt}
            width={1280}
            height={620}
            className="object-cover object-center w-full my-3 rounded-md h-auto max-h-[300px] md:max-h-[500px]"
          />
        );
      }
    },
  };

  return parse(body, { ...defaultOptions, ...options });
};
