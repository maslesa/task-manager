import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function RegistrationPage() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showAlertFailed, setShowAlertFailed] = useState(false);
    const [showAlertFailedRestriction, setShowAlertFailedRestriction] = useState(false);

    const [loading, setLoading] = useState(false);

    const register = async () => {
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isPasswordValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password);

        if (isEmailValid && isPasswordValid && username.length > 3) {
            setLoading(true);
            try {
                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/register`, { username, email, password });
                setShowAlertSuccess(true);
                setTimeout(() => {
                    setShowAlertSuccess(false);
                    navigate('/signin');
                }, 2000);
            } catch (error) {
                console.error("Signup failed:", error.response?.data || error.message);
                setShowAlertFailed(true);
                setTimeout(() => {
                    setShowAlertFailed(false);
                }, 2000);
            } finally {
                setLoading(false);
            }
        } else {
            setShowAlertFailedRestriction(true);
            setTimeout(() => {
                setShowAlertFailedRestriction(false);
            }, 2000);
        }
    }

    return (
        <>
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full bg-black opacity-40 flex gap-3 flex-col justify-center items-center z-50">
                    <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
                    <div className="font-roboto text-white opacity-100">Signing up...</div>
                </div>
            )}
            {showAlertSuccess && (
                <div className="absolute top-4 right-4 bg-green-800 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
                    Sign up successful!
                </div>
            )}
            {showAlertFailed && (
                <div className="absolute top-4 right-4 bg-red-800 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
                    Sign up error
                </div>
            )}
            {showAlertFailedRestriction && (
                <div className="absolute top-4 right-4 bg-red-800 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
                    Invalid username, email or password format.
                </div>
            )}
            <div className="w-screen h-screen bg-my-back flex justify-center items-center relative">
                <div className='absolute h-35 flex justify-center items-center top-0 left-10 sm:left-15'>
                    <a href="/">
                        <img className='w-7 cursor-pointer hover:scale105 duration-200 ease-in-out' src="/back.png" alt="back-arrow" />
                    </a>
                </div>
                <div className="h-2/3 w-full sm:w-1/2 flex flex-col justify-center items-center">
                    <div className="w-full h-1/4 sm:h-1/3 flex justify-center items-center gap-3">
                        <img className="w-8 sm:w-10" src="/register.png" alt="reg-pic" />
                        <h2 className="font-roboto font-black text-3xl sm:text-5xl text-my-blue3">Sign up</h2>
                    </div>
                    <div className="w-full h-2/3 flex flex-col justify-baseline items-center gap-4 sm:gap-10">
                        <div className="2xl:w-1/2 xl:w-2/3 lg:w-4/5 sm:w-full flex flex-col sm:items-center sm:flex-row sm:justify-between gap-3">
                            <label className="cursor-pointer font-roboto font-bold text-2xl text-my-blue3" htmlFor="usernameInput">Username:</label>
                            <input autoComplete="off" value={username} onChange={e => setUsername(e.target.value)} id="usernameInput" className="w-70 border-2 rounded-lg border-my-blue3 pl-2 text-my-blue3 font-roboto font-semibold h-9" type="text" />
                        </div>
                        <div className="2xl:w-1/2 xl:w-2/3 lg:w-4/5 sm:w-full flex flex-col sm:items-center sm:flex-row sm:justify-between gap-3">
                            <label className="cursor-pointer font-roboto font-bold text-2xl text-my-blue3" htmlFor="emailInput">Email:</label>
                            <input autoComplete="off" value={email} onChange={e => setEmail(e.target.value)} id="emailInput" className="border-2 rounded-lg border-my-blue3 pl-2 w-70 text-my-blue3 font-roboto font-semibold h-9" type="text" />
                        </div>
                        <div className="2xl:w-1/2 xl:w-2/3 lg:w-4/5 sm:w-full flex flex-col sm:items-center sm:flex-row sm:justify-between gap-3">
                            <label className="cursor-pointer font-roboto font-bold text-2xl text-my-blue3" htmlFor="passwordInput">Password:</label>
                            <input value={password} onChange={e => setPassword(e.target.value)} id="passwordInput" className="border-2 rounded-lg border-my-blue3 pl-2 w-70 text-my-blue3 font-semibold h-9" type="password" />
                        </div>
                        <a className=" underline font-roboto font-light text-md text-my-blue3 text-center" href="/signin">Already have an account?</a>
                        <button onClick={register} className="w-40 h-10 border-4 rounded-lg border-my-blue3 text-my-blue3 font-roboto font-bold
                                           duration-200 ease-in-out hover:scale-105 hover:bg-my-blue3 hover:text-my-back cursor-pointer">
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegistrationPage;