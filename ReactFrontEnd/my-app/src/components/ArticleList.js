// import React, { useState, useEffect } from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";

function ArticleList(props) {
  const [token] = useCookies(["mytoken"]);
  let is_staff = JSON.parse(sessionStorage?.getItem("is_staff"));

  const editBtn = (article) => {
    props.editBtn(article);
  };

  const deleteBtn = (article) => {
    APIService.DeleteArticle(article.id, token["mytoken"])
      .then(() => props.deleteBtn(article))
      .catch((error) => console.log(error));
  };

  const getUpdatDeletebutton = (article) => {

    if (is_staff ) {
      return (
        <div className="row">
          <div className="col-md-1">
            <button
              className="btn btn-primary"
              onClick={() => editBtn(article)}
            >
              Edit
            </button>
          </div>

          <div className="col">
            <button
              onClick={() => deleteBtn(article)}
              className="btn btn-danger"
            >
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
      {props.articles &&
        props.articles.map((article) => {
          return (
            <div key={article.id}>
              <h2 className="text-success">{article.title}</h2>
              <p>{article.description}</p>
              {getUpdatDeletebutton(article)}

              <hr className="hrclass" />
            </div>
          )
        })}
    </div>
  );
}

export default ArticleList;
