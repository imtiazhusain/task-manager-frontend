"use client";
import { useState } from "react";
import { useGlobalState } from "@/app/context/globalContext";
import { Button } from "@/components/ui/button";
import { NotebookText } from "lucide-react";
import Filter from "@/components/Filter";
import Task from "@/components/Task";
import AddTaskModel from "@/components/AddTaskModel";
import CustomPagination from "@/components/CustomPagination";
import useUser from "@/hooks/useUser";
import useDeleteTask from "@/hooks/useDeleteTask";
import LoadingPosts from "@/components/Loadingtasks";
import useTasks from "@/hooks/useTasks";

const DashboardComponent = () => {
    const user = useUser();
    const [filterQuery, setFilterQuery] = useState({
        status: "",
        time: "Latest",
    });
    const [openAddTaskModel, setOpenAddTaskModel] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const { tasks, loading, totalPages } = useTasks(filterQuery, currentPage);
    const { deleteTask, deleteTaskLoading } = useDeleteTask(user);

    const setFilterValue = (query: string) => {
        const [name, value] = query.split(":");
        setFilterQuery((prev) => ({ ...prev, [name]: value }));
        setCurrentPage(1); // Reset to first page on filter change
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
                    goToPage={setCurrentPage}
                />
            </div>
            {openAddTaskModel && (
                <AddTaskModel setOpenAddTaskModel={setOpenAddTaskModel} />
            )}
        </div>
    );
};

export default DashboardComponent;
