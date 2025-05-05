import { useNavigate } from "react-router-dom";

function WelcomePage(){

    const navigate = useNavigate();

    return(
        <>
            <div className="w-screen h-screen bg-my-back flex justify-center items-center">
                <div className="h-2/3 w-full xl:w-1/2 flex flex-col justify-center items-center">
                    <div className="w-full h-2/3 flex flex-col justify-center items-center gap-10">
                        <h2 className="font-roboto font-black text-5xl text-my-blue3 text-center">Welcome to TaskManager</h2>
                        <img className="animate-scale-pulse w-30 sm:w-50" src="/logo.png" alt="logo-pic" />
                    </div>
                    <div className="w-full h-1/3 hidden xl:flex flex-col justify-center items-center gap-5 ">
                        <div onClick={() => navigate('/signin')}  
                        className="flex border-4 border-my-blue3 rounded-3xl w-1/4 h-1/3 justify-center items-center gap-2 cursor-pointer hover:scale-102 duration-200 ease-in-out">
                            <img className="w-7" src="/login.png" alt="signin pic" />
                            <button className="text-my-blue3 font-roboto font-bold cursor-pointer">Sign in</button>
                        </div>
                        <div onClick={() => navigate('/signup')} 
                            className="flex border-4 border-my-blue3  rounded-3xl w-1/4 h-1/3 justify-center items-center gap-2 cursor-pointer hover:scale-102 duration-200 ease-in-out">
                            <img className="w-7" src="/register.png" alt="register pic" />
                            <button className="text-my-blue3 font-roboto font-bold cursor-pointer">Sign up</button>
                        </div>
                    </div>
                    <div className="font-roboto text-2xl font-semibold flex max-w-10/12 text-center mt-10 xl:hidden">
                        Currently not available for this device!
                    </div>
                </div>
            </div>
        </>
    )
}

export default WelcomePage;