import Header from "../components/Header";
import ImportantTasksComponent from "../components/ImportantTasks";

function ImportantTasks(){
    return(
        <>
            <div className="max-w-screen min-h-screen h-full bg-my-back flex flex-col justify-baseline items-center relative">
                <Header />
                <ImportantTasksComponent />
            </div>
        </>
    )
}

export default ImportantTasks;