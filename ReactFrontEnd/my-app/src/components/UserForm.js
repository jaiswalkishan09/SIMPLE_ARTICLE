import React, { useState, useEffect } from "react";
import APIUserService from "../APIUserService";
import { useCookies } from "react-cookie";

function UserForm(props) {
  const [username, setUserName] = useState("");
  const [is_staff, setIsStaff] = useState("false");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token] = useCookies(["mytoken"]);

  useEffect(() => {
    setUserName(props.user.username);
    setIsStaff(props.user.is_staff);
    // setLast_Name(props.user.last_name);
    setEmail(props.user.email);
    setPassword(props.user.password);
  }, [props.user]);

  const updateUser = () => {
    APIUserService.UpdateUser(
      props.user.id,
      { username, email, is_staff },
      token["mytoken"]
    ).then((resp) => {
      props.setInsertUser(false);
      props.updatedInformation(resp);
    });
  };

  const insertUser = () => {
    APIUserService.InsertUser(
      { username, email, password, is_staff },
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
            UserName:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder=" Enter The UserName"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />

          <label>Email:</label>
          <textarea
            className="form-control"
            id="email"
            rows="1"
            placeholder="Enter The Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></textarea>

          {props?.isEditable && (
            <div>
              <label>Password:</label>
              <textarea
                className="form-control"
                id="password"
                placeholder="Enter The UserName"
                rows="1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></textarea>
            </div>
          )}

          <div>
            <label>Is_Staff</label>
            <textarea
              className="form-control"
              id="is_staff"
              placeholder="bool"
              rows="1"
              value={is_staff}
              onChange={(e) => setIsStaff(e.target.value)}
            ></textarea>
          </div>
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
