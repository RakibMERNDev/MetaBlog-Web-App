import JoditEditor from "jodit-react";
import { FaSpinner } from "react-icons/fa";
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { BlogData } from "../../TypeDefinition/TypeDefinition";

type BlogFormProps = {
  item?: BlogData;
  buttonText: string;
  content: string;
  setContent: (content: string) => void;
  handleSubmit: UseFormHandleSubmit<FieldValues, FieldValues>;
  Submit: SubmitHandler<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<BlogData>;
  loading: boolean;
};

const BlogFrom = ({
  item,
  buttonText,
  content,
  setContent,
  handleSubmit,
  Submit,
  register,
  loading,
  errors,
}: BlogFormProps) => {
  return (
    <form className="card-body" onSubmit={handleSubmit(Submit)}>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-black dark:text-white">Title</span>
        </label>
        <input
          type="text"
          placeholder="Blog's title"
          className="appearance-none focus:outline-none p-2 rounded-sm bg-gray-200 dark:bg-white dark:border-white focus:bg-gray-100 dark:focus:bg-gray-100"
          defaultValue={item?.title || ""}
          {...register("title", {
            required: "Title is required !!",
          })}
        />
        {errors.title && (
          <p className="text-red-600 font-semibold mt-2">
            {errors.title && typeof errors.title.message === "string"
              ? errors.title.message
              : ""}
          </p>
        )}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-black dark:text-white">
            Blog Thumbnail
          </span>
        </label>
        <input
          type="file"
          accept="image/*"
          placeholder="Thumbnail link"
          className="appearance-none focus:outline-none p-2 rounded-sm bg-gray-200 dark:bg-white dark:border-white focus:bg-gray-100 dark:focus:bg-gray-100"
          {...register("photoUrl", {
            required: "Thumbnail is required !!",
          })}
        />
        {errors.photoUrl && (
          <p className="text-red-600 font-semibold mt-2">
            {errors.photoUrl && typeof errors.photoUrl.message === "string"
              ? errors.photoUrl.message
              : ""}
          </p>
        )}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-black dark:text-white">
            Choose a Category
          </span>
        </label>
        <select
          className="appearance-none focus:outline-none p-2 rounded-sm bg-gray-200 dark:bg-white dark:border-white w-full focus:bg-gray-100 dark:focus:bg-gray-100"
          defaultValue={item?.category || ""}
          {...register("category", {
            required: "Category is required !!",
          })}
        >
          <option value="lifestyle">Life Style</option>
          <option value="technology">Technology</option>
          <option value="travel">Travel</option>
          <option value="business">Business</option>
          <option value="economy">Economy</option>
          <option value="sports">Sports</option>
        </select>
        {errors.category && (
          <p className="text-red-600 font-semibold mt-2">
            {errors.category && typeof errors.category.message === "string"
              ? errors.category.message
              : ""}
          </p>
        )}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-black dark:text-white">Body</span>
        </label>
        <JoditEditor
          value={item?.content || content || ""}
          onChange={(newContent) => setContent(newContent)}
        />
      </div>
      <div className="form-control mt-6">
        <button
          disabled={loading}
          className=" py-2 rounded-md text-white bg-[#394eac] hover:bg-blue-400 transition-colors duration-300  dark:bg-[#24378e] dark:hover:bg-blue-400  uppercase w-32 mx-auto flex justify-center items-center gap-2"
        >
          {loading ? (
            <span>
              <FaSpinner className="animate-spin m-auto" />
            </span>
          ) : (
            <span>{buttonText}</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default BlogFrom;
