import Header from "../components/Header";
import UpdateTaskComponent from "../components/UpdateTaskComponent";

function UpdateTask(){

    return(
        <>
            <div className="max-w-screen min-h-screen h-full bg-my-back flex flex-col justify-baseline items-center relative">
                <Header />
                <UpdateTaskComponent />
            </div>
        </>
    );

}

export default UpdateTask;