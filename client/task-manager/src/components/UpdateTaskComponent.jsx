import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function UpdateTaskComponent() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const axiosConfig = {
        headers: { Authorization : `Bearer ${token}` }
    }
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showAlertFailed, setShowAlertFailed] = useState(false);
    const [selectedPriority, setSelectedPriority] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const priorities = ['very low', 'low', 'medium', 'high', 'very high'];
    const [startDate, setStartDate] = useState(null);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'medium',
        deadline: null
    });

    const location = useLocation();
    const task = location.state?.task;    

    useEffect(() => {
        if (task) {
          setNewTask({
            title: task.title,
            description: task.description,
            priority: task.priority,
            deadline: task.deadline ? new Date(task.deadline) : null,
          });
          setStartDate(task.deadline ? new Date(task.deadline) : null);
        }
      }, [task]);

    const updateTask = async() => {
        try {
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/task/update/${task._id}`, newTask, axiosConfig);
            console.log('updated successfully');
            setShowAlertSuccess(true);
            setTimeout(() => {
                setShowAlertSuccess(false);
                navigate('/home');
            }, 2000);
        } catch (error) {
            setShowAlertFailed(true)
            setTimeout(() => {
                setShowAlertFailed(false);
            }, 2000);
            console.log(error);
        }    
    }

    return (
        <>
            {showAlertSuccess && (
                <div className="fixed top-4 right-4 bg-green-800 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
                    Task updated successfully!
                </div>
            )}
            {showAlertFailed && (
                <div className="fixed top-4 right-4 bg-red-800 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
                    Error updating task!
                </div>
            )}
            <div className="w-2/3 h-[500px] flex flex-col justify-baseline items-center">
                <div className="w-full flex items-center justify-center">
                    <div className="flex gap-1 justify-baseline items-center">
                        <img className="w-8" src="/refresh.png" alt="tasks" />
                        <h2 className="font-roboto font-black text-2xl sm:text-3xl text-my-blue3">Update task</h2>
                    </div>
                </div>
                <div className="flex flex-col gap-5 w-full sm:w-5/6 md:w-2/3 lg:w-1/2 h-full p-3 pt-10">
                    <div className="flex flex-col justify-center items-baseline">
                        <label className="font-roboto font-bold text-xl sm:text-2xl text-my-blue3 mb-1 cursor-pointer" htmlFor="title">Title:</label>
                        <input required maxLength={25} id="title" className="w-full outline-0 border-2 p-1 pl-3 rounded-lg border-my-blue3 font-roboto font-bold" type="text" 
                                value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value})}/>
                    </div>
                    <div className="flex flex-col justify-center items-baseline">
                        <label className="font-roboto font-bold text-xl sm:text-2xl text-my-blue3 mb-1 cursor-pointer" htmlFor="desc">Description:</label>
                        <textarea maxLength={70} className="resize-none w-full outline-0 border-2 p-1 pl-3 rounded-lg border-my-blue3 font-roboto font-bold" name="" id="desc"
                                    value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        ></textarea>
                    </div>
                    <div className="flex flex-col justify-center items-baseline">
                        <label className="font-roboto font-bold text-xl sm:text-2xl text-my-blue3 mb-1 cursor-pointer" htmlFor="priority">Priority:</label>
                        <div className="relative w-full">
                            <input id='priority' type="text" onClick={() => setIsOpen(!isOpen)} readOnly placeholder="Select priority"
                                className="w-full border-2 border-my-blue3 rounded-lg px-4 py-2 cursor-pointer outline-none font-roboto font-bold"
                                value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}/>
                            {isOpen && (
                                <div className="absolute z-10 mt-2 w-full bg-my-light border-2 border-gray-300 rounded-lg shadow-md">
                                    {priorities.map((priority) => (
                                        <div key={priority} onClick={() => {setSelectedPriority(priority); setNewTask(prev => ({ ...prev, priority })); setIsOpen(false);}}
                                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer font-roboto font-bold"> {priority}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-center items-baseline">
                        <label className="font-roboto font-bold text-xl sm:text-2xl text-my-blue3 mb-1 cursor-pointer" htmlFor="deadline">Deadline:</label>
                        <div className='w-full block'>
                            <DatePicker id="deadline" selected={startDate} onChange={(date) => {setStartDate(date); setNewTask(prev => ({ ...prev, deadline: date }))}} placeholderText="Select a deadline" 
                                minDate={new Date()} dateFormat="yyyy-MM-dd" autoComplete='off'
                                customInput={<input className="outline-0 border-2 px-4 py-2 rounded-lg border-my-blue3 font-roboto font-bold text-my-blue3"/>}/>
                        </div>
                    </div>
                    <div className='w-full flex justify-center items-center p-3 mt-3'>
                        <div onClick={updateTask} className="flex w-full sm:w-1/2 justify-center items-center p-4 border-2 rounded-xl font-roboto font-bold text-my-blue3 cursor-pointer duration-300 ease-in-out hover:text-my-back hover:bg-my-blue3">
                                Update task
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default UpdateTaskComponent;