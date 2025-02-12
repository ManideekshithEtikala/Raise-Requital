import "./App.css";
import { UserProvider } from "./components/Authentication/UserContext.jsx";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import HomePage from "./components/Entrepreneur/HomePage.jsx";
import UserDetials from "./components/Entrepreneur/UserDetials/UserDetials.jsx";
function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/Entrepreneur/Details" element={<UserDetials />} />
                <Route path="/Entrepreneur" element={<HomePage />} />
              </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}
export default App;
