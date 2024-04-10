import parse from "html-react-parser";
import Image from "next/image";

const PostBody = ({ body }: { body: string }) => {
  const options = {
    replace: (domNode) => {
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
  const getParsedHTML = (body: string) => {
    return parse(body, options);
  };

  return <div className="rich-text">{getParsedHTML(body)}</div>;
};
export default PostBody;
