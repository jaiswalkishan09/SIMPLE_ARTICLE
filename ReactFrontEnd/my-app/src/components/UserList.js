// import React, { useState, useEffect } from "react";
import APIUserService from "../APIUserService";
import { useCookies } from "react-cookie";

function UserList(props) {
  const [token] = useCookies(["mytoken"]);
  let is_staff = JSON.parse(sessionStorage?.getItem("is_staff"));

  const editBtn = (user) => {
    props.setIsEditable(false);
    props.editBtn(user);
  };

  const deleteBtn = (user) => {
    APIUserService.DeleteUser(user.id, token["mytoken"])
      .then(() => props.deleteBtn(user))
      .catch((error) => console.log(error));
  };

  const getUpdatDeletebutton = (user) => {
    if (is_staff) {
      return (
        <div className="container-full">
          <div className="row">
            <div className="col-md">
              <button className="btn btn-primary" onClick={() => editBtn(user)}>
                Edit
              </button>
            </div>

            <div className="col-md-0">
              <button
                onClick={() => deleteBtn(user)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    }
    return;
  };

  return (
    <div>
      <div class="container">
        <div class="row text-uppercase">
          <div class="col-md-1 badge bg-primary text-wrap"><h6>#</h6></div>
          <div class="col-md-3 badge bg-primary text-wrap"><h6>username</h6></div>
          <div class="col-md-4 badge bg-primary text-wrap"><h6>email</h6></div>
          <div class="col-md-2  badge bg-primary text-wrap"><h6>Edit</h6></div>
          <div class="col-md-2 badge bg-primary text-wrap"><h6>Delete</h6></div>
        </div>
      </div>

      <div class="container">
        {props.users &&
          props.users.map((user) => {
            return (
              <div class="row" key={user.id}>
                <div class="col-md-1">{user.id}</div>
                <div class="col-md-3">{user.username}</div>
                <div class="col-md-4">{user.email}</div>
                <div class="col-md-4">{getUpdatDeletebutton(user)}</div>

                <hr className="hrclass" />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default UserList;
