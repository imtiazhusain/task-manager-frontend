import { useEffect, useState } from "react";
import { useGlobalState } from "@/app/context/globalContext";
import _axios from "@/app/config/axios.config";
import handleError from "@/lib/handleError";
import userUser from "./useUser";

const useTasks = (filterQuery, currentPage) => {
  const user = userUser();
  const { state, dispatch } = useGlobalState();
  const { tasks } = state;
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // Define limit according to your API

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await _axios.get(
          `/tasks?status=${filterQuery.status}&time=${filterQuery.time}&page=${currentPage}&limit=${limit}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.accessToken}`,
            },
          }
        );
        const { taskData, totalPages: total } = response.data;
        dispatch({ type: "SET_TASKS", payload: taskData });
        setTotalPages(total);
      } catch (error) {
        console.log(error);

        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.accessToken) {
      fetchTasks();
    }
  }, [filterQuery, currentPage, user?.accessToken]);

  return { tasks, loading, totalPages };
};

export default useTasks;
