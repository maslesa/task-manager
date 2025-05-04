import Header from "../components/Header";
import HomeSlider from "../components/HomeSlider";
import TodayTasksComponent from "../components/TodayTasksComponent"

function Tasks(){

    return(
        <>
            <div className="max-w-screen min-h-screen h-full bg-my-back flex flex-col justify-baseline items-center relative">
                <Header />
                <TodayTasksComponent />
                <HomeSlider />
            </div>
        </>
    );
}

export default Tasks;