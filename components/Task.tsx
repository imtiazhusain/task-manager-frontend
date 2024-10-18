import React, { useState } from "react";
import { ITask } from "@/app/interfaces";
import convertToDate from "@/lib/convertToDate";
import {
    Edit,
    EllipsisVertical,

    Trash2,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import ProfileModel from "./ProfileModel";
import EditTaskModel from "./EditTaskModel";

interface PostProps {
    task: ITask;
    deleteTask?: (id: string) => void;
    deleteTaskLoading?: boolean;
}

const Task: React.FC<PostProps> = ({
    task,
    deleteTask,
    deleteTaskLoading,
}) => {

    const [openEditModel, setOpenEditModel] = useState(false);

    const handleEditTask = () => {
        setOpenEditModel(true);
    };


    return (
        <div className="rounded-md   bg-white  shadow-md transition-all duration-300 animate-fadeIn  p-4 space-y-3 min-w-[350px]">
            <div className="flex items-center justify-between">

                <div className="flex items-center">
                    {task.status === "Complete" ? (
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            {task.status}
                        </span>
                    ) : (
                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                            {task.status}
                        </span>
                    )}


                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <EllipsisVertical className="text-gray-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            className="cursor-pointer "

                            onClick={() => task?._id && deleteTask && deleteTask(task._id)}
                        >
                            <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                            <span className="text-red-500">
                                {deleteTaskLoading ? "Deleting..." : "Delete"}
                            </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={handleEditTask}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="space-y-3">
                <h3 className="line-clamp-4 text-lg ">
                    Title
                </h3>
                <h3 className="line-clamp-4 text-sm text-gray-500">
                    {task.title}
                </h3>
                <h3 className="line-clamp-4 text-lg ">
                    Description
                </h3>
                <h3 className="line-clamp-4 text-sm text-gray-500">
                    {task.description}
                </h3>

                <hr />
                <h3 className="line-clamp-4 text-md ">
                    Due Date: <span className="text-red-400 text-md ml-3">{convertToDate(task.dueDate)}</span>
                </h3>





            </div>



            {openEditModel && (
                <EditTaskModel setOpenEditModel={setOpenEditModel} task={task} />
            )}
        </div >
    );
};

export default Task;
