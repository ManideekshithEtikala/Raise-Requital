import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useContext, useState } from "react";
import { UserContext } from "../Authentication/UserContext";
import { googleLogout } from "@react-oauth/google";
export const Navbar = () => {
  const { user } = useContext(UserContext);
  const [userlogin, setUserLogin] = useState(user?.email_verified);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    googleLogout();
    setUserLogin(false);
    setDropdownVisible(false);
  };

  return (
    <>
      <div className="flex justify-between bg-blue-900 py-5 px-5 bg-transparent text-brown-800 ">
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
            <span className="mx-2 cursor-pointer"><Link to={'/Entrepreneur'}>Explore</Link></span>
          </div>
          <div className="flex items-center rounded-md justify-around mx-4 bg-white text-sm">
            <input
              className="px-2 py-1 mx-2 rounded-md outline-none bg-transparent text-gray-800"
              placeholder="Search your category"
            />
            <FaSearch className="rounded-lg mr-1 w-6 h-6 text-gray-400 flex items-center justify-center hover:cursor-pointer" />
          </div>
          <div>
            {userlogin ? (
              <div>
              <img
                src={user?.picture}
                onClick={toggleDropdown}
                alt="profile image"
                className="rounded-full w-8 h-8 cursor-pointer"
              />
              {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left rounded-md"
                  >
                    Logout
                  </button>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                  >
                    Profile
                  </Link>
                  {/* Add more dropdown items here */}
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
    </>
  );
};
