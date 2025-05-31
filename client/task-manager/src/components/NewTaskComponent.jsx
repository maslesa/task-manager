import { useState } from 'react';
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function NewTaskComponent() {

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
    const addNewTask = async() => {
        try {
            if(newTask.title.length > 3){
                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/task/post`, newTask, axiosConfig);
                console.log('added successfully');
                setShowAlertSuccess(true);
                setTimeout(() => {
                    setShowAlertSuccess(false);
                }, 2000);
                setNewTask({ title: '', description: '', priority: 'medium', deadline: null });
            }else{
                setShowAlertFailed(true)
                setTimeout(() => {
                    setShowAlertFailed(false);
                }, 2000);
                console.log(error);
            }
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
                    Task added successfully!
                </div>
            )}
            {showAlertFailed && (
                <div className="fixed top-4 right-4 bg-red-800 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
                    Error adding new task or invalid title format!
                </div>
            )}
            <div className="w-2/3 h-[500px] flex flex-col justify-baseline items-center">
                <div className="w-full flex items-center justify-center">
                    <div className="flex gap-1 justify-baseline items-center">
                        <img className="w-8" src="/add.png" alt="tasks" />
                        <h2 className="font-roboto font-black text-2xl sm:text-3xl text-my-blue3">Add new task</h2>
                    </div>
                </div>
                <div className="flex flex-col gap-5 w-full sm:w-5/6 md:w-2/3 lg:w-1/2 h-full p-3 pt-10">
                    <div className="flex flex-col justify-center items-baseline">
                        <label className="font-roboto font-bold text-xl sm:text-2xl text-my-blue3 mb-1 cursor-pointer" htmlFor="title">Title:</label>
                        <input required minLength={3} maxLength={20} id="title" className="w-full outline-0 border-2 p-1 pl-3 rounded-lg border-my-blue3 font-roboto font-bold" type="text" 
                                value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value})}/>
                    </div>
                    <div className="flex flex-col justify-center items-baseline">
                        <label className="font-roboto font-bold text-xl sm:text-2xl text-my-blue3 mb-1 cursor-pointer" htmlFor="desc">Description:</label>
                        <textarea maxLength={50} className="resize-none w-full outline-0 border-2 p-1 pl-3 rounded-lg border-my-blue3 font-roboto font-bold" name="" id="desc"
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
                            <DatePicker id="deadline" selected={startDate} onChange={(date) => {if(date){
                                                                                                    date.setHours(12, 0, 0, 0);
                                                                                                    setStartDate(date); 
                                                                                                    setNewTask(prev => ({ ...prev, deadline: date }))
                                                                                                }}} 
                                placeholderText="Select a deadline" minDate={new Date()} dateFormat="yyyy-MM-dd" autoComplete='off'
                                customInput={<input className="outline-0 border-2 px-4 py-2 rounded-lg border-my-blue3 font-roboto font-bold text-my-blue3"/>}/>
                        </div>
                    </div>
                    <div className='w-full flex justify-center items-center p-3 mt-3'>
                        <div onClick={addNewTask} className="flex w-full sm:w-1/2 justify-center items-center p-4 border-2 rounded-xl font-roboto font-bold text-my-blue3 cursor-pointer duration-300 ease-in-out hover:text-my-back hover:bg-my-blue3">
                                Add new task
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default NewTaskComponent;