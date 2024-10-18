"use client";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import _axios from "@/app/config/axios.config";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import axios from "axios";
import { ITask } from "@/app/interfaces";
import { validatePostInputs } from "@/lib/validateInputs";
import { useGlobalState } from "@/app/context/globalContext";
import ProtectedRoute from "@/components/ProtectedRoutes";
import Dialog from "@/components/Dialog";

const Page = ({
    setOpenAddTaskModel,

}: {
    setOpenAddTaskModel: React.Dispatch<React.SetStateAction<boolean>>;

}) => {
    const { state, dispatch } = useGlobalState();
    const [inputs, setInputs] = useState<ITask>({
        description: "",
        status: "Incomplete",
        title: "",
        dueDate: "",
    });
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isErrors, setIsErrors] = useState<ITask>({
        description: "",
        status: "",
        title: "",
        dueDate: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        if (name == "image" && event?.target?.files) {
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
        console.log(name);
        console.log(value);
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);

        // for input validation
        const shouldReturn = validatePostInputs(inputs, setIsErrors);

        if (shouldReturn) {
            setLoading(false);
            return;
        }


        try {
            const response = await _axios.post("/tasks", inputs, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${state?.user?.accessToken}`,
                },
            });
            toast.success("Post created successfully");

            const { newTask } = response.data
            setOpenAddTaskModel(false)
            dispatch({ type: 'ADD_TASK', payload: newTask })
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
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
            setLoading(false);
        }
    };
    return (
        <Dialog>
            <div className=" flex-grow flex items-center justify-center my-6">
                <div className=" bg-background w-80 border border-gray-300 md:w-[600px]  p-4 rounded-md my-4 md:my-0">
                    <div className="grid place-content-end">
                        <X
                            onClick={() => setOpenAddTaskModel(false)}
                            className="cursor-pointer bg-red-500 rounded-full p-1 text-white"
                            size={25}
                        />
                    </div>
                    <div className="mb-4">
                        <h1 className="font-bold text-base sm:text-2xl md:text-xl tracking-wide text-center">
                            Create A New Task
                        </h1>
                    </div>
                    <form action="" className="" onSubmit={handleSubmit}>
                        <div className="grid  md:grid-cols-2 md:gap-4 lg:gap-6 md:gap-y-6   grid-cols-1 gap-2">
                            <div className="space-y-2  md:col-span-2">
                                <label htmlFor="" className="text-xs sm:text-sm md:text-xl ">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    placeholder="ex. Attend Meeting"
                                    name="title"
                                    value={inputs.title || ""}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  w-full   p-2.5  outline-none placeholder:italic"
                                />

                                {isErrors.title && (
                                    <span className="text-red-600 text-sm">{isErrors.title}</span>
                                )}
                            </div>
                            <div className="  space-y-2">
                                <label htmlFor="" className="text-xs sm:text-sm md:text-xl">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    id="status"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  w-full p-2.5 outline-none placeholder:italic "
                                    value={inputs.status}
                                    onChange={handleStatusChange}
                                    required
                                >
                                    <option value="Complete">Complete</option>
                                    <option value="Incomplete">Incomplete</option>
                                </select>
                                {isErrors.status && (
                                    <span className="text-red-600 text-sm">
                                        {isErrors.status}
                                    </span>
                                )}
                            </div>
                            <div className="space-y-2 ">
                                <label htmlFor="" className="text-xs sm:text-sm md:text-xl">
                                    Due Date
                                </label>
                                <input
                                    type="datetime-local"
                                    name="dueDate"
                                    value={inputs.dueDate || ""}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  w-full p-2.5 outline-none placeholder:italic"
                                />
                                {isErrors.dueDate && (
                                    <span className="text-red-600 text-sm">
                                        {isErrors.dueDate}
                                    </span>
                                )}
                            </div>

                            <div className="   md:col-span-2 space-y-2">
                                <label htmlFor="" className="text-xs sm:text-sm md:text-xl ">
                                    Description
                                </label>
                                <textarea
                                    onChange={handleTextAreaChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  w-full   p-2.5  outline-none placeholder:italic"
                                    name="description"
                                    id="description"
                                    placeholder="Describe Task"
                                    rows={8}
                                    value={inputs.description || ""}
                                />

                                {isErrors.description && (
                                    <span className="text-red-600 text-sm">
                                        {isErrors.description}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div>
                            <Button disabled={loading} className="w-full mt-3">
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {loading ? "Please wait..." : "Create Post"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Dialog>
    );
};

export default ProtectedRoute(Page);
