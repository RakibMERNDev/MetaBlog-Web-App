import { useState } from "react";
import useAuth from "./useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../api/useAxiosPublic";
import { RegisterFormData } from "../TypeDefinition/TypeDefinition";

export const useRegister = () => {
  const { registerUser, updateUserProfile, sendVerificationEmail } = useAuth();

  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    const name = data?.name;
    const avatarImg = data?.photo[0];
    const email = data?.email;
    const password = data?.password;

    const imgApiKey = import.meta.env.VITE_IMG_API_KEY;

    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imgApiKey}`;

    const formData = new FormData();
    if (avatarImg) {
      formData.append("image", avatarImg);
    }

    const response = await axiosPublic.post(image_hosting_api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const photo = await response.data.data.display_url;
    console.log(photo);

    const res = await registerUser(email, password);
    if (res) {
      await updateUserProfile(name, photo);
      await sendVerificationEmail();
      setLoading(false);
      navigate(from, { replace: true });
    } else {
      setLoading(false);
    }
  };

  return {
    loading,
    showPass,
    register,
    handleSubmit,
    onSubmit,
    setShowPass,
    errors,
  };
};
