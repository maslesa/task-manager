import axios from "axios";
import { useState } from "react";

function ChangePasswordComponent(){

    const token = localStorage.getItem('token');
    const axiosConfig = {
        headers: { Authorization : `Bearer ${token}` }
    }

    const [showAlertSuccessPass, setShowAlertSuccessPass] = useState(false);
    const [showAlertFailedPass, setShowAlertFailedPass] = useState(false);
    const [showAlertFailedPassMatch, setShowAlertFailedPassMatch] = useState(false);

    const [newPass, setNewPass] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    
    const updatePassword = async() => {
        const isPasswordValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(newPass.newPassword);
        try {
            if(newPass.newPassword !== newPass.confirmNewPassword || !isPasswordValid){
                return(
                    setShowAlertFailedPassMatch(true),
                    setTimeout(() => {
                        setShowAlertFailedPassMatch(false);
                    }, 2000)
                )
            }            
            await axios.put('http://localhost:3000/account/update-password', newPass, axiosConfig);
            setShowAlertSuccessPass(true),
            setTimeout(() => {
                setShowAlertSuccessPass(false);
            }, 2000)            

            setNewPass({oldPassword: '', newPassword: '', confirmNewPassword: ''});

        } catch (error) {
            setShowAlertFailedPass(true),
            setTimeout(() => {
                setShowAlertFailedPass(false);
            }, 2000)  
        }
    }

    return(
        <>
            {showAlertSuccessPass && (
                <div className="fixed top-4 right-4 bg-green-800 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
                    Password updated successfully!
                </div>
            )}
            {showAlertFailedPassMatch && (
                <div className="fixed top-4 right-4 bg-red-800 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
                    New passwords don't match or invalid new password form!
                </div>
            )}
            {showAlertFailedPass && (
                <div className="fixed top-4 right-4 bg-red-800 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
                    Old password is incorrect!
                </div>
            )}
            {/* CONTENT */}
            <div className="w-full h-full flex flex-col justify-center items-center">
                    <div className="w-4/6 h-[480px] flex flex-col justify-baseline items-center">
                        <div className="w-full h-1/5 flex gap-2 justify-center items-center font-roboto font-bold text-3xl text-my-blue3 mb-15">
                            <img className="w-8" src="/padlock.png" alt="key" />
                            Change password
                        </div>
                        <div className="w-5/6 h-full flex flex-col gap-5 items-center justify-center">
                            <div className="w-1/2 font-roboto font-bold text-xl text-my-blue3 flex flex-col gap-2 items-baseline justify-center">
                                <label className="cursor-pointer" htmlFor="oldpass">Old password:</label>
                                <input minLength={8} value={newPass.oldPassword} onChange={(e) => setNewPass({...newPass, oldPassword: e.target.value})} className="border-2 outline-0 w-full p-1 pl-3 rounded-lg" type="password" id="oldpass" />
                            </div>
                            <div className="w-1/2 font-roboto font-bold text-xl text-my-blue3 flex flex-col gap-2 items-baseline justify-center">
                                <label className="cursor-pointer" htmlFor="newpass">New password:</label>
                                <input minLength={8} value={newPass.newPassword} onChange={(e) => setNewPass({...newPass, newPassword: e.target.value})} className="border-2 outline-0 w-full p-1 pl-3 rounded-lg" type="password" id="newpass" />
                            </div>
                            <div className="w-1/2 font-roboto font-bold text-xl text-my-blue3 flex flex-col gap-2 items-baseline justify-center mb-5">
                                <label className="cursor-pointer" htmlFor="confnewpass">Confirm new password:</label>
                                <input minLength={8} value={newPass.confirmNewPassword} onChange={(e) => setNewPass({...newPass, confirmNewPassword: e.target.value})} className="border-2 outline-0 w-full p-1 pl-3 rounded-lg" type="password" id="confnewpass" />
                            </div>
                            <div onClick={updatePassword} className="flex justify-center items-center p-4 border-2 rounded-xl font-roboto font-bold text-my-blue3 cursor-pointer duration-300 ease-in-out hover:text-my-back hover:bg-my-blue3">
                                Change password
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )

}

export default ChangePasswordComponent