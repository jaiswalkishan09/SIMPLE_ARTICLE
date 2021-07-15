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
    console.log(APIUserService);
    APIUserService.DeleteUser(user.id, token["mytoken"])
      .then(() => props.deleteBtn(user))
      .catch((error) => console.log(error));
  };

  const getUpdatDeletebutton = (user) => {
    if (is_staff) {
      return (
        <div className="container">
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
      <div class="container-full">
        <div class="row">
          <div class="col-md-0">#</div>
          <div class="col-md-1">username</div>
          <div class="col-md-2 ">first_name</div>
          <div class="col-md-2">last_name</div>
          <div class="col-md-3">email</div>
          <div class="col-md-2">Edit</div>
          <div class="col-md-0">Delete</div>
        </div>
      </div>

      <div class="container-full">
        {props.users &&
          props.users.map((user) => {
            return (
              <div class="row" key={user.id}>
                <div class="col-md-0">{user.id}</div>
                <div class="col-md-1">{user.username}</div>
                <div class="col-md-2">{user.first_name}</div>
                <div class="col-md-2">{user.last_name}</div>
                <div class="col-md-3">{user.email}</div>
                <div class="col-md-3">{getUpdatDeletebutton(user)}</div>

                <hr className="hrclass" />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default UserList;
