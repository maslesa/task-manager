import Header from "../components/Header";
import ImportantTasks from "../components/ImportantTasks";
import AllTasksComponent from "../components/AllTasksComponent";

function Tasks(){

    return(
        <>
            <div className="max-w-screen min-h-screen h-full bg-my-back flex flex-col justify-baseline items-center relative">
                <Header />
                <ImportantTasks />
                <AllTasksComponent />
            </div>
        </>
    );
}

export default Tasks;