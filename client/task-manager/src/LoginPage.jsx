import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function LoginPage(){

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showAlertFailed, setShowAlertFailed] = useState(false);

    const login = async() => {        
        try {
            const res = await axios.post('http://localhost:3000/user/login', {username, password});            
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setShowAlertSuccess(true);
            setTimeout(() => {
                setShowAlertSuccess(false);
                navigate('/tasks');
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
                <div className="absolute top-4 right-4 bg-green-800 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
                    Sign in successful!
                </div>
            )}
            {showAlertFailed && (
                <div className="absolute top-4 right-4 bg-red-800 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
                    Incorrect credentials!
                </div>
            )}
            <div className="w-screen h-screen bg-my-back flex justify-center items-center">
                <div className='absolute h-35 flex justify-center items-center top-0 left-15'>
                    <a href="/">
                        <img className='w-7 cursor-pointer hover:scale105 duration-200 ease-in-out' src="/back.png" alt="back-arrow" />
                    </a>
                </div>
                <div className="h-2/3 w-1/2 flex flex-col justify-center items-center">
                    <div className="w-full h-1/3 flex justify-center items-center gap-3">
                    <img className="w-10" src="/login.png" alt="login-pic" />
                        <h2 className="font-roboto font-black text-5xl text-my-blue3">Sign in</h2>
                    </div>
                    <div className="w-full h-2/3 flex flex-col justify-baseline items-center gap-10">
                        <div className="flex gap-3">
                            <label className="cursor-pointer font-roboto font-bold text-2xl text-my-blue3" htmlFor="usernameInput">Username:</label>
                            <input autoComplete="off" value={username} onChange={e => setUsername(e.target.value)} id="usernameInput" className="border-2 rounded-lg border-my-blue3 pl-2 w-70 text-my-blue3 font-roboto font-semibold" type="text" />
                        </div>
                        <div className="flex gap-3">
                            <label className="cursor-pointer font-roboto font-bold text-2xl text-my-blue3" htmlFor="passwordInput">Password:</label>
                            <input value={password} onChange={e => setPassword(e.target.value)} id="passwordInput" className="border-2 rounded-lg border-my-blue3 pl-2 w-70 text-my-blue3 font-semibold" type="password" />
                        </div>
                        <a className=" underline font-roboto font-light text-md text-my-blue3" href="/signup">Don't have an account?</a>
                        <button onClick={login} className="w-40 h-10 border-4 rounded-lg border-my-blue3 text-my-blue3 font-roboto font-bold
                                           duration-200 ease-in-out hover:scale-105 hover:bg-my-blue3 hover:text-my-back cursor-pointer">
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage;