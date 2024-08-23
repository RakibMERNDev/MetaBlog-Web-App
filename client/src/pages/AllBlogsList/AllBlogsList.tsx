import { Link } from "react-router-dom";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import useAllBlogList from "../../hooks/useAllBlogList";
import { Helmet } from "react-helmet";
import CategorySelect from "../../components/CategorySelect/CategorySelect";
import Pagination from "../../components/shared/Pagination/Pagination";
import BlogTable from "../../components/BlogTable/BlogTable";

const AllBlogsList = () => {
  const {
    data,
    totalPages,
    handleChangeStatus,
    handleDeleteBlog,
    handlePageChange,
    isError,
    isLoading,
    handleFilter,
    status,
    refetch,
  } = useAllBlogList();

  if (isLoading) return <LoadingSpinner />;

  if (isError)
    return (
      <section className="flex flex-col gap-10 h-screen justify-center items-center">
        <h1 className="text-2xl font-bold text-red-600">
          No Data Found with this query !!
        </h1>
        <Helmet>
          <title>No Data Found | MetaBlog</title>
        </Helmet>
        <Link to="/dashboard" className="btn">
          Go Back to Dashboard
        </Link>
      </section>
    );

  const categoryList = [
    { value: "all", label: "All" },
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
  ];

  return (
    <section className="dark:text-white">
      <h1>All Blogs</h1>
      <>
        <Helmet>
          <title>All Blogs List | MetaBlog</title>
        </Helmet>
      </>
      <>
        <CategorySelect
          category={status}
          handleChange={handleFilter}
          categoryList={categoryList}
        />
      </>
      <div className="overflow-x-auto">
        <BlogTable
          reload={refetch}
          blogs={data}
          handleChangeStatus={handleChangeStatus}
          handleDeleteBlog={handleDeleteBlog}
        />
      </div>
      <Pagination handlePageChange={handlePageChange} pages={totalPages} />
    </section>
  );
};

export default AllBlogsList;
