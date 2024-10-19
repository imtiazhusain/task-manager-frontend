
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
