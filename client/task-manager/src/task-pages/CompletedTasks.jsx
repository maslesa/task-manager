import Header from "../components/Header";
import CompletedTasksComponent from "../components/CompletedTasksComponent";

function CompletedTasks(){

    return(
        <>
            <div className="max-w-screen min-h-screen h-full bg-my-back flex flex-col justify-baseline items-center relative">
                <Header />
                <CompletedTasksComponent />
            </div>
        </>
    )

}

export default CompletedTasks;