import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../feature/userSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
  });

  const handlerSubmit = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(
      auth,
      registerForm.email,
      registerForm.password
    )
      .then((userCredential) => {
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
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
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
        rounded-md p-4 z-50 bg-white border-theme_color-blue mx-2 sm:mx-0"
        >
          <h2 className="text-center font-medium text-lg">Register</h2>
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
                value={registerForm.email}
                onChange={handlerChange}
              />
              <input
                type="password"
                placeholder="Enter your password"
                className="input"
                name="password"
                value={registerForm.password}
                onChange={handlerChange}
              />
              <button className="button" type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
