import { TfiSearch } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { BlogData } from "../../TypeDefinition/TypeDefinition";

interface SearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  blogs: BlogData[];
  onSearch: () => void;
}

const SearchBar = ({ onChange, onReset, blogs, onSearch }: SearchBarProps) => {
  return (
    <div className="dropdown dropdown-end  mr-2 relative">
      <input
        type="text"
        onChange={(e) => onChange(e)}
        placeholder="Search"
        className="border px-3 py-1 bg-[#F4F4F5] dark:text-[#A1A1AA] dark:bg-[#242535] dark:border-none rounded-md w-full max-w-xs"
      />
      <TfiSearch
        onClick={onSearch}
        className="absolute dark:text-[#52525B] bottom-2 right-2 cursor-pointer overflow-hidden"
      />
      {blogs.length > 0 && (
        <div className="absolute mt-2 bg-white border border-[#E8E8EA] dark:bg-[#181A2A] dark:border-[#242535] z-10 p-2 rounded-xl space-y-1 overflow-x-auto max-h-40">
          {blogs.map((blog: BlogData) => (
            <Link
              to={`/blogs/${blog.slug}`}
              onClick={onReset}
              className="bg-white border dark:bg-[#242535]  border-[#E8E8EA] dark:border-[#242535]  p-1 rounded-md inline-block"
              key={blog._id}
            >
              {blog.title.length > 40
                ? blog.title.slice(0, 40) + "..."
                : blog.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
