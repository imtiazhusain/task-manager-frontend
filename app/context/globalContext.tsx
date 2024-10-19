// "use client";
// import { createContext, ReactNode, useContext, useReducer } from "react";
// import { IActionType, IGlobal, ITask, IUser } from "../interfaces";
// import { stat } from "fs";

// const defaultState: IGlobal = { user: null, tasks: [], theme: "light" };
// const GlobalStateContext = createContext<{
//     state: IGlobal;
//     dispatch: React.Dispatch<IActionType>;
// }>({ state: defaultState, dispatch: () => { } });

// export const useGlobalState = () => {
//     return useContext(GlobalStateContext);
// };

// // Reducer function for updates
// const globalReducer = (state: IGlobal, action: IActionType): IGlobal => {
//     switch (action.type) {
//         case "SET_USER":
//             // Ensure the payload is of type IUser or null before setting it
//             return { ...state, user: action.payload as IUser | null };
//         case "LOGOUT_USER":
//             if (typeof window !== "undefined") {
//                 // Safe to use localStorage here

//                 localStorage.removeItem("userInfo");
//             } else {
//                 console.log("local storage is undefined...");
//             }
//             return { ...state, user: null };

//         case "SET_THEME":
//             // Ensure the payload is of type IUser or null before setting it
//             return { ...state, theme: action.payload };
//         case "SET_TASKS":
//             // Ensure the payload is of type ITask or null before setting it
//             return { ...state, tasks: action.payload as ITask[] };

//         case "ADD_TASK":
//             // Ensure that tasks is not null and append the new task to the existing array
//             return {
//                 ...state,
//                 tasks: state.tasks
//                     ? [action.payload, ...state.tasks]
//                     : ([action.payload] as ITask[]),
//             };
//         case "UPDATE_TASK":
//             const updatedTasks = state?.tasks?.map((task: ITask) => {
//                 return task._id === action.payload?._id
//                     ? { ...task, ...action.payload }
//                     : task;
//             });

//             // Return the updated state with the new tasks array
//             return { ...state, tasks: updatedTasks as ITask[] };

//         case "DELETE_TASK":
//             const filteredTasks = state?.tasks?.filter((task: ITask) => {
//                 return task._id !== action.payload;
//             });

//             // Return the updated state with the new tasks array
//             return { ...state, tasks: filteredTasks as ITask[] };
//         default:
//             throw new Error(`Unhandled action type: ${action.type}`);
//     }
// };

// export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
//     let userInfoString: string | null = null;
//     if (typeof window !== "undefined") {
//         // Safe to use localStorage here
//         userInfoString = localStorage.getItem("userInfo");
//     } else {
//         console.log("local storage is undefined...");
//     }

//     const userInfo =
//         userInfoString !== null ? (JSON.parse(userInfoString) as IUser) : null;

//     const [state, dispatch] = useReducer(globalReducer, {
//         user: userInfo,
//         tasks: [],
//         theme: "light",
//     });

//     // Value to be passed to context consumers
//     const value = { state, dispatch };

//     return (
//         <GlobalStateContext.Provider value={value}>
//             {children}
//         </GlobalStateContext.Provider>
//     );
// };








"use client";
import { createContext, ReactNode, useContext, useReducer } from "react";
import { IActionType, IGlobal, ITask } from "../interfaces";

// Define default state for the global context
const defaultState: IGlobal = { tasks: [], theme: "light" };


// Create context with initial state and dispatch function
const GlobalStateContext = createContext<{
    state: IGlobal;
    dispatch: React.Dispatch<IActionType<any>>; // Using generic IActionType
}>({ state: defaultState, dispatch: () => { } });

export const useGlobalState = () => {
    return useContext(GlobalStateContext);
};

// Reducer function for state updates
const globalReducer = (state: IGlobal, action: IActionType<any>): IGlobal => {
    switch (action.type) {




        case "SET_THEME":
            const newTheme = state.theme === "light" ? "dark" : "light";
            document.body.classList.remove(state.theme); // Remove the previous theme class
            document.body.classList.add(newTheme); // Add the new theme class
            return { ...state, theme: newTheme };




        case "SET_TASKS":
            return { ...state, tasks: action.payload as ITask[] };

        case "ADD_TASK":
            return {
                ...state,
                tasks: [action.payload as ITask, ...state.tasks],
            };

        case "UPDATE_TASK":
            const updatedTasks = state.tasks.map((task: ITask) =>
                task._id === (action.payload as ITask)._id
                    ? { ...task, ...(action.payload as ITask) }
                    : task
            );
            return { ...state, tasks: updatedTasks };

        case "DELETE_TASK":
            const filteredTasks = state.tasks.filter((task: ITask) => task._id !== action.payload);
            return { ...state, tasks: filteredTasks };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

// Global state provider component
export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {




    const [state, dispatch] = useReducer(globalReducer, {
        tasks: [],
        theme: "light",
    });

    const value = { state, dispatch };

    return (
        <GlobalStateContext.Provider value={value}>
            {children}
        </GlobalStateContext.Provider>
    );
};
