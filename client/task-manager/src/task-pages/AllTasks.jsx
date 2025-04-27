import Header from "../components/Header";
import AllTasksComponent from "../components/AllTasksComponent";

function AllTasks(){
    return(
        <>
            <div className="max-w-screen min-h-screen h-full bg-my-back flex flex-col justify-baseline items-center relative">
                <Header />
                <AllTasksComponent />
            </div>
        </>
    )
}

export default AllTasks;