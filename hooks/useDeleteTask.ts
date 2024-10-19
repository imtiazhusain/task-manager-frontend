import { useState } from "react";
import { useGlobalState } from "@/app/context/globalContext";
import { toast } from "sonner";
import _axios from "@/app/config/axios.config";
import axios from "axios";
import handleError from "@/lib/handleError";

const useDeleteTask = (user) => {
  const { dispatch } = useGlobalState();
  const [deleteTaskLoading, setDeleteTaskLoading] = useState(false);

  const deleteTask = async (ID: string) => {
    try {
      setDeleteTaskLoading(true);
      await _axios.delete(`/tasks/${ID}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      dispatch({ type: "DELETE_TASK", payload: ID });
      toast.success("Task deleted successfully");
    } catch (error) {
      console.log(error);
      handleError(error);
    } finally {
      setDeleteTaskLoading(false);
    }
  };

  return { deleteTask, deleteTaskLoading };
};

export default useDeleteTask;
