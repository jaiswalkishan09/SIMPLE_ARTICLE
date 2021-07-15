import React, { useState, useEffect } from "react";
import APIUserService from "../APIUserService";
import { useCookies } from "react-cookie";

function UserForm(props) {
  const [username, setUserName] = useState("");
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token] = useCookies(["mytoken"]);
  

  useEffect(() => {
    setUserName(props.user.username);
    setFirst_Name(props.user.first_name);
    setLast_Name(props.user.last_name);
    setEmail(props.user.email);
    setEmail(props.user.password);
  }, [props.user]);

  const updateUser = () => {
    APIUserService.UpdateUser(
      props.user.id,
      { username, first_name, last_name, email },
      token["mytoken"]
    ).then((resp) => {
     
      props.setInsertUser(false);
      props.updatedInformation(resp);
    });
  };

  const insertUser = () => {
    APIUserService.InsertUser(
      { username, first_name, last_name, email, password },
      token["mytoken"]
    ).then((resp) => {
      props.setInsertUser(false);
      props.insertedInformation(resp);
    });
  };

  const goBack = () => {
    props.setInsertUser(false);
  };

  return (
    <div>
      {props.user ? (
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            UserName
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Please Enter The UserName"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />

          <label htmlFor="description" className="form-label">
            first_name
          </label>

          <textarea
            className="form-control"
            id="first_name"
            rows="1"
            value={first_name}
            onChange={(e) => setFirst_Name(e.target.value)}
          ></textarea>

          <label>last_name</label>
          <textarea
            className="form-control"
            id="last_name"
            rows="1"
            value={last_name}
            onChange={(e) => setLast_Name(e.target.value)}
          ></textarea>
          <label>email</label>
          <textarea
            className="form-control"
            id="email"
            rows="1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></textarea>
         
          {props?.isEditable && (
            <div>
              <label>password</label>
              <textarea
                className="form-control"
                id="password"
                rows="1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></textarea>
            </div>
          )}
          <br />

          {props.user.id ? (
            <div className="d-flex">
              <button onClick={goBack} className="btn btn-info mr-2">
                Go Back
              </button>
              <button onClick={updateUser} className="btn btn-success">
                Update User
              </button>
            </div>
          ) : (
            <div className="d-flex">
              <button onClick={goBack} className="btn btn-info mr-2">
                Go Back
              </button>
              <button onClick={insertUser} className="btn btn-success">
                Save User
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default UserForm;
