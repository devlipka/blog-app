import { Post } from "@/types/collection";
import PostCard from "@/components/post/post-card";

interface PostListProps {
  posts: Post[];
  layout?: "horizontal" | "vertical";
}

function PostList({ posts, layout = "vertical" }: PostListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:grid-flow-col lg:auto-cols-fr">
      {posts.map((post) => (
        <PostCard post={post} key={post.id} layout={layout} />
      ))}
    </div>
  );
}

export default PostList;
