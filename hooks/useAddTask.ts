import { useState } from "react";
import { toast } from "sonner";
import _axios from "@/app/config/axios.config";
import { ITask } from "@/app/interfaces";
import { validatePostInputs } from "@/lib/validateInputs";
import { useGlobalState } from "@/app/context/globalContext";
import handleError from "@/lib/handleError";
import userUser from "./useUser";

const useTaskForm = (
  setOpenAddTaskModel: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const user = userUser();
  const { dispatch } = useGlobalState();
  const [inputs, setInputs] = useState<ITask>({
    description: "",
    status: "Incomplete",
    title: "",
    dueDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [isErrors, setIsErrors] = useState<Partial<ITask>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    setInputs((values) => ({
      ...values,
      [name]: name === "image" && files ? files[0] : value,
    }));
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // for input validation
    if (validatePostInputs(inputs, setIsErrors)) {
      setLoading(false);
      return;
    }

    try {
      const response = await _axios.post("/tasks", inputs, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      toast.success("Post created successfully");
      const { newTask } = response.data;
      setOpenAddTaskModel(false);
      dispatch({ type: "ADD_TASK", payload: newTask });
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    inputs,
    loading,
    isErrors,
    handleChange,
    handleTextAreaChange,
    handleStatusChange,
    handleSubmit,
  };
};

export default useTaskForm;
