import React, { useState, useEffect } from "react";
import APIUserService from "../APIUserService";
import { useCookies } from "react-cookie";

function UserForm(props) {
  const [username, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [token] = useCookies(["mytoken"]);

  useEffect(() => {
    setUserName(props.user.username);
    setDescription(props.user.description);
  }, [props.user]);

  const updateUser = () => {
    APIUserService.UpdateUser(
      props.user.id,
      { username, description },
      token["mytoken"]
    ).then((resp) => {
      props.setInsertUser(false);
      props.updatedInformation(resp);
    });
  };

  const insertUser = () => {
    APIUserService.InsertUser({ username, description }, token["mytoken"]).then(
      (resp) => {
        props.setInsertUser(false);
        props.insertedInformation(resp);
      }
    );
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
            Description
          </label>

          <textarea
            className="form-control"
            id="description"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

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
                Insert User
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default UserForm;
