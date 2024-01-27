import React, { createContext, useContext, useReducer } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
	const initialState = {
		tasks: [
			{
				id: crypto.randomUUID(),
				title: "Learn React Native",
				description:
					"I want to Learn React such thanI can treat it like my slave and make it do whatever I want to do.",
				tags: ["web", "react", "js"],
				priority: "High",
				isFavorite: true,
			},
		],
		showAddModal: false,
		taskToUpdate: null,
	};

	const taskReducer = (state, action) => {
		switch (action.type) {
			case "ADD_EDIT_TASK":
				return {
					...state,
					tasks: action.isAdd
						? [...state.tasks, action.newTask]
						: state.tasks.map((task) => (task.id === action.newTask.id ? action.newTask : task)),
					showAddModal: false,
					taskToUpdate: null,
				};
			case "EDIT_TASK":
				return {
					...state,
					showAddModal: true,
					taskToUpdate: action.task,
				};
			case "DELETE_TASK":
				return {
					...state,
					tasks: state.tasks.filter((task) => task.id !== action.taskId),
				};
			case "DELETE_ALL_TASKS":
				return {
					...state,
					tasks: [],
				};
			case "TOGGLE_FAVORITE":
				return {
					...state,
					tasks: state.tasks.map((task) =>
						task.id === action.taskId ? { ...task, isFavorite: !task.isFavorite } : task
					),
				};
			case "SEARCH_TASK":
				const filteredTasks = state.tasks.filter((task) =>
					task.title.toLowerCase().includes(action.searchTerm.toLowerCase())
				);
				return {
					...state,
					tasks: filteredTasks,
				};
			case "CLOSE_MODAL":
				return {
					...state,
					showAddModal: false,
					taskToUpdate: null,
				};
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(taskReducer, initialState);

	return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
	const context = useContext(TaskContext);
	if (!context) {
		throw new Error("useTaskContext must be used within a TaskProvider");
	}
	return context;
};
