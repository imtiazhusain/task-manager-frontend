import { useState } from "react";
import { useRouter } from "next/navigation";

import _axios from "@/app/config/axios.config";
import { ISignUpErrors, ISignUpInputs } from "@/app/interfaces";
import validateInputs from "@/lib/validateInputs";
import handleError from "@/lib/handleError";

const useSignup = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState<ISignUpInputs>({
    name: "",
    email: "",
    password: "",
    profilePic: null,
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [isErrors, setIsErrors] = useState<ISignUpErrors>({
    name: "",
    email: "",
    password: "",
    profilePic: "",
    confirmPassword: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    if (name === "profilePic" && event?.target?.files) {
      setInputs((values) => ({ ...values, [name]: event.target.files![0] }));
    } else {
      const value = event.target.value;
      setInputs((values) => ({ ...values, [name]: value }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const shouldReturn = validateInputs(inputs, setIsErrors);
    if (shouldReturn) {
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("email", inputs.email);
    formData.append("password", inputs.password);
    if (inputs.profilePic) {
      formData.append("profilePic", inputs.profilePic);
    }
    try {
      const response = await _axios.post("/user/signup", formData);
      const responseData = response?.data?.userData;
      router.push(
        `/verify-user?data=${encodeURIComponent(JSON.stringify(responseData))}`
      );
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    inputs,
    isErrors,
    loading,
    handleChange,
    handleSubmit,
  };
};

export default useSignup;
