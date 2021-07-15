import React, { useState, useEffect } from "react";
import APIUserService from "../APIUserService";
import { useCookies } from "react-cookie";

function UserList(props) {
  const [token] = useCookies(["mytoken"]);
  let is_staff = JSON.parse(sessionStorage?.getItem("is_staff"));

  const editBtn = (user) => {
    props.editBtn(user);
  };

  const deleteBtn = (user) => {
      console.log(APIUserService)
    APIUserService.DeleteUser(user.id, token["mytoken"])
      .then(() => props.deleteBtn(user))
      .catch((error) => console.log(error));
  };

  const getUpdatDeletebutton = (user) => {
    if (is_staff) {
      return (
        <div className="row">
          <div className="col-md">
            <button className="btn btn-primary" onClick={() => editBtn(user)}>
              Edit
            </button>
          </div>

          <div className="col-md">
            <button onClick={() => deleteBtn(user)} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      );
    }
    return;
  };

  return (
  
    <div>

        


      <table striped bordered hover size="sm">
        <thead>
       
        </thead>
        {props.users &&
          props.users.map((user) => {
            return (
              <tbody>
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>

                  <td>{getUpdatDeletebutton(user)}</td>

                  <hr className="hrclass" />
                </tr>
              </tbody>
            );
          })}
      </table>
    </div>
  );
}

export default UserList;
