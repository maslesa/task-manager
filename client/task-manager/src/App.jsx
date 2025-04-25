import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./WelcomePage";
import RegistrationPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import Tasks from "./Tasks";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/signup" element={<RegistrationPage />}></Route>
        <Route path="/signin" element={<LoginPage />}></Route>
        <Route path="/tasks" element={<Tasks />}></Route>
      </Routes>
    </Router>
  )
}

export default App
