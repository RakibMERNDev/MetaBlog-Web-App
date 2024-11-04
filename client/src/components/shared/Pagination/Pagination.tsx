type PageProps = {
  handlePageChange: (page: number) => void;
  pages: number[];
};

const Pagination = ({ handlePageChange, pages }: PageProps) => {
  return (
    <div className="join flex justify-center items-center mb-10 mt-auto  w-full">
      {pages.map((i) => (
        <button
          key={i}
          onClick={() => handlePageChange(i + 1)}
          className="join-item btn border-slate-400 dark:border-white bg-[#F6F6F7] transition-colors duration-300 text-center dark:bg-[#242535] dark:text-white dark:hover:bg-[#181A2A]"
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
