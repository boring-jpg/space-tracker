import {useState} from "react";
import {func} from "prop-types";
import {useNavigate} from "react-router-dom";
import {login} from "../api/backend_calls";

export const Login = ({setIsLoggedIn}) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [failedAuth, setFailedAuth] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryBackend = async (email, pass) => {
      const success = await login(email, pass);
      console.log(success);

      if (!success) {
        return setFailedAuth(true);
      }

      setIsLoggedIn(true);
      navigate("/");
    };

    queryBackend(email, pass);
  };

  return (
    <main className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <fieldset className="login-form-fieldset">
          <label htmlFor="email">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label htmlFor="password">
            Password:
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </label>
          {failedAuth ? <p>Incorrect Username or Password</p> : ""}
          <input type="submit" className="login-sumbit" />
        </fieldset>
      </form>
    </main>
  );
};

Login.propTypes = {
  setIsLoggedIn: func,
};
