import {useRef, useState} from "react";
import {func} from "prop-types";
import {useNavigate} from "react-router-dom";
import {login, register} from "../api/backend_calls";
import React from 'react'

export const Login = ({setIsLoggedIn}) => {
  const email = useRef("");
  const pass = useRef("");
  const name = useRef("none"); // only used for registration. b   
  const [failedAuth, setFailedAuth] = useState(false);
  const [failedAuthMessage, setFailedAuthMessage] = useState("Something went wrong");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryBackend = async (name, email, pass) => {
      if(isRegistering){
        const response = await register(name, email, pass);
        console.log(response);
        if (response.success === true) {
          navigate(0);
        }
        setFailedAuthMessage(response.error)
        return setFailedAuth(true);
       
      }else{
        const response = await login(name, email, pass);
        if (response.success === true) {
          setIsLoggedIn(true);
          navigate("/");
        }
        setFailedAuthMessage(response.error);
        return setFailedAuth(true);
      }
    };
    isRegistering ?
    queryBackend(name.current.value,email.current.value, pass.current.value) :
    queryBackend(email.current.value, pass.current.value);
  };

  return (
    <main className="auth">
      <form className="auth-form" onSubmit={handleSubmit}>
        <p>{isRegistering ? "Register an Account" : "Log into Account"}</p>

        {isRegistering ? (
          <label htmlFor="name">
            <input type="name" ref={name} placeholder="Name" />
          </label>
        ) : (
          ""
        )}

        <label htmlFor="email">
          <input type="email" ref={email} placeholder="Email" />
        </label>

        <label htmlFor="password">
          <input type="password" ref={pass} placeholder="Password" />
        </label>

        <button type="submit" className="auth-submit">
          {isRegistering ? "Register" : "Log In"}
        </button>
        {failedAuth && <p className="failed-auth">{failedAuthMessage}</p>}

        {/* Toggle between Login and Register */}
        <p>
          {isRegistering ? (
            <>
              Already have an account?{" "}
              <a
                href="#"
                onClick={() => {
                  setIsRegistering(false);
                }}
              >
                Log In
              </a>
            </>
          ) : (
            <>
              No Account?{" "}
              <a
                href="#"
                onClick={() => {
                  setIsRegistering(true);
                  setFailedAuth(false);
                }}
              >
                Register
              </a>
            </>
          )}
        </p>
      </form>
    </main>
  );
};

Login.propTypes = {
  setIsLoggedIn: func,
};
