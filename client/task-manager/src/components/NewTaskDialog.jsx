import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function NewTaskDialog({showNewTaskDialog, setShowNewTaskDialog}){

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'medium'
    });

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

    return(
        <>
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
        </>
    )

}

export default NewTaskDialog;