import { ChakraProvider } from "@chakra-ui/react";
import CardSkeleton from "../Skeletons/CardSkeleton/CardSkeleton";

import BlogCard from "../BlogCard/BlogCard";
import { BlogData } from "../../TypeDefinition/TypeDefinition";

interface BlogByUserProps {
  isLoading: boolean;
  data: BlogData[];
}

const BlogByUser = ({ isLoading, data }: BlogByUserProps) => {
  return (
    <section className="mb-24 w-full">
      <ChakraProvider>
        {isLoading ? (
          <CardSkeleton />
        ) : (
          <>
            {data.length > 0 ? (
              <>
                <h3 className="text-2xl px-4 xl:px-0 font-bold my-5 dark:text-white ">
                  Blogs by you
                </h3>
                <div className="flex justify-center px-4 xl:px-0 w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
                    {data.map((blog) => (
                      <BlogCard key={blog.slug} blog={blog}></BlogCard>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-2xl px-4 xl:px-0 font-bold my-5 dark:text-white ">
                  {"You haven't wrote any blogs yet"}
                </h3>
              </>
            )}
          </>
        )}
      </ChakraProvider>
    </section>
  );
};

export default BlogByUser;
