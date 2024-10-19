import { useState } from "react";
import { useGlobalState } from "@/app/context/globalContext";
import { toast } from "sonner";
import _axios from "@/app/config/axios.config";
import { ITask } from "@/app/interfaces";
import axios from "axios";
import { validatePostInputs } from "@/lib/validateInputs";
import userUser from "@/hooks/useUser";
import handleError from "@/lib/handleError";

interface UseTaskFormProps {
  initialInputs: ITask;
  setOpenModel: React.Dispatch<React.SetStateAction<boolean>>;
  taskId?: string;
}

const useEditTask = ({
  initialInputs,
  setOpenModel,
  taskId,
}: UseTaskFormProps) => {
  const user = userUser();
  const { dispatch } = useGlobalState();
  const [inputs, setInputs] = useState<ITask>(initialInputs);
  const [loading, setLoading] = useState(false);
  const [isErrors, setIsErrors] = useState<ITask>({
    description: "",
    status: "",
    title: "",
    dueDate: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    if (name === "image" && event?.target?.files) {
      setInputs((values) => ({ ...values, [name]: event.target.files![0] }));
    } else {
      const value = event.target.value;
      setInputs((values) => ({ ...values, [name]: value }));
    }
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const shouldReturn = validatePostInputs(inputs, setIsErrors);
    if (shouldReturn) {
      setLoading(false);
      return;
    }

    try {
      const response = taskId
        ? await _axios.patch(`/tasks/${taskId}`, inputs, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.accessToken}`,
            },
          })
        : await _axios.post("/tasks", inputs, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.accessToken}`,
            },
          });

      toast.success(
        taskId ? "Task updated successfully" : "Task created successfully"
      );
      setOpenModel(false);
      const task = response.data.updatedTask || response.data.newTask;
      dispatch({
        type: taskId ? "UPDATE_TASK" : "ADD_TASK",
        payload: task as ITask,
      });
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
    handleTextAreaChange,
    handleStatusChange,
    handleSubmit,
  };
};

export default useEditTask;
