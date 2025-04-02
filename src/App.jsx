import "./App.css";
import { UserProvider } from "./components/Authentication/UserContext.jsx";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import HomePage from "./components/Entrepreneur/HomePage.jsx";
import UserDetials from "./components/Entrepreneur/UserDetials/UserDetials.jsx";
import IndividualBuisines from "./components/Entrepreneur/components/IndividualBuisines.jsx";
import ChatPage from './components/Entrepreneur/SocketConnnection/ChatPage.jsx'
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
                <Route path="/Entrepreneur/:id" element={<IndividualBuisines />} />
                <Route path="/chat" element={<ChatPage />} />
              </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}
export default App;
