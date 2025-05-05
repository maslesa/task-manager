import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function AccountComponent(){

    const token = localStorage.getItem('token');
    const axiosConfig = {
        headers: { Authorization : `Bearer ${token}` }
    }
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showAlertFailed, setShowAlertFailed] = useState(false);

    const [newUsername, setNewUsername] = useState(user.username);

    const [changingUsernameNav, setChangingUsernameNav] = useState(false);

    const [enabledChanging, setEnableChanging] = useState(false);

    async function updateUsername(newUsername){

        if(newUsername.length > 3){
            try {
                const res = await axios.put('http://localhost:3000/account/update-account', { newUsername }, axiosConfig);
                if (res.data.success) {
                    const updatedUser = { ...user, username: newUsername };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
    
                    setShowAlertSuccess(true);
                    setTimeout(() => {
                        setShowAlertSuccess(false);
                    }, 2000);
                }           
    
            } catch (error) {
                setShowAlertFailed(true),
                setTimeout(() => {
                    setShowAlertFailed(false);
                }, 2000)  
            }
        }else{
            setShowAlertFailed(true),
                setTimeout(() => {
                    setShowAlertFailed(false);
                }, 2000)  
        }
    }

    return(
        <>
            {showAlertSuccess && (
                <div className="fixed top-4 right-4 bg-green-800 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
                    Username updated successfully!
                </div>
            )}
            {showAlertFailed && (
                <div className="fixed top-4 right-4 bg-red-800 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
                    User with that username already exists or invalid username format!
                </div>
            )}  
            {/* CONTENT */}
            <div className="w-full h-full flex flex-col justify-center items-center">
                    <div className="w-4/6 h-[480px] flex flex-col justify-baseline items-center">
                        <div className="w-full h-1/5 flex gap-2 justify-center items-center font-roboto font-bold text-3xl text-my-blue3 mb-15">
                            <img className="w-8" src="/login.png" alt="key" />
                            Account settings
                        </div>
                        <div className="w-5/6 h-full flex flex-col gap-5 items-center justify-base">

                            <div className="w-1/2 font-roboto font-bold text-xl text-my-blue3 flex flex-col gap-2 items-baseline justify-center">
                                <div className="w-full flex justify-between">
                                    <label className="cursor-pointer" htmlFor="username">Username:</label>
                                    {!enabledChanging ? (
                                        <div onClick={() => setEnableChanging(true)} className="w-35 h-7 font-roboto font-semibold text-sm flex justify-center items-center border-2 border-my-blue3 rounded-lg cursor-pointer text-my-blue3
                                                                                                duration-200 ease-in-out hover:bg-my-blue3 hover:text-my-back">
                                            Update username
                                        </div>
                                    ) : (
                                        <div className="flex w-full justify-end gap-3">
                                        <div onClick={() => {updateUsername(newUsername); setEnableChanging(false);}} className="w-20 h-7 font-roboto font-semibold text-sm flex justify-center items-center border-2 border-my-blue3 rounded-lg cursor-pointer text-my-blue3
                                                                                            duration-200 ease-in-out hover:bg-my-blue3 hover:text-my-back">
                                            Update
                                        </div>
                                        <div onClick={() => {setEnableChanging(false)}} className="w-20 h-7 font-roboto font-semibold text-sm flex justify-center items-center border-2 border-my-blue3 rounded-lg cursor-pointer text-my-blue3
                                                                                            duration-200 ease-in-out hover:bg-my-blue3 hover:text-my-back">
                                            Cancel
                                        </div>
                                    </div>
                                    )}
                                </div>
                                <input disabled={!enabledChanging} autoComplete="off" minLength={8} value={newUsername} onChange={(e) => {setNewUsername(e.target.value)}}
                                        className="border-2 outline-0 w-full p-1 pl-3 rounded-lg" type="text" id="username" />
                            </div>
                            <div className="w-1/2 font-roboto font-bold text-xl text-my-blue3 flex flex-col gap-2 items-baseline justify-center">
                                <label className="cursor-pointer" htmlFor="newpass">E-mail:</label>
                                <input minLength={8} value={user.email} className="border-2 outline-0 w-full p-1 pl-3 rounded-lg" type="text" id="newpass" disabled />
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )

}

export default AccountComponent;