import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

interface ILoginInputs {
  email: string;
  password: string;
}

interface INewErrors {
  email: string;
  password: string;
}

const useLogin = () => {
  const searchParams = useSearchParams();
  const [inputs, setInputs] = useState<ILoginInputs>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [isErrors, setIsErrors] = useState<INewErrors>({
    email: "",
    password: "",
  });

  useEffect(() => {
    const data = searchParams.get("account-created");
    if (data) {
      toast.success("Account created successfully");
    }
  }, [searchParams]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const validateInputs = () => {
    const newErrors: INewErrors = { email: "", password: "" };
    if (!inputs.email) {
      newErrors.email = "Email is required";
    }
    if (!inputs.password) {
      newErrors.password = "Password is required";
    }
    setIsErrors(newErrors);
    if (Object.values(newErrors).some((error) => error !== "")) {
      setLoading(false);
      return true;
    }
    return false;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    // for input validation
    const shouldReturn = validateInputs();
    if (shouldReturn) {
      return;
    }
    try {
      const result = await signIn("credentials", {
        username: inputs.email,
        password: inputs.password,
        redirect: true,
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.log(error);
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

export default useLogin;
