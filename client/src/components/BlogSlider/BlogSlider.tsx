import { Swiper, SwiperSlide } from "swiper/react";
import { BlogsProps } from "../../api/useBlogData";
import FsSkeleton from "../Skeletons/FeaturedSliderSkeleton/FsSkeleton";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

interface BlogSliderProps {
  isLoading: boolean;
  data: BlogsProps[];
}

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
          {data.map((blog: BlogsProps) => (
            <SwiperSlide key={blog._id} style={{ borderRadius: "12px" }}>
              <Link to={`/blogs/${blog._id}`}>
                <div className="max-w-[1216px] overflow-hidden rounded-xl">
                  <div
                    style={{
                      backgroundImage: `url(${blog.photoUrl})`,
                    }}
                    className=" h-[450px] my-12 rounded-xl flex bg-cover bg-no-repeat max-w-[1216px]"
                  >
                    {/* details */}
                    <div className="p-10 self-end">
                      <p className="text-white bg-[#4B6BFB] inline-block py-1 px-[10px] rounded-md text-sm font-medium mb-4">
                        {blog.category}
                      </p>
                      <h2 className="text-white text-3xl font-semibold max-w-[720px]">
                        {blog.title}
                      </h2>
                      <div className="text-white flex items-center gap-5 mt-6">
                        <img
                          src={blog.authorImg}
                          alt="author-image"
                          className="max-w-[36px] max-h-[36px] rounded-full"
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
