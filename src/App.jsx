import "./App.css";
import { UserProvider } from "./components/Authentication/UserContext.jsx";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}
export default App;
