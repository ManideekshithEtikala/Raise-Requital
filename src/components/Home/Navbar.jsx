import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../Authentication/UserContext";
import { googleLogout } from "@react-oauth/google";
import { FiBell, FiLogOut, FiUser, FiSettings, FiDollarSign } from "react-icons/fi"; 
import socket from "../Entrepreneur/SocketConnnection/socket.js"; // Import the Socket.IO client instance

export const Navbar = () => {
  const { user } = useContext(UserContext);
  const [userlogin, setUserLogin] = useState(user?.email_verified);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUserLogin(user?.email_verified);
  }, [user]);

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const handleLogout = () => {
    googleLogout();
    setUserLogin(false);
    setDropdownVisible(false);
  };

  useEffect(() => {
    if (user?.sub) {
      socket.emit("join", { userId: user.sub, role: "user" });

      socket.on("receiveMessage", ({ senderId, message }) => {
        console.log("Message received:", { senderId, message });
        setNotification({ senderId, message });
      });

      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [user?.sub]);

  const handleOpenChat = () => {
    if (notification) {
      navigate("/chat", {
        state: {
          senderId: user.sub,
          receiverId: notification.senderId,
          role: "user",
        },
      });
      setNotification(null);
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between bg-gradient-to-r from-blue-800 to-blue-900 py-4 px-6 shadow-md text-white">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://www.creativefabrica.com/wp-content/uploads/2019/03/Monogram-RR-Logo-Design-by-Greenlines-Studios.jpg"
            alt="logoimage"
            className="w-12 h-12 rounded-full border border-gray-200 shadow-lg"
          />
          <span className="ml-3 text-xl font-bold">Raise Requital</span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/Entrepreneur" className="text-white text-lg font-medium hover:text-gray-300 transition">Explore</Link>
          <div className="relative">
            <FiBell className="w-6 h-6 cursor-pointer hover:text-gray-300 transition" />
            {notification && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                1
              </span>
            )}
          </div>

          {/* Profile Section */}
          {userlogin ? (
            <div className="relative">
              <img
                src={user.picture}
                onClick={toggleDropdown}
                alt="profile"
                className="rounded-full w-10 h-10 border border-gray-300 shadow-md cursor-pointer hover:scale-105 transition-transform"
              />
              {dropdownVisible && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b">
                    <span className="block text-sm font-semibold">{user.name || "User Name"}</span>
                    <span className="block text-xs text-gray-500">{user.email || "user@example.com"}</span>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link to="/dashboard" className="flex items-center px-4 py-2 hover:bg-gray-100 transition">
                        <FiUser className="mr-2"/> Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link to="/settings" className="flex items-center px-4 py-2 hover:bg-gray-100 transition">
                        <FiSettings className="mr-2"/> Settings
                      </Link>
                    </li>
                    <li>
                      <Link to="/earnings" className="flex items-center px-4 py-2 hover:bg-gray-100 transition">
                        <FiDollarSign className="mr-2"/> Earnings
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 transition"
                      >
                        <FiLogOut className="mr-2"/> Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white text-blue-900 px-4 py-2 rounded-lg shadow-md font-medium hover:bg-gray-200 transition"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Notification Popup */}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg flex items-center space-x-4 animate-bounce">
          <div>
            <p className="mb-1">
              <strong>New Message from:</strong> {notification.senderId}
            </p>
            <p className="text-sm">{notification.message}</p>
          </div>
          <button
            onClick={handleOpenChat}
            className="bg-white text-blue-600 px-3 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Open Chat
          </button>
        </div>
      )}
    </>
  );
};
