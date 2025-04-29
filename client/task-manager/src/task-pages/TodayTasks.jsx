import Header from "../components/Header";
import TodayTasksComponent from "../components/TodayTasksComponent";

function TodayTasks(){

    return(
        <>
            <div className="max-w-screen min-h-screen h-full bg-my-back flex flex-col justify-baseline items-center relative">
                <Header />
                <TodayTasksComponent />
            </div>
        </>
    )

}

export default TodayTasks;