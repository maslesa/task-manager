import Header from "../components/Header";
import NewTaskComponent from "../components/NewTaskComponent";

function NewTask(){

    return(
        <>
            <div className="max-w-screen min-h-screen h-full bg-my-back flex flex-col justify-baseline items-center relative">
                <Header />
                <NewTaskComponent />
            </div>
        </>
    )

}

export default NewTask