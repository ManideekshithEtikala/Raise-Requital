import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../Authentication/UserContext";
import PropTypes from 'prop-types';
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FiDollarSign, FiUser,FiSettings,FiLogOut } from "react-icons/fi";
const NavbarE = ({ onCategoryChange }) => {
  const navigate=useNavigate();
  const { user } = useContext(UserContext);
  const [userlogin, setUserLogin] = useState(user?.email_verified);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [exploreDropdownVisible, setExploreDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    googleLogout();
    setUserLogin(false);
    setDropdownVisible(false);
  };

  const handleCategoryChange = (category) => {
    onCategoryChange(category);
  };

  const handleExploreMouseEnter = () => {
    setExploreDropdownVisible(true);
  };

  const handleExploreMouseLeave = () => {
    setExploreDropdownVisible(false);
  };

  return (
    <>
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-800 to-blue-900 py-4 px-6 shadow-md text-white">
        <div className="flex items-center justify-between">
          <div>
            <img
              src="https://www.creativefabrica.com/wp-content/uploads/2019/03/Monogram-RR-Logo-Design-by-Greenlines-Studios.jpg"
              alt="logoimage"
              className="w-10 h-10 rounded-full"
              onClick={()=>navigate('/')}
            />
          </div>
        </div>

        {/* Explore and search functionalities */}
        <div className="flex justify-end items-center w-full">
          <div
            className="flex justify-center items-center relative"
            onMouseEnter={handleExploreMouseEnter}
            onMouseLeave={handleExploreMouseLeave}
          >
            <span className="mx-2 cursor-pointer mr-4">
              <Link to={'/Entrepreneur'} className="text-white text-lg font-medium transition">Explore</Link>
            </span>
            {exploreDropdownVisible && (
              <div
                className="absolute top-full mt-2 w-48 bg-white border rounded-md shadow-lg"
                onMouseEnter={handleExploreMouseEnter}
                onMouseLeave={handleExploreMouseLeave}
              >
                <ul className="p-2 rounded-md cursor-pointer w-full text-gray-800">
                  <li onClick={() => handleCategoryChange('jewelry')} className="hover:bg-gray-300 rounded-sm hover:cursor-pointer p-1 ">Jewelry</li>
                  <li onClick={() => handleCategoryChange('fashion')} className="hover:bg-gray-300 rounded-sm hover:cursor-pointer p-1">Fashion</li>
                  <li onClick={() => handleCategoryChange('sports')} className="hover:bg-gray-300 rounded-sm hover:cursor-pointer p-1">Sports</li>
                  <li onClick={() => handleCategoryChange('electronics')} className="hover:bg-gray-300 rounded-sm hover:cursor-pointer p-1">Electronics</li>
                  <li onClick={() => handleCategoryChange('farming')} className="hover:bg-gray-300 rounded-sm hover:cursor-pointer p-1">Farming</li>
                  <li onClick={() => handleCategoryChange('healthcare')} className="hover:bg-gray-300 rounded-sm hover:cursor-pointer p-1">HealthCare</li>
                  <li onClick={() => handleCategoryChange('financial')} className="hover:bg-gray-300 rounded-sm hover:cursor-pointer p-1">Finance</li>
                  <li onClick={() => handleCategoryChange('realEstate')} className="hover:bg-gray-300 rounded-sm hover:cursor-pointer p-1">RealEstate</li>
                  <li onClick={() => handleCategoryChange('')} className="hover:bg-gray-300 rounded-sm hover:cursor-pointer p-1">All</li>
                </ul>
              </div>
            )}
          </div>
          <div>
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
                                    <FiUser className="mr-2" /> Dashboard
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/settings" className="flex items-center px-4 py-2 hover:bg-gray-100 transition">
                                    <FiSettings className="mr-2" /> Settings
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/earnings" className="flex items-center px-4 py-2 hover:bg-gray-100 transition">
                                    <FiDollarSign className="mr-2" /> Earnings
                                  </Link>
                                </li>
                                <li>
                                  <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 transition"
                                  >
                                    <FiLogOut className="mr-2" /> Sign out
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
        </div>
      </div>
    </>
  );
};

NavbarE.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
};

export default NavbarE;