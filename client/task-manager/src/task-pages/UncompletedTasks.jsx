import Header from "../components/Header";
import UncompletedTasksComponent from "../components/UncompletedTasksComponent";

function UncompletedTasks(){

    return(
        <>  
            <div className="max-w-screen min-h-screen h-full bg-my-back flex flex-col justify-baseline items-center relative">
                <Header />
                <UncompletedTasksComponent />
            </div>
        </>
    )

}

export default UncompletedTasks;