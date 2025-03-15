import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../Authentication/UserContext";
import PropTypes from 'prop-types';
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
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
      <div className="flex justify-around py-5 px-5">
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
            <span className="mx-2 cursor-pointer">
              <Link to={'/Entrepreneur'} className="py-3">Explore</Link>
            </span>
            {exploreDropdownVisible && (
              <div
                className="absolute top-full mt-2 w-48 bg-white border rounded-md shadow-lg"
                onMouseEnter={handleExploreMouseEnter}
                onMouseLeave={handleExploreMouseLeave}
              >
                <ul className="p-2 rounded-md cursor-pointer w-full">
                  <li onClick={() => handleCategoryChange('jewelry')} className="hover:bg-gray-300 rounded-sm hover:cursor-pointer p-1">Jewelry</li>
                  <li onClick={() => handleCategoryChange('')} className="hover:bg-gray-300 rounded-sm hover:cursor-pointer p-1">All</li>
                  <li onClick={() => handleCategoryChange('clothing')} className="hover:bg-gray-300 rounded-sm hover:cursor-pointer p-1">Clothing</li>
                  <li onClick={() => handleCategoryChange('fashion')} className="hover:bg-gray-300 rounded-sm hover:cursor-pointer p-1">Fashion</li>
                  <li onClick={() => handleCategoryChange('accessories')} className="hover:bg-gray-300 rounded-sm hover:cursor-pointer p-1">Accessories</li>
                  <li onClick={() => handleCategoryChange('techProducts')} className="hover:bg-gray-300 rounded-sm hover:cursor-pointer p-1">Tech Products</li>
                  <li onClick={() => handleCategoryChange('sports')} className="hover:bg-gray-300 rounded-sm hover:cursor-pointer p-1">Sports</li>
                  <li onClick={() => handleCategoryChange('electronics')} className="hover:bg-gray-300 rounded-sm hover:cursor-pointer p-1">Electronics</li>
                </ul>
              </div>
            )}
          </div>
          <div>
            {userlogin ? (
              <div className="relative">
                <img
                  src={user?.picture}
                  onClick={toggleDropdown}
                  alt="profile image"
                  className="rounded-full w-8 h-8 cursor-pointer"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150";
                  }}
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

NavbarE.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
};

export default NavbarE;