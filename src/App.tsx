import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import SignUp from "./pages/sign-Up";
import LoginPage from "./pages/login-In";


function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<SignUp />} path="/signup" />
       <Route element={<LoginPage/>} path="/login"/>
    
    </Routes>
  );
}

export default App;
