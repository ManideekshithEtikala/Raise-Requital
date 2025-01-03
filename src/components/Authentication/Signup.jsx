// Signup.js
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";

const Signup = () => {
  const navigate = useNavigate();
  const { setUser  } = useContext(UserContext); // Access setUser  from context

  const responseGoogle = (response) => {
    const decoded_data = jwtDecode(response?.credential);
    // Storing data
    const clientId = response?.clientId;
    const { email_verified, name, picture } = decoded_data;
    const user = { email_verified, name, picture, clientId };

    // Update user data in context
    setUser (user);

    // Navigate to home page
    navigate("/");
  };

  const handleFailure = (error) => {
    console.error("Google login failed:", error);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <GoogleLogin
          clientId="224315552402-kcjqmamvvlggrnc8dpisidjr5m98dl6s.apps.googleusercontent.com"
          onSuccess={responseGoogle}
          onFailure={handleFailure}
          text="signin"
          theme="filled_blue"
          type="standard"
          size="large"
        />
      </div>
    </>
  );
};

export default Signup;