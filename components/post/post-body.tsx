import { getParsedHTML } from "@/lib/parseHTML";

const PostBody = ({ body }: { body: string }) => {
  return <div className="rich-text">{getParsedHTML({ body })}</div>;
};
export default PostBody;
