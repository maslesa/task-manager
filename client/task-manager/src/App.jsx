import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./auth-pages/WelcomePage";
import RegistrationPage from "./auth-pages/RegisterPage";
import LoginPage from "./auth-pages/LoginPage";
import Tasks from "./task-pages/Tasks";
import AllTasks from "./task-pages/AllTasks";
import ImportantTasks from "./task-pages/ImportantTasks";
import AccountSettings from "./account-pages/AccountSettings";
import ChangePassword from "./account-pages/ChangePassword";
import CompletedTasks from "./task-pages/CompletedTasks";
import NewTask from "./task-pages/NewTask";
import UncompletedTasks from "./task-pages/UncompletedTasks";
import TodayTasks from "./task-pages/TodayTasks";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/signup" element={<RegistrationPage />}></Route>
        <Route path="/signin" element={<LoginPage />}></Route>
        <Route path="/home" element={<Tasks />}></Route>
        <Route path="/tasks" element={<AllTasks />}></Route>
        <Route path="/tasks/add" element={<NewTask />}></Route>
        <Route path="/tasks/important" element={<ImportantTasks />}></Route>
        <Route path="/tasks/completed" element={<CompletedTasks />}></Route>
        <Route path="/tasks/today" element={<TodayTasks />}></Route>
        <Route path="/tasks/uncompleted" element={<UncompletedTasks />}></Route>
        <Route path="/account/settings" element={<AccountSettings />}></Route>
        <Route path="/account/password" element={<ChangePassword />}></Route>
      </Routes>
    </Router>
  )
}

export default App
