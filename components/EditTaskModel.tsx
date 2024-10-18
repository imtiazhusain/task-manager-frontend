"use client";
import React, { useState } from "react";
import Dialog from "./Dialog";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";

import _axios from "@/app/config/axios.config";

import { useGlobalState } from "@/app/context/globalContext";
import { ITask } from "@/app/interfaces";
import axios from "axios";
import { validatePostInputs } from "@/lib/validateInputs";
import { Button } from "./ui/button";

const EditTaskModel = ({
    setOpenEditModel,
    task
}: {
    setOpenEditModel: React.Dispatch<React.SetStateAction<boolean>>;
    task: ITask
}) => {


    const { _id, ...remainingValues } = task;

    // const [userInputs, setUserInputs] = useState<IEditUser>({
    //     name: '',
    //     email: '',
    //     profilePic: null,
    //     _id: '',
    //     password: ''

    // });
    // const [hovered, setHovered] = useState(false);

    // const [imagePreviewUrl, setImagePreviewUrl] = useState(user?.profilePic);
    // const fileInputRef = useRef<HTMLInputElement>(null);
    // const [loading, setLoading] = useState(false);

    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files![0];
    //     if (file && file.type.match("image.*")) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             if (typeof reader.result === 'string') {
    //                 setImagePreviewUrl(reader.result);
    //             } else {
    //                 // Set to undefined if the result is not a string
    //                 setImagePreviewUrl(undefined);
    //             }
    //             setUserInputs((values) => ({ ...values, profilePic: file }));
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    // useEffect(() => {
    //     if (user)
    //         setUserInputs({
    //             name: user?.name,
    //             email: user?.email,
    //             profilePic: user?.profilePic,
    //             password: "",
    //             _id: user?._id,
    //         });
    // }, [user]);

    // const handleButtonClick = () => {
    //     if (fileInputRef.current)
    //         fileInputRef.current.click();
    // };

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setUserInputs((values) => ({ ...values, [name]: value }));
    // };

    // const EditProfile = async () => {
    //     setLoading(true);
    //     const formData = new FormData();
    //     formData.append("name", userInputs?.name);
    //     formData.append("email", userInputs?.email);
    //     if (userInputs.profilePic)
    //         formData.append("profilePic", userInputs?.profilePic);
    //     formData.append("_id", userInputs?._id);
    //     if (userInputs?.password) {
    //         formData.append("password", userInputs?.password);
    //     }
    //     try {
    //         const response = await _axios.patch("/user/edit-user", formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //                 Authorization: `Bearer ${user?.accessToken}`,
    //             },
    //         });

    //         toast.success("User updated Successfully");

    //         const dataFromApi = response?.data?.data;

    //         if (user) {

    //             const tempUser: IUser = {
    //                 ...user,
    //                 profilePic: dataFromApi.profilePic,
    //                 email: dataFromApi.email,
    //                 name: dataFromApi.name,
    //             };

    //             if (typeof window !== 'undefined') {
    //                 // Safe to use localStorage here
    //                 localStorage.setItem("userInfo", JSON.stringify(tempUser));

    //             } else {
    //                 console.log('local storge is undefined...')
    //             }

    //             dispatch({ type: "SET_USER", payload: tempUser });
    //         }

    //     } catch (error) {
    //         console.log(error);

    //         // Handle Axios-specific error

    //         if (axios.isAxiosError(error)) {
    //             // Handle Axios-specific error
    //             console.error('Error fetching data:', error?.message);

    //             if (error?.response?.data?.message) {
    //                 toast.error(
    //                     error?.response?.data?.message
    //                     || "Something went wrong"

    //                 );
    //             } else if (error?.message) {
    //                 toast.error(
    //                     error?.message
    //                     || "Something went wrong"

    //                 );
    //             } else {
    //                 toast.error('Something went wrong please refresh the page')
    //             }
    //         } else {
    //             // Handle unexpected errors
    //             console.error('Unexpected error:', error);
    //         }

    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const { state, dispatch } = useGlobalState();
    console.log('state')
    console.log(state)
    const { user } = state;
    const [inputs, setInputs] = useState<ITask>(remainingValues);
    const [loading, setLoading] = useState(false);
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

            const response = await _axios.patch(`/tasks/${_id}`, inputs, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.accessToken}`,
                },
            });
            toast.success("Post updated successfully");
            setOpenEditModel(false)

            const { updatedTask } = response.data

            dispatch({ type: 'UPDATE_TASK', payload: updatedTask as ITask })





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
                <div className=" bg-white w-80 border border-gray-300 md:w-[600px]  p-4 rounded-md my-4 md:my-0">
                    <div className="grid place-content-end">
                        <X
                            onClick={() => setOpenEditModel(false)}
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
                                    type="date"
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
                                {loading ? "Please wait..." : "Update Post"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Dialog>
    );
};

export default EditTaskModel;
