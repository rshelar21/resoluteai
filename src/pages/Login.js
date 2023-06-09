import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../feature/userSlice";
import { toastifySuccess, toastifyError } from "../components/common/Toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handlerSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
      .then((userCredential) => {
        const user = userCredential.user;

        dispatch(
          login({
            email: userCredential.user.email,
            name: userCredential.user.displayName,
            img: userCredential.user.photoURL,
          })
        );

        navigate("/");
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handlerChangePassword = async () => {
    if (loginForm.email === "") {
      alert("Please enter your email");
      return;
    }
    sendPasswordResetEmail(auth, "rshelar796@gmail.com")
      .then(() => {
        toastifySuccess("Email sent successfully");
      })
      .catch((error) => {
        toastifyError("Something went wrong");
        console.log(error);
      });
  };
  return (
    <>
      <div
        className="w-full h-screen flex items-center justify-center relative
      bg-gray-200"
      >
        <div
          className="w-full max-w-md border-2 shadow-md
        rounded-md p-4 bg-white z-50 border-theme_color-blue mx-2 sm:mx-0"
        >
          <h2 className="text-center font-medium text-lg">Login</h2>

          <div>
            <form
              className="flex flex-col relative w-full"
              onSubmit={handlerSubmit}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="input my-6"
                name="email"
                value={loginForm.email}
                onChange={handlerChange}
              />
              <input
                type="text"
                placeholder="Enter your password"
                className="input"
                name="password"
                value={loginForm.password}
                onChange={handlerChange}
              />
              <p
                className="text-right text-blue-500 text-sm underline cursor-pointer"
                onClick={handlerChangePassword}
              >
                Forgot Password?{" "}
              </p>

              <button className="button" type="submit">
                Log In
              </button>
            </form>

            <p className="pt-2 text-center text-base">
              Don't have an account?{" "}
              <Link to="/register" className="underline text-blue-500">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
