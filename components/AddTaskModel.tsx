
import React from "react";

import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";

import Dialog from "@/components/Dialog";

import useAddTask from "@/hooks/useAddTask";

const Page = ({
    setOpenAddTaskModel,

}: {
    setOpenAddTaskModel: React.Dispatch<React.SetStateAction<boolean>>;

}) => {


    const {
        inputs,
        loading,
        isErrors,
        handleChange,
        handleTextAreaChange,
        handleStatusChange,
        handleSubmit,
    } = useAddTask(setOpenAddTaskModel)
    return (
        <Dialog>
            <div className=" flex-grow flex items-center justify-center my-6">
                <div className=" bg-card w-80 border  md:w-[600px]  p-4 rounded-md my-4 md:my-0">
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

export default Page;
