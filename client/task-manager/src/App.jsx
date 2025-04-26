import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./WelcomePage";
import RegistrationPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import Tasks from "./Tasks";
import AllTasks from "./AllTasks";
import ImportantTasks from "./ImportantTasks";

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
      </Routes>
    </Router>
  )
}

export default App
