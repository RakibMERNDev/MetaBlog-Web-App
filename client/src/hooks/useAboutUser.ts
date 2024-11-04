import React, { useRef, useState } from "react";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../api/useAxiosSecure";
import useAxiosPublic from "../api/useAxiosPublic";
import { UserData } from "../TypeDefinition/TypeDefinition";

const useAboutUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const {
    data = {} as UserData,
    isLoading,
    refetch,
  } = useQuery<UserData>({
    queryKey: ["userDetails", user?.uid],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user?.uid}`);
      return res.data.data;
    },
  });

  const [edit, setEdit] = useState(false);
  const about = useRef<HTMLTextAreaElement>(null);

  const handleEdit = () => {
    setEdit((prev) => !prev);
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();

    await axiosSecure.put(`/users/${user?.uid}`, {
      bio: about.current?.value,
    });
    refetch();

    setEdit((prev) => !prev);
  };

  return { data, isLoading, edit, handleEdit, handleSave, about, user };
};

export default useAboutUser;
