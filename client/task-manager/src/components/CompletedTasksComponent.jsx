import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function CompletedTasksComponent() {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const axiosConfig = { headers: { Authorization: `Bearer ${token}` } }

    const [showUndoMessage, setShowUndoMessage] = useState(false);
    const [showTaskCompleted, setShowTaskCompleted] = useState(false);
    const [deletedTaskNotif, setDeletedTaskNotif] = useState(false);
    const [undoDelete, setUndoDelete] = useState(false);
    const undoDeleteRef = useRef(false);
    const [completedTasks, setCompletedTasks] = useState([]);

    const fetchCompletedTasks = async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/task/completed`, axiosConfig);
        setCompletedTasks(res.data.data);
    }
    async function completeUncompleteTask(taskId) {
        try {
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/task/set-completed/${taskId}`, {}, axiosConfig);
            setShowTaskCompleted(true),
                fetchCompletedTasks();
            setTimeout(() => {
                setShowTaskCompleted(false);
            }, 2000);
        } catch (error) {
            console.log('Failed to complete task', error);
        }
    }
    async function deleteTask(taskId) {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/task/delete/${taskId}`, axiosConfig);
        fetchCompletedTasks();
    }
    async function tryDeleteTask(taskId) {
        try {
            setShowUndoMessage(true);
            setUndoDelete(false);
            undoDeleteRef.current = false;
            setTimeout(async () => {
                setShowUndoMessage(false);
                if (!undoDeleteRef.current) {
                    await deleteTask(taskId);
                    setDeletedTaskNotif(true);
                    setTimeout(() => {
                        setDeletedTaskNotif(false);
                    }, 2000);
                }
            }, 3000);

        } catch (error) {
            console.log('Failed to try delete task', error);
        }
    }

    useEffect(() => {
        fetchCompletedTasks();
    }, []);

    return (
        <>
            {showTaskCompleted && (
                <div className="fixed top-4 right-4 bg-green-800 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
                    Task updated successfully!
                </div>
            )}
            {deletedTaskNotif && (
                <div className="fixed top-4 right-4 bg-red-800 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
                    Task deleted successfully!
                </div>
            )}
            {showUndoMessage && (
                <div className="fixed top-4 right-4 bg-yellow-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
                    <button onClick={() => { setUndoDelete(true); undoDeleteRef.current = true; setShowUndoMessage(false); }} className="border-2 w-20 h-8 mr-3 rounded-lg cursor-pointer">Undo</button>
                    Task will be deleted!
                </div>
            )}
            {/* COMPLETED TASKS */}
            <div className="w-3/4 lg:w-2/3 h-full flex flex-col mb-10">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex gap-1 justify-baseline items-center">
                        <img className="w-8" src="/accept.png" alt="tasks" />
                        <h2 className="font-roboto font-black text-2xl sm:text-3xl text-my-blue3">Completed tasks</h2>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {completedTasks && completedTasks.length > 0 ?
                        (completedTasks.map((task) => {
                            const showWarning = task.priority === 'high' || task.priority === 'very high';
                            return (
                                <div key={task._id} className="relative group shadow-lg p-4 m-2 border-2 border-my-blue3 rounded-2xl bg-my-light h-50 hover:scale-101 duration-200 ease-in-out cursor-pointer">

                                    <div className="absolute inset-0 bg-gradient-to-t from-my-blue3 to-transparent flex items-end justify-center text-white text-lg font-roboto font-semibold rounded-lg opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-full h-1/4 sm:h-1/3 flex justify-baseline items-center gap-3 pl-2 sm:pl-5">
                                            {task.status !== 'completed' ? (
                                                <div onClick={() => completeUncompleteTask(task._id)} className="flex gap-1 justify-center items-center hover:scale-105 duration-200 ease-in-out">
                                                    <img className="w-4 sm:w-5" src="/done.png" alt="check" />
                                                    <p className="font-roboto text-my-back font-normal text-xs sm:text-sm hover:scale-103 duration-200 ease-in-out">Complete</p>
                                                </div>
                                            ) : (
                                                <div onClick={() => completeUncompleteTask(task._id)} className="flex gap-1 justify-center items-center hover:scale-105 duration-200 ease-in-out">
                                                    <img className="w-4 sm:w-5" src="/cancel.png" alt="check" />
                                                    <p className="font-roboto text-my-back font-normal text-xs sm:text-sm hover:scale-103 duration-200 ease-in-out">Uncomplete</p>
                                                </div>
                                            )}
                                            <div onClick={() => navigate("/tasks/update", { state: { task } })} className="flex gap-1 justify-center items-center hover:scale-105 duration-200 ease-in-out">
                                                <img className="w-4 sm:w-5" src="/update.png" alt="check" />
                                                <p className="font-roboto text-my-back font-normal text-xs sm:text-sm ">Update</p>
                                            </div>
                                            <div onClick={() => tryDeleteTask(task._id)} className="flex gap-1 justify-center items-center hover:scale-105 duration-200 ease-in-out">
                                                <img className="w-4 sm:w-5" src="/bin.png" alt="check" />
                                                <p className="font-roboto text-my-back font-normal text-xs sm:text-sm ">Delete</p>
                                            </div>
                                        </div>
                                    </div>

                                    {showWarning && (
                                        <div className="absolute shadow-lg flex justify-center items-center w-15 h-6 sm:w-20 sm:h-8 sm:top-3 sm:right-3 top-2 right-2 bg-red-700 text-my-light rounded-lg font-roboto font-normal text-xs">
                                            {task.priority}
                                        </div>
                                    )}
                                    <h3 className="font-robot font-bold text-xl sm:text-2xl text-my-blue3 max-w-2/3">{task.title}</h3>
                                    <div className="text-sm text-gray-500 mb-1 sm:mb-3 flex gap-1">{task.deadline && (
                                        <div>Deadline: {new Date(task.deadline).toLocaleDateString('en-US', {
                                            timeZone: 'UTC',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                        </div>
                                    )}</div>
                                    <p className="font-robot font-normal text-md text-my-blue3 mb-1 sm:mb-3 text-justify">{task.description}</p>
                                    <p className="text-sm text-gray-500 mb-1 sm:mb-3">Priority: {task.priority}</p>
                                    <div className="flex items-center">
                                        <p className="text-sm text-gray-500 mr-2">Status:</p>
                                        {task.status === 'completed' ? (
                                            <div className="w-3 h-3 bg-green-600 mr-1 rounded-2xl"></div>
                                        ) : (
                                            <div className="w-3 h-3 bg-red-700 mr-1 rounded-2xl"></div>
                                        )}
                                        <p className="text-sm text-gray-500">{task.status}</p>
                                    </div>
                                </div>
                            );
                        })
                        ) : (
                            <div className="pl-10 font-roboto font-semibold text-xl sm:text-2xl text-my-blue350">
                                No completed tasks found.
                            </div>
                        )}
                </div>
            </div>
        </>
    )

}

export default CompletedTasksComponent;