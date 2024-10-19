
"use client";
import { useEffect, useState } from "react";
import _axios from "../../config/axios.config";
import { toast } from "sonner";
import axios from "axios";
import LoadingPosts from "@/components/Loadingtasks";
import { useGlobalState } from "@/app/context/globalContext";
import { Button } from "@/components/ui/button";
import { NotebookText } from "lucide-react";
import Filter from "@/components/Filter";
import Task from "@/components/Task";
import AddTaskModel from "@/components/AddTaskModel";
import CustomPagination from "@/components/CustomPagination";
import userUser from "@/hooks/useUser";
const DashboardComponent = () => {

    const user = userUser()

    const { state, dispatch } = useGlobalState();
    const { tasks } = state;

    const [loading, setLoading] = useState(true);
    const [filterQuery, setFilterQuery] = useState({
        status: "",
        time: "Latest",
    });
    const [openAddTaskModel, setOpenAddTaskModel] = useState(false);

    // Pagination
    const limit = 5; // Define limit according to your API
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchPosts = async () => {
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
                dispatch({ type: 'SET_TASKS', payload: taskData });
                setTotalPages(total); // Set total pages from API response

            } catch (error) {
                console.log(error);
                if (axios.isAxiosError(error)) {
                    console.error("Error fetching data:", error?.message);
                    toast.error(
                        error?.response?.data?.message || "Something went wrong"
                    );
                } else {
                    console.error("Unexpected error:", error);
                }
            } finally {
                setLoading(false);
            }
        };

        if (user?.accessToken) {
            fetchPosts();
        }
    }, [filterQuery, currentPage, user?.accessToken]); // Fetch posts when filter query or page changes

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    function setFilterValue(query: string) {
        const [name, value] = query.split(":");
        setFilterQuery((prev) => ({ ...prev, [name]: value }));
        setCurrentPage(1); // Reset to first page on filter change
    }

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

            dispatch({ type: 'DELETE_TASK', payload: ID })
            toast.success("Task deleted successfully");
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                // Handle Axios-specific error
                console.error("Error fetching data:", error?.message);

                if (error?.response?.data?.message) {
                    toast.error(error?.response?.data?.message || "Something went wrong");
                } else if (error?.message) {
                    toast.error(error?.message || "Something went wrong");
                } else {
                    toast.error("Something went wrong please refresh the page");
                }
            } else {
                // Handle unexpected errors
                console.error("Unexpected error:", error);
            }
        } finally {
            setDeleteTaskLoading(false);
        }
    };
    return (
        <div className="mt-16 container mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="grid place-content-end">
                <Button
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => setOpenAddTaskModel(true)}
                >
                    <NotebookText className="mr-2 h-4 w-4" /> Create a Task
                </Button>
            </div>

            <h1 className="text-center text-[7vw] md:text-[4vw] text-gray-600 my-5">
                Your <span className="text-red-500">Tasks</span>
            </h1>

            <Filter setFilterValue={setFilterValue} filterQuery={filterQuery} />

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-y-6 gap-x-5 lg:gap-x-8 place-content-center place-items-center mb-6">
                {loading ? (
                    <LoadingPosts />
                ) : tasks.length > 0 ? (
                    tasks.map((task) => (
                        <Task
                            task={task}
                            key={task._id}
                            deleteTask={deleteTask}
                            deleteTaskLoading={deleteTaskLoading}
                        />
                    ))
                ) : (
                    <span className="text-gray-500">No Task Found</span>
                )}
            </div>

            <div className="self-end m-3">
                <CustomPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    goToPage={goToPage}
                />
            </div>
            {openAddTaskModel && (
                <AddTaskModel setOpenAddTaskModel={setOpenAddTaskModel} />
            )}
        </div>
    )
}

export default DashboardComponent