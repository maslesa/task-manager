import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./WelcomePage";
import RegistrationPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import Tasks from "./Tasks";
import AllTasks from "./AllTasks";
import ImportantTasks from "./ImportantTasks";
import AccountSettings from "./AccountSettings";
import ChangePassword from "./ChangePassword";
import CompletedTasks from "./CompletedTasks";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/signup" element={<RegistrationPage />}></Route>
        <Route path="/signin" element={<LoginPage />}></Route>
        <Route path="/home" element={<Tasks />}></Route>
        <Route path="/tasks" element={<AllTasks />}></Route>
        <Route path="/tasks/important" element={<ImportantTasks />}></Route>
        <Route path="/tasks/completed" element={<CompletedTasks />}></Route>
        <Route path="/account/settings" element={<AccountSettings />}></Route>
        <Route path="/account/password" element={<ChangePassword />}></Route>
      </Routes>
    </Router>
  )
}

export default App
