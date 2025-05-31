import { useState } from "react";
import UserMenu from "./UserMenu";

function Header(){

    const user = JSON.parse(localStorage.getItem('user'));

    const [showUserMenu, setShowUserMenu] = useState(false);

    return(
        <>  
            {showUserMenu && (
                <UserMenu showUserMenu={showUserMenu} setShowUserMenu={setShowUserMenu}/>
            )}
            <div className="max-w-screen w-full h-[120px] flex md:pl-20 md:pr-20 sm:pl-10 sm:pr-10 pl-5 pr-5 justify-between mb-5">
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
        </>
    )

}

export default Header;