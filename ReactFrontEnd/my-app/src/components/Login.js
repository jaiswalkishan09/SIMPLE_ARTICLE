import React, { useState, useEffect } from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useCookies(["mytoken"]);
  const [isLogin, setLogin] = useState(true);
  let history = useHistory();

  useEffect(() => {
    if (token["mytoken"]) {
      history.push("/articles");
    }
  }, [token]);

  const loginBtn = () => {
    if (username.length > 0 && password.length > 0) {
      APIService.LoginUser({ username, password }).then((resp) => {
        if (Boolean(resp)) {
          setToken("mytoken", resp.token);
          sessionStorage.setItem("is_staff", resp.is_staff);
        }
      });
    } else {
      alert("Please Enter Username and Password");
    }
  };

  const RegisterBtn = () => {
    APIService.RegisterUser({ username, password })
      .then((resp) => {
       if (Boolean(resp)) {

          loginBtn();
        } 
      })
  };
  return (
    <div className="App">
      <br />
      <br />
      {isLogin ? <h1>Please Login </h1> : <h1>Please Register </h1>}

      <br />
      <br />

      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          required
          type="text"
          className="form-control"
          id="username"
          placeholder="Please Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          required
          type="password"
          className="form-control"
          id="password"
          placeholder="Please Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {isLogin ? (
        <button onClick={loginBtn} className="btn btn-primary">
          Login
        </button>
      ) : (
        <button onClick={RegisterBtn} className="btn btn-primary">
          Register
        </button>
      )}

      <div className="mb-3">
        <br />
        {isLogin ? (
          <h5>
            If You Don't Have Account, Please{" "}
            <button className="btn btn-primary" onClick={() => setLogin(false)}>
              Register
            </button>
            Here
          </h5>
        ) : (
          <h5>
            If You Have Account, Please{" "}
            <button className="btn btn-primary" onClick={() => setLogin(true)}>
              Login
            </button>
            Here
          </h5>
        )}
      </div>
    </div>
  );
}

export default Login;
