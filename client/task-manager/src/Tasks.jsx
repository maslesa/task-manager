import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Tasks(){

    const token = localStorage.getItem('token');
    const axiosConfig = {
        headers: { Authorization : `Bearer ${token}` }
    }
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [importantTasks, setImportantTasks] = useState([]);
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showAlertFailed, setShowAlertFailed] = useState(false);
    const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showUndoMessage, setShowUndoMessage] = useState(false);
    const [undoDelete, setUndoDelete] = useState(false);
    const [deletedTaskNotif, setDeletedTaskNotif] = useState(false);
    const undoDeleteRef = useRef(false);

    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'medium'
    });
    
    const fetchTasks = async() => {
        const res = await axios.get('http://localhost:3000/task/', axiosConfig);
        setTasks(res.data.data);
    }
    const fetchImportantTasks = async() => {
        const res = await axios.get('http://localhost:3000/task/important', axiosConfig);
        setImportantTasks(res.data.data);
    }
    const addNewTask = async() => {
        try {
            await axios.post('http://localhost:3000/task/post', newTask, axiosConfig);
            setShowAlertSuccess(true);
            fetchTasks();
            fetchImportantTasks();
            setNewTask({ title: '', description: '', priority: 'medium' });
            setShowNewTaskDialog(false);
            setTimeout(() => {
                setShowAlertSuccess(false);
            }, 1000);
        } catch (error) {
            setShowAlertFailed(true);
            setTimeout(() => {
                setShowAlertFailed(false);
            }, 2000);
        }
    }

    async function deleteTask(taskId){
        await axios.delete(`http://localhost:3000/task/delete/${taskId}`, axiosConfig);
        fetchTasks();
        fetchImportantTasks();
    }

    async function tryDeleteTask(taskId){
        try {
            setShowUndoMessage(true);            
            setUndoDelete(false);
            undoDeleteRef.current = false;
            setTimeout(async() => {
                setShowUndoMessage(false);
                if(!undoDeleteRef.current){
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
        fetchImportantTasks();
        fetchTasks();
    }, []);

    return(
        <>
            {deletedTaskNotif && (
                <div className="fixed top-4 right-4 bg-red-800 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
                    Task deleted successfully!
                </div>
            )}
            {showUndoMessage && (
                <div className="fixed top-4 right-4 bg-yellow-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
                    <button onClick={() => {setUndoDelete(true); undoDeleteRef.current = true; setShowUndoMessage(false);}} className="border-2 w-20 h-8 mr-3 rounded-lg cursor-pointer">Undo</button>
                    Task will be deleted!
                </div>
            )}
            {showAlertSuccess && (
                <div className="fixed top-4 right-4 bg-green-800 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
                    Task added successfully!
                </div>
            )}
            {showAlertFailed && (
                <div className="fixed top-4 right-4 bg-red-800 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
                    Error adding new task!
                </div>
            )}
            <div className="max-w-screen min-h-screen h-full bg-my-back flex flex-col justify-baseline items-center relative">
                {/* ADD NEW TASK */}
                {showNewTaskDialog && (
                    <div className="fixed inset-0 bg-my-back50 flex justify-center items-center z-40" onClick={() => setShowNewTaskDialog(false)}>
                        <div className="w-1/3 h-5/6 bg-my-blue3 flex flex-col justify-center items-center rounded-2xl shadow-2xl z-50" onClick={(e) => e.stopPropagation()}>
                            <div className="w-full h-1/4 flex justify-center items-center">
                                <p className="text-my-back text-2xl font-bold font-roboto">Add New Task</p>
                            </div>
                            <div className="flex flex-col w-2/3 h-full items-baseline gap-5">
                                <div className="flex gap-3 items-center w-full">
                                    <label className="cursor-pointer font-roboto font-normal text-lg text-my-back" htmlFor="title">Title:</label>
                                    <input maxLength={20} value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} autoComplete="off" id="title" className="outline-0 border-2 rounded-lg border-my-back pl-2 w-full h-10 text-my-back font-roboto font-normal" placeholder="Task Title" type="text" />
                                </div>
                                <div className="flex flex-col gap-3 items-baseline justify-baseline w-full">
                                    <label className="cursor-pointer font-roboto font-normal text-lg text-my-back" htmlFor="desc">Description:</label>
                                    <textarea maxLength={40} value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} resize="none" autoComplete="off" id="desc" className="resize-none outline-0 border-2 rounded-lg border-my-back pt-2 pl-2 min-w-full h-30 text-my-back font-roboto font-normal" placeholder="Enter task description" type="text" />
                                </div>
                                <div className="flex flex-col gap-3 items-baseline justify-baseline w-full">
                                    <label className="cursor-pointer font-roboto font-normal text-lg text-my-back" htmlFor="desc">Priority:</label>
                                    <select className="appearance-none h-10 outline-0 border-2 rounded-lg border-my-back pl-2 pr-2 w-full text-my-back" value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
                                        <option className="bg-my-blue3 text-my-back font-roboto" value="low">very low</option>
                                        <option className="bg-my-blue3 text-my-back font-roboto" value="low">low</option>
                                        <option className="bg-my-blue3 text-my-back font-roboto" value="medium">medium</option>
                                        <option className="bg-my-blue3 text-my-back font-roboto" value="high">high</option>
                                        <option className="bg-my-blue3 text-my-back font-roboto" value="very high">very high</option>
                                    </select>
                                </div>
                                <div className="w-full flex justify-center items-center mt-5">
                                    <div onClick={addNewTask} className="w-50 h-10 bg-my-back border-2 border-my-back flex justify-center items-center gap-1 rounded-2xl cursor-pointer hover:scale-101 duration-200 ease-in-out">
                                        <img className="w-5" src="/add.png" alt="plus" />
                                        <p className="font-roboto font-bold text-sm text-my-blue3">Add</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                  </div>
                )}
                {/* USER MENU */}
                {showUserMenu && (
                    <div className="fixed inset-0 bg-my-back50 flex justify-end items-center z-40" onClick={() => setShowUserMenu(false)}>
                        <div className={`w-[400px] h-screen bg-my-blue3 flex flex-col justify-baseline items-center shadow-2xl z-50 pt-15 relative transition-transform duration-500 ease-in-out ${showUserMenu ? "translate-x-0" : "translate-x-full"} `} onClick={(e) => e.stopPropagation()}>
                            <div className="flex gap-5 mb-5 border-b-2 pb-7 border-my-back w-5/6">
                                <div className="flex justify-center items-center">
                                    <div onClick={() => setShowUserMenu(false)} className="shadow-lg w-12 h-12 bg-my-back rounded-[200px] flex justify-center items-center font-roboto font-bold text-xl text-my-blue3 cursor-pointer hover:scale-102 duration-200 ease-in-out">
                                        {user.username.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                                <div>
                                    <h2 className="font-roboto font-bold text-my-back">{user.username}</h2>
                                    <h3 className="font-roboto font-base text-my-back50">{user.email}</h3>
                                </div>
                            </div>
                            <div className="w-5/6 flex flex-col gap-2 border-b-2 pb-7 border-my-back mb-5">
                                <div onClick={() => {navigate('/account/settings')}} className="flex gap-2 p-2 pl-5 duration-200 ease-in-out rounded-lg hover:bg-my-back-low cursor-pointer">
                                    <img className="w-6" src="/user.png" alt="acc" />
                                    <h3 className="font-roboto font-base text-my-back">Account settings</h3>
                                </div>
                                <div onClick={() => {navigate('/account/password');}} className="flex gap-2 p-2 pl-5 duration-200 ease-in-out rounded-lg hover:bg-my-back-low cursor-pointer">
                                    <img className="w-6" src="/password.png" alt="alltasks" />
                                    <h3 className="font-roboto font-base text-my-back">Change password</h3>
                                </div>
                            </div>
                            <div className="w-5/6 flex flex-col gap-2 border-b-2 pb-7 border-my-back">
                                <div onClick={() => {navigate('/home'); setShowUserMenu(false)}} className="flex gap-2 p-2 pl-5 duration-200 ease-in-out rounded-lg hover:bg-my-back-low cursor-pointer">
                                    <img className="w-6" src="/home.png" alt="alltasks" />
                                    <h3 className="font-roboto font-base text-my-back">Home</h3>
                                </div>
                                <div onClick={() => {setShowUserMenu(false); setShowNewTaskDialog(true)}} className="flex gap-2 p-2 pl-5 duration-200 ease-in-out rounded-lg hover:bg-my-back-low cursor-pointer">
                                    <img className="w-6" src="/addtask.png" alt="alltasks" />
                                    <h3 className="font-roboto font-base text-my-back">Add new task</h3>
                                </div>
                                <div onClick={() => {navigate('/tasks')}} className="flex gap-2 p-2 pl-5 duration-200 ease-in-out rounded-lg hover:bg-my-back-low cursor-pointer">
                                    <img className="w-6" src="/alltasks.png" alt="alltasks" />
                                    <h3 className="font-roboto font-base text-my-back">All tasks</h3>
                                </div>
                                <div onClick={() => {navigate('/tasks/important')}} className="flex gap-2 p-2 pl-5 duration-200 ease-in-out rounded-lg hover:bg-my-back-low cursor-pointer">
                                    <img className="w-6" src="/importanttasks.png" alt="alltasks" />
                                    <h3 className="font-roboto font-base text-my-back">Important tasks</h3>
                                </div>
                                <div className="flex gap-2 p-2 pl-5 duration-200 ease-in-out rounded-lg hover:bg-my-back-low cursor-pointer">
                                    <img className="w-6" src="/today.png" alt="alltasks" />
                                    <h3 className="font-roboto font-base text-my-back">Today tasks</h3>
                                </div>
                                <div className="flex gap-2 p-2 pl-5 duration-200 ease-in-out rounded-lg hover:bg-my-back-low cursor-pointer">
                                    <img className="w-6" src="/done.png" alt="alltasks" />
                                    <h3 className="font-roboto font-base text-my-back">Completed tasks</h3>
                                </div>
                                <div className="flex gap-2 p-2 pl-5 duration-200 ease-in-out rounded-lg hover:bg-my-back-low cursor-pointer">
                                    <img className="w-6" src="/cancel.png" alt="alltasks" />
                                    <h3 className="font-roboto font-base text-my-back">Uncompleted tasks</h3>
                                </div>
                            </div>
                            <div className="w-full h-25 absolute bottom-0 flex justify-center items-center">
                                <div onClick={() => {navigate('/signin')}} className="w-5/6 p-2 flex gap-2 justify-center items-center duration-200 ease-in-out rounded-lg hover:bg-my-back-low cursor-pointer">
                                    <img className="w-6" src="/logout.png" alt="logout" />
                                    <h1 className="font-roboto text-lg text-my-back">Sign out</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* HEADER */}
                <div className="max-w-screen w-full h-[120px] flex pl-20 pr-20 justify-between mb-5">
                    <a className="flex gap-1 justify-center items-center" href="/home">
                        <img className="w-10" src="/logo.png" alt="logo" />
                        <h2 className="font-roboto font-black text-2xl text-my-blue3">TaskManager</h2>
                    </a>
                    <div className="flex justify-center items-center">
                        <div onClick={() => setShowUserMenu(true)} className="shadow-lg w-12 h-12 bg-my-blue3 rounded-[200px] flex justify-center items-center font-roboto font-bold text-xl text-my-back cursor-pointer hover:scale-102 duration-200 ease-in-out">
                            {user.username.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </div>
                {/* HIGH PRIORITY */}
                <div className="w-2/3 h-full flex flex-col mb-10">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex gap-1 justify-baseline items-center">
                            <img className="w-8" src="/warning.png" alt="tasks" />
                            <h2 className="font-roboto font-black text-3xl text-my-blue3">Important tasks</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-3">
                        {importantTasks && importantTasks.length > 0 ? 
                        (importantTasks.map((task) => {
                            const showWarning = task.priority === 'high' || task.priority === 'very high';
                            return(
                                <div key={task._id} className="relative group shadow-lg p-4 m-2 border-2 border-my-blue3 rounded-2xl bg-my-light h-50 hover:scale-101 duration-200 ease-in-out cursor-pointer">
                                    
                                    <div className="absolute inset-0 bg-gradient-to-t from-my-blue3 to-transparent flex items-end justify-center text-white text-lg font-roboto font-semibold  rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-full h-1/3 flex justify-baseline items-center gap-5 pl-5">
                                            <div className="flex gap-1 justify-center items-center hover:scale-105 duration-200 ease-in-out">
                                                <img className="w-5" src="/done.png" alt="check" />
                                                <p className="font-roboto text-my-back font-normal text-sm hover:scale-103 duration-200 ease-in-out">Complete</p>
                                            </div>
                                            <div className="flex gap-1 justify-center items-center hover:scale-105 duration-200 ease-in-out">
                                                <img className="w-5" src="/update.png" alt="check" />
                                                <p className="font-roboto text-my-back font-normal text-sm ">Update</p>
                                            </div>
                                            <div onClick={() => tryDeleteTask(task._id)} className="flex gap-1 justify-center items-center hover:scale-105 duration-200 ease-in-out">
                                                <img className="w-5" src="/bin.png" alt="check" />
                                                <p className="font-roboto text-my-back font-normal text-sm ">Delete</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {showWarning && (
                                        <div className="absolute shadow-lg flex justify-center items-center w-20 h-8 top-3 right-3 bg-red-700 text-my-light rounded-lg font-roboto font-normal text-xs">
                                            {task.priority}
                                        </div>
                                    )}
                                    <h3 className="font-robot font-bold text-2xl text-my-blue3 max-w-2/3">{task.title}</h3>
                                    <p className="font-robot font-normal text-md text-my-blue3 mb-3 text-justify">{task.description}</p>
                                    <p className="text-sm text-gray-500 mb-3">Priority: {task.priority}</p>
                                    <div className="flex items-center">
                                        <p className="text-sm text-gray-500 mr-2">Status:</p>
                                        <div className="w-3 h-3 bg-red-700 mr-1 rounded-2xl"></div>
                                        <p className="text-sm text-gray-500">{task.status}</p>
                                    </div>
                                </div>
                            );
                        })
                        ) : (
                            <div className="pl-10 font-roboto font-semibold text-2xl text-my-blue350">
                                No important tasks found.
                            </div>
                        )}
                    </div>
                </div>
                {/* ALL TASKS */}
                <div className="w-2/3 h-full flex flex-col mb-10">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex gap-1 justify-baseline items-center">
                            <img className="w-8" src="/tasks.png" alt="tasks" />
                            <h2 className="font-roboto font-black text-3xl text-my-blue3">All tasks</h2>
                        </div>
                        <div className="flex gap-3">
                            <div onClick={() => setShowNewTaskDialog(true)} className="flex justify-center items-center gap-1 cursor-pointer hover:scale-101 duration-200 ease-in-out">
                                <img className="w-5" src="/add.png" alt="plus" />
                                <p className="font-roboto font-bold text-base text-my-blue3">Add new</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-3">
                        {tasks && tasks.length > 0 ? 
                        (tasks.map((task) => {
                            const showWarning = task.priority === 'high' || task.priority === 'very high';
                            return(
                                <div key={task._id} className="relative group overflow-hidden shadow-lg p-4 m-2 border-2 border-my-blue3 rounded-2xl bg-my-light h-50 hover:scale-101 duration-200 ease-in-out cursor-pointer">
                                    
                                    <div className="absolute inset-0 bg-gradient-to-t from-my-blue3 to-transparent flex items-end justify-center text-white text-lg font-roboto font-semibold  rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-full h-1/3 flex justify-baseline items-center gap-5 pl-5">
                                            <div className="flex gap-1 justify-center items-center hover:scale-105 duration-200 ease-in-out">
                                                <img className="w-5" src="/done.png" alt="check" />
                                                <p className="font-roboto text-my-back font-normal text-sm hover:scale-103 duration-200 ease-in-out">Complete</p>
                                            </div>
                                            <div className="flex gap-1 justify-center items-center hover:scale-105 duration-200 ease-in-out">
                                                <img className="w-5" src="/update.png" alt="check" />
                                                <p className="font-roboto text-my-back font-normal text-sm ">Update</p>
                                            </div>
                                            <div onClick={() => tryDeleteTask(task._id)} className="flex gap-1 justify-center items-center hover:scale-105 duration-200 ease-in-out">
                                                <img className="w-5" src="/bin.png" alt="check" />
                                                <p className="font-roboto text-my-back font-normal text-sm ">Delete</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {showWarning && (
                                        <div className="absolute shadow-lg flex justify-center items-center w-20 h-8 top-3 right-3 bg-red-700 text-my-light rounded-lg font-roboto font-normal text-xs">
                                            {task.priority}
                                        </div>
                                    )}
                                    <h3 className="font-robot font-bold text-2xl text-my-blue3 max-w-2/3">{task.title}</h3>
                                    <p className="font-robot font-normal text-md text-my-blue3 mb-3 text-justify">{task.description}</p>
                                    <p className="text-sm text-gray-500 mb-3">Priority: {task.priority}</p>
                                    <div className="flex items-center">
                                        <p className="text-sm text-gray-500 mr-2">Status:</p>
                                        <div className="w-3 h-3 bg-red-700 mr-1 rounded-2xl"></div>
                                        <p className="text-sm text-gray-500">{task.status}</p>
                                    </div>
                                </div>
                                
                            );
                        })) : (
                            <div className="pl-10 font-roboto font-semibold text-2xl text-my-blue350">
                                No tasks found.
                            </div>
                        )}
                    </div>
                </div>
                {/* FOOTER */}
                <div className="max-w-screen w-2/3 h-[120px] flex justify-center items-center border-t-2 border-my-blue3 mt-5">
                    <a target="_blank" href="https://www.maslesa.com">maslesa</a>
                </div>
            </div>
        </>
    );
}

export default Tasks;