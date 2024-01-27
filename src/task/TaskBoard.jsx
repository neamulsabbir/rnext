import { useTaskContext } from "../TaskProvider";
import AddTaskModal from "./AddTaskModal";
import NoTasksFound from "./NoTasksFound";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
	const { state, dispatch } = useTaskContext();
	const { tasks, showAddModal, taskToUpdate } = state;

	function handleAddEditTask(newTask, isAdd) {
		dispatch({ type: "ADD_EDIT_TASK", newTask, isAdd });
	}

	function handleEditTask(task) {
		dispatch({ type: "EDIT_TASK", task });
	}

	function handleDeleteTask(taskId) {
		dispatch({ type: "DELETE_TASK", taskId });
	}

	function handleDeleteAllClick() {
		dispatch({ type: "DELETE_ALL_TASKS" });
	}

	function handleFavorite(taskId) {
		dispatch({ type: "TOGGLE_FAVORITE", taskId });
	}

	function handleSearch(searchTerm) {
		dispatch({ type: "SEARCH_TASK", searchTerm });
	}

	function handleCloseClick() {
		dispatch({ type: "CLOSE_MODAL" });
	}

	return (
		<section className="mb-20" id="tasks">
			{showAddModal && (
				<AddTaskModal onSave={handleAddEditTask} onCloseClick={handleCloseClick} taskToUpdate={taskToUpdate} />
			)}
			<div className="container">
				<div className="p-2 flex justify-end">
					<SearchTask onSearch={handleSearch} />
				</div>

				<div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
					<TaskActions
						onAddClick={() => dispatch({ type: "EDIT_TASK", task: null })}
						onDeleteAllClick={handleDeleteAllClick}
					/>
					{tasks.length > 0 ? (
						<TaskList
							tasks={tasks}
							onEdit={handleEditTask}
							onDelete={handleDeleteTask}
							onFav={handleFavorite}
						/>
					) : (
						<NoTasksFound />
					)}
				</div>
			</div>
		</section>
	);
}
