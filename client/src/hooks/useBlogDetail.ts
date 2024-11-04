import { format, parseISO } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "./useAuth";
import useAxiosSecure from "../api/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAllBlogs from "./useAllBlogs";
import { BlogData } from "../TypeDefinition/TypeDefinition";

const useBlogDetail = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const params = useParams();
  const navigate = useNavigate();

  const {
    data = {} as BlogData,
    isLoading,
    refetch: fecthing,
  } = useQuery<BlogData>({
    queryKey: ["blog", params.id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs/${params.id}`);

      return res.data;
    },
  });

  const {
    _id,
    title,
    photoUrl,
    authorImg,
    authorName,
    published,
    authorId,
    content,
    slug,
  } = data || {};

  const isValidDate = published && !isNaN(Date.parse(published));

  const publishDate = isValidDate
    ? format(parseISO(published), "MMMM dd, yyyy")
    : null;

  // !delete blog

  const { refetch } = useAllBlogs();

  const handleDelete = (id: string) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
        popup: "dark:bg-[#242535] dark:text-white",
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.delete(`/blogs/${id}`);

          if (res.data.success) {
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your Blog has been deleted.",
              icon: "success",
            });
            refetch();
            navigate("/dashboard/profile");
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your Blog is safe :)",
            icon: "error",
          });
        }
      });
  };

  return {
    isLoading,
    handleDelete,
    publishDate,
    authorName,
    authorImg,
    title,
    photoUrl,
    content,
    authorId,
    _id,
    user,
    data,
    fecthing,
    slug,
  };
};

export default useBlogDetail;
