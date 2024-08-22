import { ChakraProvider } from "@chakra-ui/react";
import CardSkeleton from "../Skeletons/CardSkeleton/CardSkeleton";
import BlogCard from "../BlogCard/BlogCard";
import { BlogData } from "../../TypeDefinition/TypeDefinition";

type AllBlogProps = {
  allBlogs: BlogData[];
  loading: boolean;
};

const Blogs = ({ allBlogs, loading }: AllBlogProps) => {
  return (
    <ChakraProvider>
      {loading ? (
        <CardSkeleton />
      ) : (
        <div className="flex justify-center">
          {allBlogs?.length > 0 ? (
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
              {allBlogs.map((blog) => (
                <BlogCard key={blog.slug} blog={blog}></BlogCard>
              ))}
            </div>
          ) : (
            <h1 className="text-3xl dark:text-white font-semibold text-center">
              No Blogs Found
            </h1>
          )}
        </div>
      )}
    </ChakraProvider>
  );
};

export default Blogs;
