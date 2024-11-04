import { Swiper, SwiperSlide } from "swiper/react";

import FsSkeleton from "../Skeletons/FeaturedSliderSkeleton/FsSkeleton";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import { BlogData } from "../../TypeDefinition/TypeDefinition";

type BlogSliderProps = {
  isLoading: boolean;
  data: BlogData[];
};

const BlogSlider = ({ isLoading, data }: BlogSliderProps) => {
  return (
    <section>
      {isLoading ? (
        <FsSkeleton />
      ) : (
        <Swiper
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {data.map((blog: BlogData) => (
            <SwiperSlide key={blog.slug} style={{ borderRadius: "12px" }}>
              <Link to={`/blogs/${blog.slug}`}>
                <div className="max-w-[1216px] overflow-hidden rounded-xl">
                  <div
                    style={{
                      backgroundImage: `url(${blog.photoUrl})`,
                      backgroundPosition: "center",
                    }}
                    className=" h-[450px] my-12 rounded-xl flex bg-cover bg-no-repeat max-w-[1216px]"
                  >
                    {/* details */}
                    <div className="p-10 self-end">
                      <p className="text-white bg-[#4B6BFB] inline-block py-1 px-[10px] rounded-md text-sm font-medium mb-4">
                        {blog.category[0].toUpperCase() +
                          blog.category.slice(1)}
                      </p>
                      <h2 className="text-yellow-500 text-3xl font-semibold max-w-[720px]">
                        {blog.title}
                      </h2>
                      <div className="text-yellow-500 flex items-center gap-5 mt-6">
                        <img
                          src={blog.authorImg}
                          alt="author-image"
                          className="max-w-[36px] max-h-[36px] min-w-[36px] min-h-[36px]  object-cover rounded-full"
                        />
                        <h6 className="font-medium text-base">
                          {blog.authorName}
                        </h6>
                        <p className="text-base font-normal">
                          {blog.published && !isNaN(Date.parse(blog.published))
                            ? format(parseISO(blog.published), "MMMM dd, yyyy")
                            : null}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default BlogSlider;
