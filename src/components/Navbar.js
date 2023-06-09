import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, login, selectUser } from "../feature/userSlice";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  }, [location.pathname]);

  const handlerLogOut = async () => {
    await signOut(auth)
      .then((res) => {
        navigate("/login");
        dispatch(logOut());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        className={`flex items-center text-white justify-between px-4 shadow-md fixed top-0 left-0 right-0 z-40 bg-theme_color-dark_light  ${
          navbar && "hidden"
        }`}
      >
        <div>
          <h1 className=" font-semibold text-lg">Task Dashboard</h1>
        </div>
        <div>
          <ul className="flex items-center space-x-5">
            <li className="py-3 cursor-pointer">
              <Link
                to="/"
                className="text-white text-base 
              font-medium"
              >
                Home
              </Link>
            </li>
            <li className="py-3 cursor-pointer">
              <button
                onClick={handlerLogOut}
                className="text-white text-base 
              font-medium"
              >
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
