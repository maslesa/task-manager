import { useNavigate } from "react-router-dom";

function UserMenu({ showUserMenu, setShowUserMenu }) {

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    return (
        <>  
            {/* USER MENU */}
            {showUserMenu && (
                <div className="fixed inset-0 bg-my-back50 flex justify-end items-center z-40" onClick={() => setShowUserMenu(false)}>
                    <div className="sm:hidden absolute top-7 right-7 z-60">
                        <img className="w-6" src="/cancel2.png" alt="cancel" />
                    </div>
                    <div className={`w-screen sm:w-[400px] h-screen bg-my-blue3 flex flex-col justify-baseline items-center shadow-2xl z-50 pt-15 relative transition-transform duration-500 ease-in-out ${showUserMenu ? "translate-x-0" : "translate-x-full"} `} onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-5 mb-5 border-b-2 pb-7 border-my-back w-5/6">
                            <div className="flex justify-center items-center">
                                <div onClick={() => {navigate('/account/settings');setShowUserMenu(false);}} className="shadow-lg w-12 h-12 bg-my-back rounded-[200px] flex justify-center items-center font-roboto font-bold text-xl text-my-blue3 cursor-pointer hover:scale-102 duration-200 ease-in-out">
                                    {user.username.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div>
                                <h2 className="font-roboto font-bold text-my-back">{user.username}</h2>
                                <h3 className="font-roboto font-base text-my-back50">{user.email}</h3>
                            </div>
                        </div>
                        <div className="w-5/6 flex flex-col gap-2 border-b-2 pb-7 border-my-back mb-5">
                            <div onClick={() => { navigate('/account/settings'); setShowUserMenu(false) }} className="flex gap-2 p-2 pl-5 duration-200 ease-in-out rounded-lg hover:bg-my-back-low cursor-pointer">
                                <img className="w-6" src="/user.png" alt="acc" />
                                <h3 className="font-roboto font-base text-my-back">Account settings</h3>
                            </div>
                            <div onClick={() => { navigate('/account/password'); setShowUserMenu(false)}} className="flex gap-2 p-2 pl-5 duration-200 ease-in-out rounded-lg hover:bg-my-back-low cursor-pointer">
                                <img className="w-6" src="/password.png" alt="alltasks" />
                                <h3 className="font-roboto font-base text-my-back">Change password</h3>
                            </div>
                        </div>
                        <div className="w-5/6 flex flex-col gap-2 border-b-2 pb-7 border-my-back">
                            <div onClick={() => { navigate('/home'); setShowUserMenu(false) }} className="flex gap-2 p-2 pl-5 duration-200 ease-in-out rounded-lg hover:bg-my-back-low cursor-pointer">
                                <img className="w-6" src="/home.png" alt="alltasks" />
                                <h3 className="font-roboto font-base text-my-back">Home</h3>
                            </div>
                            <div onClick={() => { navigate ('/tasks/add'); setShowUserMenu(false)}} className="flex gap-2 p-2 pl-5 duration-200 ease-in-out rounded-lg hover:bg-my-back-low cursor-pointer">
                                <img className="w-6" src="/addtask.png" alt="alltasks" />
                                <h3 className="font-roboto font-base text-my-back">Add new task</h3>
                            </div>
                            <div onClick={() => { navigate('/tasks'); setShowUserMenu(false) }} className="flex gap-2 p-2 pl-5 duration-200 ease-in-out rounded-lg hover:bg-my-back-low cursor-pointer">
                                <img className="w-6" src="/alltasks.png" alt="alltasks" />
                                <h3 className="font-roboto font-base text-my-back">All tasks</h3>
                            </div>
                            <div onClick={() => { navigate('/tasks/important'); setShowUserMenu(false) }} className="flex gap-2 p-2 pl-5 duration-200 ease-in-out rounded-lg hover:bg-my-back-low cursor-pointer">
                                <img className="w-6" src="/importanttasks.png" alt="alltasks" />
                                <h3 className="font-roboto font-base text-my-back">Important tasks</h3>
                            </div>
                            <div onClick={() => { navigate('/tasks/today'); setShowUserMenu(false) }} className="flex gap-2 p-2 pl-5 duration-200 ease-in-out rounded-lg hover:bg-my-back-low cursor-pointer">
                                <img className="w-6" src="/today.png" alt="alltasks" />
                                <h3 className="font-roboto font-base text-my-back">Today tasks</h3>
                            </div>
                            <div onClick={() => { navigate('/tasks/completed'); setShowUserMenu(false) }} className="flex gap-2 p-2 pl-5 duration-200 ease-in-out rounded-lg hover:bg-my-back-low cursor-pointer">
                                <img className="w-6" src="/done.png" alt="alltasks" />
                                <h3 className="font-roboto font-base text-my-back">Completed tasks</h3>
                            </div>
                            <div onClick={() => { navigate('/tasks/uncompleted'); setShowUserMenu(false) }} className="flex gap-2 p-2 pl-5 duration-200 ease-in-out rounded-lg hover:bg-my-back-low cursor-pointer">
                                <img className="w-6" src="/cancel.png" alt="alltasks" />
                                <h3 className="font-roboto font-base text-my-back">Uncompleted tasks</h3>
                            </div>
                        </div>
                        <div className="w-full h-25 absolute bottom-0 flex justify-center items-center">
                            <div onClick={() => { navigate('/signin'); setShowUserMenu(false) }} className="w-5/6 p-2 flex gap-2 justify-center items-center duration-200 ease-in-out rounded-lg hover:bg-my-back-low cursor-pointer">
                                <img className="w-6" src="/logout.png" alt="logout" />
                                <h1 className="font-roboto text-lg text-my-back">Sign out</h1>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )

}

export default UserMenu;