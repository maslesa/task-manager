import Header from "../components/Header"
import AccountComponent from "../components/AccountComponent"

function Account(){

    return(
        <>
            <div className="max-w-screen min-h-screen h-full bg-my-back flex flex-col justify-baseline items-center relative">
                <Header />
                <AccountComponent />
            </div>
        </>
    )

}

export default Account