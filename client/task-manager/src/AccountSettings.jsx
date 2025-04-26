import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function AccountSettings(){

    const token = localStorage.getItem('token');
    const axiosConfig = {
        headers: { Authorization : `Bearer ${token}` }
    }
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showAlertFailed, setShowAlertFailed] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'medium'
    });
    const addNewTask = async() => {
        try {
            await axios.post('http://localhost:3000/task/post', newTask, axiosConfig);
            setShowAlertSuccess(true);
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

    return(
        <>  
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
                                <div onClick={() => {navigate('/account/settings'); setShowUserMenu(false)}} className="flex gap-2 p-2 pl-5 duration-200 ease-in-out rounded-lg hover:bg-my-back-low cursor-pointer">
                                    <img className="w-6" src="/user.png" alt="acc" />
                                    <h3 className="font-roboto font-base text-my-back">Account settings</h3>
                                </div>
                                <div onClick={() => {navigate('/account/password');}} className="flex gap-2 p-2 pl-5 duration-200 ease-in-out rounded-lg hover:bg-my-back-low cursor-pointer">
                                    <img className="w-6" src="/password.png" alt="alltasks" />
                                    <h3 className="font-roboto font-base text-my-back">Change password</h3>
                                </div>
                            </div>
                            <div className="w-5/6 flex flex-col gap-2 border-b-2 pb-7 border-my-back">
                                <div onClick={() => {navigate('/home')}} className="flex gap-2 p-2 pl-5 duration-200 ease-in-out rounded-lg hover:bg-my-back-low cursor-pointer">
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
                <div className="w-full h-full flex flex-col justify-center items-center">
                    
                </div>
            </div>
        </>
    )

}

export default AccountSettings;