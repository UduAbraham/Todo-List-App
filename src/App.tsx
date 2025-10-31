import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import SignUp from "./pages/sign-Up";
import LoginPage from "./pages/login-In";
import DashboardLayout from "./layouts/dasboard_layout";
import Today from "./pages/dashboard/component/today";
import Work from "./pages/dashboard/component/work";
import Personal from "./pages/dashboard/component/personal";
import Shoppinglist from "./pages/dashboard/component/sshopping_list";


function App() {
  return (
    <Routes>
      <Route element={<SignUp />} path="/" />
      <Route element={<HomePage />} path="/homepage" />
       <Route element={<LoginPage/>} path="/login"/>

       
      <Route element ={<DashboardLayout/>} path="/dashboard">
      <Route element={<Today/>} path="/dashboard/today"/>
      <Route element={<Work/>} path="/dashboard/work"/>
      <Route element={<Personal/>} path="/dashboard/personal"/>
      <Route element={<Shoppinglist/>} path="/dashboard/shoppinglist"/>
      </Route>
    
    </Routes>
  );
}

export default App;
