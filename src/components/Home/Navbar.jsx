import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../Authentication/UserContext";
import { googleLogout } from "@react-oauth/google";
import socket from "../Entrepreneur/SocketConnnection/socket.js"; // Import the Socket.IO client instance

export const Navbar = () => {
  const { user } = useContext(UserContext);
  const [userlogin, setUserLogin] = useState(user?.email_verified);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [notification, setNotification] = useState(null); // Store notification details
  const navigate = useNavigate();

  useEffect(() => {
    setUserLogin(user?.email_verified);
  }, [user]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    googleLogout();
    setUserLogin(false);
    setDropdownVisible(false);
  };

  // Listen for incoming messages
  useEffect(() => {
    if (user?.sub) {
      // Join the socket room with the user's ID
      socket.emit("join", { userId: user.sub, role: "user" });

      // Listen for incoming messages
      socket.on("receiveMessage", ({ senderId, message }) => {
        console.log("Message received:", { senderId, message });
        setNotification({ senderId, message }); // Set the notification details
      });

      // Cleanup on component unmount
      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [user?.sub]);

  const handleOpenChat = () => {
    if (notification) {
      navigate("/chat", {
        state: {
          senderId: user.sub, // Logged-in user's ID
          receiverId: notification.senderId, // The sender of the message
          role: "user",
        },
      });
      setNotification(null); // Clear the notification after opening the chat
    }
  };
  return (
    <>
      <div className="flex justify-between bg-blue-900 py-5 mx-10 bg-transparent text-brown-800 3`">
        <div className="flex items-center justify-between">
          <div>
            <img
              src="https://www.creativefabrica.com/wp-content/uploads/2019/03/Monogram-RR-Logo-Design-by-Greenlines-Studios.jpg"
              alt="logoimage"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>

        {/* Explore and search functionalities */}
        <div className="flex justify-end items-center w-full">
          <div className="flex justify-center items-center">
            <span className="mx-2 cursor-pointer">
              <Link to={"/Entrepreneur"}>Explore</Link>
            </span>
          </div>
          <div>
  {userlogin ? (
    <div className="relative">
      <img
        src={user.picture}
        onClick={toggleDropdown}
        alt="profile image"
        className="rounded-full w-6 h-6 sm:w-8 sm:h-8 cursor-pointer"
      />
      {dropdownVisible && (
        <div
          className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 absolute right-0 mt-2 w-48"
          id="user-dropdown"
        >
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">
              {user.name || "User Name"}
            </span>
            <span className="block text-xs text-gray-500 truncate dark:text-gray-400">
              {user.email || "user@example.com"}
            </span>
          </div>
          <ul className="py-2" aria-labelledby="user-menu-button">
            <li>
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                to="/earnings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Earnings
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left"
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  ) : (
    <Link
      to={"/login"}
      className="p-2 rounded-md cursor-pointer transition duration-4000 ease-in-out"
    >
      <span className="text-gray-800 hover:text-gray-900 hover:underline">
        Login
      </span>
    </Link>
  )}
</div>
        </div>
      </div>

      {/* Notification Section */}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg">
          <p className="mb-2">
            New message from: <strong>{notification.senderId}</strong>
          </p>
          <p className="mb-2">Message: {notification.message}</p>
          <button
            onClick={handleOpenChat}
            className="bg-white text-blue-500 px-4 py-2 rounded-lg"
          >
            Open Chat
          </button>
        </div>
      )}
    </>
  );
};