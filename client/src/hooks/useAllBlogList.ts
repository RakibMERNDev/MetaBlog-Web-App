import { useEffect, useState } from "react";
import useTotalPageCount from "./useTotalPageCount";
import { BlogsProps } from "../api/useBlogData";
import useAxiosSecure from "../api/useAxiosSecure";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const useAllBlogList = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);

  const [status, setStatus] = useState("all");

  // ! Fetch all blogs
  const {
    data = [] as BlogsProps[],
    isLoading,
    refetch,
    isError,
  } = useQuery<BlogsProps[]>({
    queryKey: ["blogs-list", currentPage, status],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/admin/blogs?page=${currentPage}&status=${status}`
      );

      return response.data.data;
    },
  });

  // ! pagination

  const { pages, reload } = useTotalPageCount(status);

  const totalPages = [...Array(pages).keys()];

  // ! Handle the page change

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch();
    navigate(`/dashboard/all-blogs?page=${page}&status=${status}`);
  };

  // ! Change the status of the blog

  const handleChangeStatus = async (id: string, cstatus: string) => {
    const status = cstatus === "published" ? "draft" : "published";

    Swal.fire({
      title: "Do you want to change the staus of the blog?",
      text: `Blog status will be changed from ${cstatus} to ${status}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.patch(`/admin/blogs/${id}`, {
            status,
          });

          if (response.data.success) {
            refetch();
            Swal.fire({
              title: "Success!",
              text: `${response.data.message} !!`,
              icon: "success",
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  // ! Delete the blog

  const handleDeleteBlog = async (id: string) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "This blog will be deleted and you won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/admin/blogs/${id}`);
          if (response.data.success) {
            refetch();
            Swal.fire({
              title: "Success!",
              text: "Blog has been deleted !!.",
              icon: "success",
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  // ! handle sorting blogs based on status

  useEffect(() => {
    refetch();
  }, [status,refetch]);

  const handleFilter = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    reload();
    const newStatus = e.target.value;
    await setStatus(newStatus);
    await setCurrentPage(1);

    if (newStatus === "all") {
      await navigate(`/dashboard/all-blogs?page=1&status=all`);
    } else {
      await navigate(`/dashboard/all-blogs?page=1&status=${newStatus}`);
    }
  };

  return {
    data,
    isLoading,
    isError,
    totalPages,
    handlePageChange,
    handleChangeStatus,
    handleDeleteBlog,
    handleFilter,
    status,
  };
};

export default useAllBlogList;
