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
import ProtectedRoute from "@/components/ProtectedRoutes";
import Task from "@/components/Task";
import AddTaskModel from "@/components/AddTaskModel";
import CustomPagination from "@/components/CustomPagination";

const Page = () => {
    const { state, dispatch } = useGlobalState();
    const { tasks } = state

    const [loading, setLoading] = useState(false);
    const [filterQuery, setFilterQuery] = useState({
        status: "",
        time: "Latest",
    });
    const [openAddTaskModel, setOpenAddTaskModel] = useState(false)

    // gagination
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageItems, setCurrentPageItems] = useState([]);
    const totalPages = Math.ceil(tasks.length / itemsPerPage);

    useEffect(() => {
        if (tasks.length > 0) {
            const currentItems = tasks.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
            );

            setCurrentPageItems(currentItems);
        }
    }, [currentPage, tasks]);

    const goToPage = (page) => {
        setCurrentPage(page);
    };


    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {

                const response = await _axios.get(
                    `/tasks?status=${filterQuery.status}&time=${filterQuery.time}&page=${currentPage}&limit=10`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${state.user?.accessToken}`,
                        },
                    }
                );
                const { taskData } = response.data

                dispatch({ type: 'SET_TASKS', payload: taskData })
            } catch (error) {
                console.log(error);
                if (axios.isAxiosError(error)) {
                    // Handle Axios-specific error
                    console.error("Error fetching data:", error?.message);

                    if (error?.response?.data?.message) {
                        toast.error(
                            error?.response?.data?.message || "Something went wrong"
                        );
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
                setLoading(false);
            }
        };

        fetchPosts();
    }, [filterQuery, state.user?.accessToken]);

    function setFilterValue(query: string) {
        const [name, value] = query.split(":");
        setFilterQuery((pre) => ({ ...pre, [name]: value }));
    }

    const [deleteTaskLoading, setDeleteTaskLoading] = useState(false);

    const deleteTask = async (ID: string) => {
        try {
            setDeleteTaskLoading(true);
            await _axios.delete(`/tasks/${ID}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${state.user?.accessToken}`,
                },
            });

            dispatch({ type: 'DELETE_TASK', payload: ID })
            toast.success("Post deleted successfully");
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
        <div className="dark">


            <div className="mt-16 container mx-auto px-4 sm:px-6 lg:px-8  ">
                <div className="grid place-content-end ">
                    {/* <Link href="/add-task"> */}
                    <Button className="bg-green-500 hover:bg-green-600" onClick={() => setOpenAddTaskModel(true)}>
                        <NotebookText className="mr-2 h-4 w-4" /> Create a Task
                    </Button>
                    {/* </Link> */}
                </div>

                <h1 className="text-center text-[7vw] md:text-[4vw] text-gray-600 my-5">
                    Your <span className="text-red-500">Tasks</span>{" "}
                </h1>

                <Filter

                    setFilterValue={setFilterValue}
                    filterQuery={filterQuery}
                />

                <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]    gap-y-6 gap-x-5 lg:gap-x-8 place-content-center  place-items-center mb-6">
                    {loading ? (
                        <LoadingPosts />
                    ) : currentPageItems?.length > 0 ? (
                        currentPageItems.map((task) => (
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
                        items={tasks}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        currentItems={currentPageItems}
                        goToPage={goToPage}
                    />
                </div>
                {openAddTaskModel && (
                    <AddTaskModel setOpenAddTaskModel={setOpenAddTaskModel} />
                )}

            </div>
        </div>
    );
};

export default ProtectedRoute(Page);
