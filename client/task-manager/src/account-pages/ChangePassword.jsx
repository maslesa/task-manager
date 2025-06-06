import Header from "../components/Header";
import ChangePasswordComponent from "../components/ChangePasswordComponent";

function ChangePassword(){

    return(
        <>  
            <div className="max-w-screen min-h-screen h-full bg-my-back flex flex-col justify-baseline items-center relative">
                <Header />
                <ChangePasswordComponent />
            </div>
        </>
    )

}

export default ChangePassword;