import "react-photo-view/dist/react-photo-view.css";
import { Link } from "react-router-dom";

import { format, parseISO } from "date-fns";

import "aos/dist/aos.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { FC } from "react";
import { BlogData } from "../../TypeDefinition/TypeDefinition";

type BlogCardProps = {
  blog: BlogData;
};

const BlogCard: FC<BlogCardProps> = ({ blog }): JSX.Element => {
  const { title, photoUrl, category, authorName, authorImg, published, slug } =
    blog;

  const isValidDate = published && !isNaN(Date.parse(published));

  const publishDate = isValidDate
    ? format(parseISO(published), "MMMM dd, yyyy")
    : null;

  return (
    <Link
      to={`/blogs/${slug}`}
      className="bg-white border border-[#E8E8EA] dark:bg-[#181A2A] dark:border-[#242535] p-4 rounded-xl max-w-[392px] flex flex-col"
    >
      <PhotoProvider>
        <PhotoView src={photoUrl}>
          <div className="h-[170px] md:h-[240px] max-w-[360px] overflow-hidden rounded-md">
            <img
              className="h-full w-full hover:scale-105 ease-out transition-transform duration-300 rounded-md object-cover"
              src={photoUrl}
              alt={title}
            />
          </div>
        </PhotoView>
      </PhotoProvider>
      <div className="mt-6">
        <span
          style={{ backgroundColor: "rgba(75, 107, 251, 0.05)" }}
          className="px-[10px] py-1 text-[#4B6BFB] text-sm font-medium"
        >
          {category[0].toUpperCase() + category.slice(1)}
        </span>
      </div>
      <h2 className="mt-4 dark:text-white text-2xl font-semibold mb-5">
        {title}
      </h2>

      {/* author details */}
      <div className="flex gap-3 items-center mt-auto dark:text-[#97989F]">
        <img
          src={authorImg}
          className="max-w-[36px] max-h-[36px] min-w-[36px] min-h-[36px] object-cover rounded-full"
          alt=""
        />
        <p className="text-[#97989F] text-base font-medium">{authorName}</p>
        <p className="ml-2 font-normal text-base text-[#97989F]">
          {publishDate}
        </p>
      </div>
    </Link>
  );
};

export default BlogCard;
